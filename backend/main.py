import os
from datetime import datetime, timedelta
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

from database import engine, SessionLocal
import models, schemas

# パスワードハッシュ化の設定
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# JWTトークンの設定
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-for-local-development") 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- 認証用ユーティリティ ---
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str):
    # password が確実に「生パスワード」の文字列であることを確認
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ★ ログイン中のユーザーを特定する関数
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# --- DB初期化 ---
models.Base.metadata.create_all(bind=engine)
app = FastAPI()

# --- CORS設定 ---
origins = [
    "http://localhost:5173",
    os.getenv("FRONTEND_URL"),
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin for origin in origins if origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- API エンドポイント ---

@app.get("/")
def read_root():
    return {"message": "Learning Log API with Auth"}

# 1. ユーザー登録
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # デバッグ: ここでパスワードの長さをチェック
    if len(user.password.encode('utf-8')) > 72:
        raise HTTPException(status_code=400, detail="Password too long")

    # 確実に1回だけハッシュ化する
    hashed = get_password_hash(user.password)
    
    db_user = models.User(
        email=user.email, 
        hashed_password=hashed
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# 2. ログイン（トークン発行）
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# 3. ログの保存 (Create) ★認証追加
@app.post("/logs", response_model=schemas.LearningLog)
def create_log(
    log: schemas.LearningLogCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_log = models.LearningLog(
        **log.dict(),
        created_at=datetime.now(),
        owner_id=current_user.id # ★作成者に自分のIDを入れる
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

# 4. ログの取得 (Read) ★認証追加
@app.get("/logs", response_model=List[schemas.LearningLog])
def read_logs(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # ★自分のログだけを表示するようにフィルタリング
    return db.query(models.LearningLog).filter(models.LearningLog.owner_id == current_user.id).all()

# 5. ログの削除 (Delete) ★認証追加
@app.delete("/logs/{log_id}")
def delete_log(
    log_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_log = db.query(models.LearningLog).filter(
        models.LearningLog.id == log_id, 
        models.LearningLog.owner_id == current_user.id # ★他人のログは消せない
    ).first()
    
    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")
    
    db.delete(db_log)
    db.commit()
    return {"message": "Successfully deleted"}

# 6. ログの更新 (Update) ★認証追加
@app.put("/logs/{log_id}", response_model=schemas.LearningLog)
def update_log(
    log_id: int, 
    updated_log: schemas.LearningLogCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_log = db.query(models.LearningLog).filter(
        models.LearningLog.id == log_id,
        models.LearningLog.owner_id == current_user.id # ★他人のログは更新できない
    ).first()
    
    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")

    db_log.title = updated_log.title
    db_log.content = updated_log.content
    db_log.category = updated_log.category
    db.commit()
    db.refresh(db_log)
    return db_log