import React from 'react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#00152b]/80 backdrop-blur-md border-b border-[#FF9F43]/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* ロゴ部分 */}
        <div 
          onClick={scrollToTop}
          className="text-2xl font-black text-[#FF9F43] italic tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
        >
          LEARNING<span className="text-[#E0E6ED] ml-1">LOG</span>
        </div>

        {/* 右側メニュー */}
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              {/* ログイン中のみ表示される要素 */}
              <span className="hidden md:inline text-xs font-bold text-[#FF9F43]/60 tracking-widest">
                DASHBOARD ACTIVE
              </span>
              <button
                onClick={onLogout}
                className="px-6 py-2 border-2 border-[#FF9F43] text-[#FF9F43] rounded-full text-xs font-black hover:bg-[#FF9F43] hover:text-[#00152b] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#FF9F43]/10"
              >
                LOGOUT
              </button>
            </>
          ) : (
            /* 未ログイン時に「ログインへ移動」ボタンを出す場合（オプション） */
            <button
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-black text-[#FF9F43] hover:text-[#E0E6ED] transition-colors tracking-widest"
            >
              SIGN IN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};