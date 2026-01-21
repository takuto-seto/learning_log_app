import React from "react";

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 pop-in">
          <h2 className="text-4xl font-black mb-3 text-white italic tracking-tighter">Skills</h2>
          <p className="text-[#FF9F43] font-bold text-sm tracking-widest uppercase">Technical Stack</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pop-in">
          {[
            { label: "Frontend", skills: ["React", "TypeScript", "Tailwind CSS"] },
            { label: "Backend", skills: ["FastAPI", "Python", "PostgreSQL"] },
            { label: "DevOps", skills: ["Docker", "Git / GitHub"] },
            { label: "Certification", skills: ["基本情報", "情報セキュリティ", "Pythonデータ分析"] },
          ].map((box, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-[#FF9F43]/50 transition-colors">
              <h4 className="text-[#FF9F43] text-xs font-black uppercase mb-4 tracking-widest">{box.label}</h4>
              <ul className="space-y-2">
                {box.skills.map((s, j) => (
                  <li key={j} className="text-white font-bold text-sm">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};