export const Navbar: React.FC<{ onLogout: () => void; isLoggedIn: boolean }> = ({ onLogout, isLoggedIn }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#00152b]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">
          LEARNING <span className="text-[#FF9F43]">LOG</span>
        </div>
        {isLoggedIn && (
          <button
            onClick={onLogout}
            className="text-[10px] sm:text-xs font-black tracking-widest text-gray-400 hover:text-[#FF9F43] transition-colors border border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full uppercase"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};