import { useEffect, useState } from "react";
import { fetchLogs, createLog, deleteLog, updateLog } from "./api/client"; // updateLogを追加
import { Navbar } from "./components/Navbar";
import { LearningLogs } from "./components/LearningLogs";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Story } from "./components/Story";
import { Works } from "./components/Works";
import type { LearningLog } from "./types/log";

function App() {
  const [logs, setLogs] = useState<LearningLog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  // 追加: 編集中のログIDを管理するステート
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadLogs = () => {
    fetchLogs().then(setLogs).catch(console.error);
  };

  useEffect(() => {
    loadLogs();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pop-in").forEach((el) => observer.observe(el));
  }, []);

  // 編集ボタンが押された時の処理
  const handleEditClick = (log: LearningLog) => {
    setEditingId(log.id);
    setTitle(log.title);
    setCategory(log.category || "");
    setContent(log.content);
    // フォームにIDがついている場合、そこまでスクロール
    document.getElementById("log-form")?.scrollIntoView({ behavior: "smooth" });
  };

  // 追加: 編集をキャンセルする処理
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
      alert("保存に失敗しました");
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

  return (
    <div className="min-h-screen bg-[#00152b] text-[#E0E6ED] font-['M_PLUS_Rounded_1c',_sans-serif] overflow-x-hidden">
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;900&display=swap');
        .pop-in { opacity: 0; transform: translateY(20px); transition: all 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67); }
        .pop-in.show { opacity: 1; transform: translateY(0); }
        .bg-dot { background-image: radial-gradient(#FF9F43 1px, transparent 1px); background-size: 30px 30px; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Hero />
      <About />
      <Skills />
      <Story />
      <Works />

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
        onEdit={handleEditClick}      // 追加
        onCancel={handleCancelEdit}  // 追加
        isEditing={editingId !== null} // 追加
      />

      <footer className="py-24 text-center font-black text-[#FF9F43]/40 text-xs">
        © 2026 TAKUTO SETOGUCHI
      </footer>
    </div>
  );
}

export default App;