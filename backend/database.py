import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. 環境変数からURLを取得。なければDockerのローカルDBをデフォルトにする
# Renderでは 'DATABASE_URL' という名前で設定します
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://user:password@db:5432/learning_db"
)

# Render（Heroku系）のPostgresURLは先頭が 'postgres://' になっていることがあり、
# SQLAlchemy 1.4以降では 'postgresql://' である必要があるため補正を入れます
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()