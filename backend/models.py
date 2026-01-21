from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base

class LearningLog(Base):
    __tablename__ = "learning_logs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False) # 学習のタイトル
    content = Column(Text, nullable=False)      # Markdown形式の本文
    category = Column(String(50))               # Python, TypeScriptなど
    created_at = Column(DateTime, default=datetime.now) # 作成日時