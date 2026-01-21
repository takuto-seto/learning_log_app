# backend/schemas.py
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# ログ用のベース
class LearningLogBase(BaseModel):
    title: str
    content: str
    category: Optional[str] = None

class LearningLogCreate(LearningLogBase):
    pass

class LearningLog(LearningLogBase):
    id: int
    created_at: datetime
    owner_id: int # 誰のものかを表示

    class Config:
        from_attributes = True

# ユーザー用の型
class UserCreate(BaseModel):
    email: EmailStr # pip install pydantic[email] が必要になる場合があります
    password: str

class User(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

# ログイン成功時に返すトークンの形
class Token(BaseModel):
    access_token: str
    token_type: str