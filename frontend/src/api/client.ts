import type { LearningLog } from '../types/log';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ★共通：ローカルストレージからトークンを取得してヘッダーを作る関数
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

// ★追加：ログイン（トークン取得）関数
export const login = async (email: string, password: string) => {
  // OAuth2PasswordRequestForm は JSON ではなく Form データ形式を期待する
  const params = new URLSearchParams();
  params.append('username', email); // FastAPIは'username'というキーで受け取る
  params.append('password', password);

  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!response.ok) {
    throw new Error('ログインに失敗しました。メールアドレスかパスワードが違います。');
  }

  const data = await response.json();
  localStorage.setItem("token", data.access_token); // トークンを保存
  return data;
};

export const fetchLogs = async (): Promise<LearningLog[]> => {
  const response = await fetch(`${API_URL}/logs`, {
    headers: getAuthHeaders(), // ★トークンを付ける
  });
  if (!response.ok) throw new Error('データの取得に失敗しました');
  return response.json();
};

export const createLog = async (log: { title: string; content: string; category: string }) => {
  const response = await fetch(`${API_URL}/logs`, {
    method: "POST",
    headers: getAuthHeaders(), // ★トークンを付ける
    body: JSON.stringify(log),
  });
  if (!response.ok) throw new Error("Failed to create log");
  return response.json();
};

export const deleteLog = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/logs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(), // ★トークンを付ける
  });
  if (!response.ok) throw new Error('データの削除に失敗しました');
};

export const updateLog = async (id: number, log: { title: string; content: string; category: string }) => {
  const response = await fetch(`${API_URL}/logs/${id}`, { // URLをAPI_URL変数に統一
    method: "PUT",
    headers: getAuthHeaders(), // ★トークンを付ける
    body: JSON.stringify({
      title: log.title,
      content: log.content,
      category: log.category || "GENERAL"
    }),
  });

  if (!response.ok) throw new Error("Failed to update log");
  return response.json();
};

export const register = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || '登録に失敗しました。');
  }

  return response.json();
};