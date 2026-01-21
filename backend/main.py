import os
from datetime import datetime
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models, schemas
from typing import List

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

# 許可するオリジン（接続元）をリスト化
origins = [
    "http://localhost:5173",  # 開発用
    os.getenv("FRONTEND_URL"), # 本番用（後でRenderで設定します）
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin for origin in origins if origin], # Noneを除外
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DBのセッション（接続）を開始・終了するための関数
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 1. ログを保存するAPI (Create)
@app.post("/logs", response_model=schemas.LearningLog)
def create_log(log: schemas.LearningLogCreate, db: Session = Depends(get_db)):
    # 辞書展開しつつ、created_at を明示的に追加する
    db_log = models.LearningLog(
        **log.dict(),
        created_at=datetime.now() # ここで明示的に現在の時刻を入れる
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

# 2. ログの一覧を取得するAPI (Read)
@app.get("/logs", response_model=List[schemas.LearningLog])
def read_logs(db: Session = Depends(get_db)):
    return db.query(models.LearningLog).all()

@app.get("/")
def read_root():
    return {"message": "Welcome to my portfolio API!"}

@app.delete("/logs/{log_id}")
def delete_log(log_id: int, db: Session = Depends(get_db)):
    db_log = db.query(models.LearningLog).filter(models.LearningLog.id == log_id).first()
    if db_log is None:
        return {"error": "Log not found"}
    
    db.delete(db_log)
    db.commit()
    return {"message": "Successfully deleted"}


@app.put("/logs/{log_id}", response_model=schemas.LearningLog)
def update_log(log_id: int, updated_log: schemas.LearningLogCreate, db: Session = Depends(get_db)):
    # 1. 該当するIDのログを探す
    db_log = db.query(models.LearningLog).filter(models.LearningLog.id == log_id).first()
    
    if db_log is None:
        return {"error": "Log not found"}

    # 2. データを書き換える
    db_log.title = updated_log.title
    db_log.content = updated_log.content
    db_log.category = updated_log.category
    # created_at は更新しない（作成時のままにする）

    db.commit()      # 確定
    db.refresh(db_log) # 最新状態を読み込み
    return db_log