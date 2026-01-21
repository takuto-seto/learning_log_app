# backend/models.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # ユーザーが持っているログ一覧（リレーション）
    logs = relationship("LearningLog", back_populates="owner")

class LearningLog(Base):
    __tablename__ = "learning_logs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    category = Column(String)
    created_at = Column(DateTime)
    
    # 追加: どのユーザーのログかを示す外部キー
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # 追加: ユーザーモデルへの参照
    owner = relationship("User", back_populates="logs")