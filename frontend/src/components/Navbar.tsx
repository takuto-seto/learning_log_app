import React from "react";

export const Navbar: React.FC = () => {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Story", href: "#story" },
    { label: "Works", href: "#works" },
    { label: "Logs", href: "#logs" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center">
      <div className="bg-[#00152b]/80 backdrop-blur-lg border border-white/10 px-4 md:px-8 py-3 md:py-4 rounded-full shadow-2xl flex justify-between items-center w-full max-w-2xl overflow-x-auto no-scrollbar">
        
        <div className="text-[#FF9F43] font-black text-lg md:text-xl tracking-tighter mr-4">
          T.S
        </div>

        {/* メニュー：スマホでは文字を小さく、間隔も調整 */}
        <div className="flex gap-4 md:gap-8 shrink-0">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[10px] md:text-xs font-black text-gray-400 hover:text-[#FF9F43] transition-colors uppercase tracking-widest whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};