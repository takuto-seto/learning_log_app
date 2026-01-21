import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center bg-dot">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FF9F43] opacity-5 blur-[120px] rounded-full floating"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500 opacity-5 blur-[100px] rounded-full floating" style={{animationDelay: '1.5s'}}></div>
      
      <div className="text-center z-10 pop-in px-6">
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 text-white leading-tight">
          想いを、<br />
          <span className="text-[#FF9F43]">カタチ</span>にする。
        </h1>
        <p className="text-lg md:text-2xl font-bold text-blue-200/60 max-w-2xl mx-auto">
          Takuto Setoguchi Portfolio
        </p>
      </div>
    </section>
  );
};