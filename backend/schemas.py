from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LearningLogBase(BaseModel):
    title: str
    content: str
    category: Optional[str] = None

class LearningLogCreate(LearningLogBase):
    pass

class LearningLog(LearningLogBase):
    id: int
    created_at: datetime 

    class Config:
        from_attributes = True # SQLAlchemyのモデルをPydanticに変換する設定