FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# キャッシュの問題を避け、プラットフォームに合わせた依存関係をインストール
RUN npm install

COPY . .

# Viteの実行権限を念のため付与
RUN chmod -R 777 node_modules

EXPOSE 5173

CMD ["npm", "run", "dev"]