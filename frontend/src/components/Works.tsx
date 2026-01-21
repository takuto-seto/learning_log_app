import React from "react";

export const Works: React.FC = () => {
  const projects = [
    {
      title: "tsunakawa-dorone", 
      tech: "HTML / CSS / JS", 
      desc: "知人のコーポレートサイト。サイトデザインから作成させていただきました。",
      link: "https://tsuna1143.stars.ne.jp/", 
      image: "/tsunakawa_dorone.png", 
    },
    {
      title: "T.S Portfolio",
      tech: "React / FastAPI / Docker",
      desc: "今ご覧いただいている、このポートフォリオサイトです。",
      link: "#",
      image: "/Cover.png",
    },
    // 必要に応じて追加...
  ];

  return (
    <section id="works" className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 pop-in">
          <h2 className="text-4xl font-black mb-3 text-white italic tracking-tighter">Selected Works</h2>
          <p className="text-[#FF9F43] font-bold text-sm tracking-widest uppercase">つくりあげたもの</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pop-in">
          {projects.map((work, i) => (
            <a 
              href={work.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={i} 
              className="group bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden hover:border-[#FF9F43]/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl block"
            >
              <div className="aspect-video bg-blue-900/40 relative overflow-hidden">
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                {work.link === "#" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white/50 font-black text-sm tracking-widest uppercase">
                    
                  </div>
                )}
              </div>
              <div className="p-8">
                <span className="text-[10px] font-black text-[#FF9F43] tracking-[0.2em] uppercase">{work.tech}</span>
                <h3 className="text-xl font-black text-white mt-2 mb-4">{work.title}</h3>
                <p className="text-gray-400 text-sm font-bold leading-relaxed">{work.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};