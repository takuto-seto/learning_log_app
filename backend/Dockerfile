FROM python:3.11-slim

WORKDIR /app

# backendフォルダの中にあるrequirements.txtをコピー
COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# backendフォルダの中身をすべてコピー
COPY backend/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]