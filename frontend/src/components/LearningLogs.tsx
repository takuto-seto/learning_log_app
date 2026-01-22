import React from "react";
import type { LearningLog } from "../types/log";

interface LearningLogsProps {
  logs: LearningLog[];
  title: string;
  content: string;
  category: string;
  setTitle: (val: string) => void;
  setContent: (val: string) => void;
  setCategory: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete: (id: number) => void;
  onEdit: (log: LearningLog) => void;
  onCancel: () => void;
  isEditing: boolean;
  onSearch: (query: string) => void;
  isDesc: boolean;
  onToggleSort: () => void;
}

export const LearningLogs: React.FC<LearningLogsProps> = ({
  logs,
  title,
  content,
  category,
  setTitle,
  setContent,
  setCategory,
  onSubmit,
  onDelete,
  onEdit,
  onCancel,
  isEditing,
  onSearch,
  isDesc,
  onToggleSort,
}) => {
  // --- 内部関数の復元 ---
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date).replace(/\//g, ".");
  };

  const getCategoryStyle = (cat: string) => {
    const c = cat?.toLowerCase() || "";
    if (c.includes("front") || c.includes("react")) return "text-blue-400 bg-blue-400/10";
    if (c.includes("back") || c.includes("python") || c.includes("api")) return "text-green-400 bg-green-400/10";
    if (c.includes("infra") || c.includes("docker") || c.includes("render")) return "text-purple-400 bg-purple-400/10";
    return "text-[#FF9F43] bg-[#FF9F43]/10";
  };

  return (
    <section id="logs" className="py-20 md:py-32 px-4 md:px-6 bg-[#FF9F43]/[0.02] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16 pop-in">
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-white italic tracking-tighter">DAILY LOGS</h2>
          <div className="w-16 h-1.5 bg-[#FF9F43] mx-auto rounded-full"></div>
          {isEditing && (
            <div className="mt-4 inline-block px-4 py-1 rounded-full bg-[#FF9F43]/20 text-[#FF9F43] text-[10px] font-black tracking-widest uppercase animate-pulse">
              Editing Mode
            </div>
          )}
        </div>

        {/* 検索 & ソート */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3 md:gap-4 pop-in">
          <input
            type="text"
            placeholder="ログを検索..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full sm:flex-1 px-6 py-4 bg-[#00152b] border-2 border-[#FF9F43]/20 rounded-2xl text-[#E0E6ED] focus:border-[#FF9F43] outline-none transition-all shadow-inner text-base"
          />
          <button
            type="button"
            onClick={onToggleSort}
            className="w-full sm:w-auto px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-[#FF9F43] font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[140px]"
          >
            {isDesc ? "NEWEST ↓" : "OLDEST ↑"}
          </button>
        </div>

        {/* フォーム */}
        <form id="log-form" onSubmit={onSubmit} className="mb-12 md:mb-16 flex flex-col gap-4 pop-in">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="TITLE"
              className="w-full md:flex-1 px-6 md:px-8 py-4 rounded-xl md:rounded-full border-2 border-white/10 outline-none focus:border-[#FF9F43] bg-white/5 text-white font-bold transition-all text-base"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              placeholder="CATEGORY"
              className="w-full md:w-1/3 px-6 md:px-8 py-4 rounded-xl md:rounded-full border-2 border-white/10 outline-none focus:border-[#FF9F43] bg-white/5 text-white font-bold transition-all uppercase text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="CONTENT"
              className="w-full md:flex-1 px-6 md:px-8 py-4 rounded-xl md:rounded-full border-2 border-white/10 outline-none focus:border-[#FF9F43] bg-white/5 text-white font-bold transition-all text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="flex gap-2 w-full md:w-auto">
              <button
                type="submit"
                className="flex-1 bg-[#FF9F43] text-[#00152b] px-8 md:px-12 py-4 rounded-xl md:rounded-full font-black hover:scale-[1.02] active:scale-95 transition shadow-[0_10px_20px_rgba(255,159,67,0.2)] whitespace-nowrap uppercase"
              >
                {isEditing ? "Update" : "Post"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-4 rounded-xl md:rounded-full border-2 border-white/10 text-white font-black hover:bg-white/5 transition-all"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </form>

        {/* ログリスト */}
        <div className="grid gap-4 md:gap-6">
          {logs.map((log) => (
            <div key={log.id} className="bg-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-[#FF9F43]/30 transition-all">
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[9px] md:text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md ${getCategoryStyle(log.category)}`}>
                    {log.category || "GENERAL"}
                  </span>
                  <span className="text-[10px] font-bold text-gray-600 tracking-widest">{formatDate(log.created_at)}</span>
                </div>
                <h4 className="text-lg md:text-xl font-black text-white leading-tight">{log.title}</h4>
                <p className="text-gray-500 font-bold mt-1 text-sm md:text-base line-clamp-3">{log.content}</p>
              </div>
              <div className="flex items-center gap-1 self-end sm:self-center sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                <button onClick={() => onEdit(log)} className="p-3 text-gray-500 hover:text-[#FF9F43] transition-all">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
                <button onClick={() => onDelete(log.id)} className="p-3 text-gray-500 hover:text-red-500 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};