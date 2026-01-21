import React from 'react';

interface LandingSectionProps {
  onScrollToAuth: () => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onScrollToAuth }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-dot pt-20">
      {/* メインキャッチコピー */}
      <div className="text-center z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-black text-[#FF9F43] italic tracking-tighter mb-4 pop-in show">
          LEARNING<br />LOG
        </h1>
        <p className="text-[#E0E6ED] text-lg md:text-xl font-bold max-w-2xl mx-auto mb-10 opacity-80 pop-in show" style={{transitionDelay: '200ms'}}>
          日々の学びを、確実に刻む。<br />
          自分だけの知的なアーカイブを構築しましょう。
        </p>
        
        <button 
          onClick={onScrollToAuth}
          className="px-10 py-4 bg-[#FF9F43] text-[#00152b] font-black rounded-full text-xl hover:scale-110 transition-transform shadow-xl shadow-[#FF9F43]/20 pop-in show"
          style={{transitionDelay: '400ms'}}
        >
          GET STARTED
        </button>
      </div>

      {/* 背景の装飾的な要素 */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#FF9F43]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#FF9F43]/5 rounded-full blur-3xl animate-pulse" />
    </div>
  );
};