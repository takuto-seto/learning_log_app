import { useEffect, useState } from "react";
import { fetchLogs, createLog, deleteLog, updateLog } from "./api/client";
import { Navbar } from "./components/Navbar";
import { LearningLogs } from "./components/LearningLogs";
import { AuthForm } from "./components/AuthForm";
import { LandingSection } from "./components/LandingSection"; // ★新設
import type { LearningLog } from "./types/log";

function App() {
  const [logs, setLogs] = useState<LearningLog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const loadLogs = (searchQuery: string = "") => {
    if (localStorage.getItem("token")) {
      // APIクライアント側も search 引数を受け取れるように修正が必要
      fetchLogs(searchQuery)
        .then(setLogs)
        .catch((err) => {
          if (err.message.includes("401")) handleLogout();
        });
    }
  };

  // 検索実行時のハンドラー
  const handleSearch = (query: string) => {
    loadLogs(query);
  };

  const handleEditClick = (log: LearningLog) => {
    setEditingId(log.id);
    setTitle(log.title);
    setCategory(log.category || "");
    setContent(log.content);
    // フォームにIDがついている場合、そこまでスクロール
    document.getElementById("log-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setCategory("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        // 更新モード
        await updateLog(editingId, { title, content, category });
        setEditingId(null);
      } else {
        // 新規作成モード
        await createLog({ title, content, category });
      }

      setTitle("");
      setContent("");
      setCategory("");
      loadLogs();
    } catch (err) {
      alert("保存に失敗しました。再度ログインしてください。");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("削除してもよろしいですか？")) return;
    try {
      await deleteLog(id);
      loadLogs();
    } catch (err) {
      alert("削除に失敗しました");
    }
  };
  useEffect(() => {
    if (isLoggedIn) loadLogs();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pop-in").forEach((el) => observer.observe(el));
  }, [isLoggedIn]);

  const handleAuthSuccess = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLogs([]);
  };

  // フォームまでスクロールする関数（トップページのボタン用）
  const scrollToAuth = () => {
    document
      .getElementById("auth-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  /* ... (handleSubmit, handleDeleteなどはそのまま) ... */

  return (
    <div className="min-h-screen bg-[#00152b] text-[#E0E6ED] font-['M_PLUS_Rounded_1c',_sans-serif] overflow-x-hidden">
      <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;900&display=swap');
        .pop-in { opacity: 0; transform: translateY(20px); transition: all 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67); }
        .pop-in.show { opacity: 1; transform: translateY(0); }
        .bg-dot { background-image: radial-gradient(#FF9F43 1px, transparent 1px); background-size: 30px 30px; }
      `}</style>

      {/* --- コンテンツエリア --- */}
      {!isLoggedIn ? (
        <>
          {/* ログイン前：トップページ + ログインフォーム */}
          <LandingSection onScrollToAuth={scrollToAuth} />
          <section id="auth-section" className="py-24 bg-[#00152b]">
            <AuthForm onAuthSuccess={handleAuthSuccess} />
          </section>
        </>
      ) : (
        <div className="pt-20">
          {" "}
          {/* Navbar分の余白 */}
          {/* ログイン後：学習ログ管理画面のみ */}
          <LearningLogs
            logs={logs}
            title={title}
            content={content}
            category={category}
            setTitle={setTitle}
            setContent={setContent}
            setCategory={setCategory}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onEdit={handleEditClick}
            onCancel={handleCancelEdit}
            isEditing={editingId !== null}
            onSearch={handleSearch}
          />
        </div>
      )}

      <footer className="py-12 text-center font-black text-[#FF9F43]/40 text-xs">
        © 2026 LEARNING LOG APP
      </footer>
    </div>
  );
}

export default App;
