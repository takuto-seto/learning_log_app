import React, { useState } from 'react';
import { login, register } from '../api/client';

interface AuthFormProps {
  onAuthSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
        // 登録後はそのままログインさせる
        await login(email, password);
      }
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md p-8 bg-[#002244] border-2 border-[#FF9F43]/30 rounded-2xl shadow-2xl pop-in show">
        <h2 className="text-3xl font-black text-[#FF9F43] mb-6 text-center italic">
          {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1 ml-1 text-[#FF9F43]/70">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#00152b] border border-[#FF9F43]/20 rounded-xl focus:outline-none focus:border-[#FF9F43] text-white"
              placeholder="example@test.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1 ml-1 text-[#FF9F43]/70">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#00152b] border border-[#FF9F43]/20 rounded-xl focus:outline-none focus:border-[#FF9F43] text-white"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm font-bold animate-pulse">{error}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-[#FF9F43] text-[#00152b] font-black rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-[#FF9F43]/20"
          >
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-bold">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-[#FF9F43] hover:underline"
          >
            {isLogin ? 'Create one' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};