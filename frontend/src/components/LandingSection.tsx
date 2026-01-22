export const LandingSection: React.FC<{ onScrollToAuth: () => void }> = ({ onScrollToAuth }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden bg-dot">
      <div className="max-w-4xl mx-auto text-center">
        <div className="pop-in show">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FF9F43]/10 text-[#FF9F43] text-[9px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 border border-[#FF9F43]/20">
            Keep pushing forward
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 italic tracking-tighter leading-[0.9]">
            OWN YOUR <br />
            <span className="text-[#FF9F43]">PROGRESS.</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-xl font-bold mb-10 max-w-xl mx-auto leading-relaxed px-4">
            日々の学習を、シンプルに。そして美しく。<br className="hidden sm:block" />
            あなたの成長を、確かなログとして刻み込もう。
          </p>
          <button
            onClick={onScrollToAuth}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-[#FF9F43] text-[#00152b] px-8 py-4 sm:px-10 sm:py-5 rounded-full font-black text-base sm:text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,159,67,0.3)]"
          >
            START LEARNING
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};