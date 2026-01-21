import type { LearningLog } from '../types/log';

// 本番環境（Render）ではそのURLを、開発環境（Docker）では localhost を使用するようにします
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const fetchLogs = async (): Promise<LearningLog[]> => {
  const response = await fetch(`${API_URL}/logs/`);
  if (!response.ok) {
    throw new Error('データの取得に失敗しました');
  }
  return response.json();
};

export const createLog = async (log: { title: string; content: string; category: string }) => {
  const response = await fetch(`${API_URL}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  });
  if (!response.ok) throw new Error("Failed to create log");
  return response.json();
};

export const deleteLog = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/logs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('データの削除に失敗しました');
  }
};

export const updateLog = async (id: number, log: { title: string; content: string; category: string }) => {
  const response = await fetch(`http://localhost:8000/logs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: log.title,
      content: log.content,
      // categoryが空の場合でも、必ず文字列として送る
      category: log.category || "GENERAL"
    }),
  });

  if (!response.ok) {
    // エラーの理由を詳しくコンソールに出す
    const errorDetail = await response.json();
    console.error("API Error Detail:", errorDetail);
    throw new Error("Failed to update log");
  }
  return response.json();
};