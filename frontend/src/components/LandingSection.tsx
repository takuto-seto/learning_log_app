import React from "react";

interface LandingSectionProps {
  onScrollToAuth: () => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onScrollToAuth }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-dot">
      {/* 背景の装飾 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#FF9F43]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="pop-in show">
          <span className="inline-block px-4 py-1 rounded-full bg-[#FF9F43]/10 text-[#FF9F43] text-[10px] font-black tracking-[0.3em] uppercase mb-8 border border-[#FF9F43]/20">
            Keep pushing forward
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 italic tracking-tighter leading-none">
            OWN YOUR <br />
            <span className="text-[#FF9F43]">PROGRESS.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-bold mb-12 max-w-xl mx-auto leading-relaxed">
            日々の学習を、シンプルに。そして美しく。
            <br />
            あなたの成長を、確かなログとして刻み込もう。
          </p>
          <button
            onClick={onScrollToAuth}
            className="group relative inline-flex items-center gap-3 bg-[#FF9F43] text-[#00152b] px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,159,67,0.3)]"
          >
            START LEARNING
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};