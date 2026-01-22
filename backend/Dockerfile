FROM python:3.11-slim

WORKDIR /app

# backend フォルダの中にいるので、直下の requirements.txt をコピー
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# backend フォルダの中身（今いる場所のすべて）をコピー
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]