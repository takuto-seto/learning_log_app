import type { LearningLog } from '../types/log';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// 共通：認証ヘッダー作成
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

// 1. ログイン
export const login = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!response.ok) throw new Error('ログインに失敗しました。');
  const data = await response.json();
  localStorage.setItem("token", data.access_token);
  return data;
};

// 2. ログ一覧取得 (★検索クエリ対応版に統合)
export const fetchLogs = async (search: string = ""): Promise<LearningLog[]> => {
  const url = search 
    ? `${API_URL}/logs?search=${encodeURIComponent(search)}` 
    : `${API_URL}/logs`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    if (response.status === 401) throw new Error("401");
    throw new Error('データの取得に失敗しました');
  }
  return response.json();
};

// 3. ログ作成
export const createLog = async (log: { title: string; content: string; category: string }) => {
  const response = await fetch(`${API_URL}/logs`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(log),
  });
  if (!response.ok) throw new Error("Failed to create log");
  return response.json();
};

// 4. ログ削除
export const deleteLog = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/logs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('データの削除に失敗しました');
};

// 5. ログ更新
export const updateLog = async (id: number, log: { title: string; content: string; category: string }) => {
  const response = await fetch(`${API_URL}/logs/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title: log.title,
      content: log.content,
      category: log.category || "GENERAL"
    }),
  });
  if (!response.ok) throw new Error("Failed to update log");
  return response.json();
};

// 6. ユーザー登録
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