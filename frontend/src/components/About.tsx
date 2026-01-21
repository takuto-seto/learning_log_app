import React from "react";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 max-w-5xl mx-auto">
      <div className="pop-in grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] bg-gradient-to-tr from-blue-900 to-[#FF9F43]/20 rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-2xl relative z-10">
            <img
              src="/mori.JPG"
              alt="Takuto Setoguchi"
              className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#FF9F43]/30 rounded-[4rem] z-0"></div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-black text-white italic tracking-tighter">About Me</h2>
          <div className="w-16 h-1.5 bg-[#FF9F43] rounded-full mb-8"></div>
          <p className="text-lg leading-loose font-bold text-gray-300">
            営業・マネジメントでの10年間、私は「目の前の人の喜び」を追求してきました。
          </p>
          <p className="text-lg leading-loose font-bold text-gray-400">
            現在はそのホスピタリティと課題解決力をITの世界へ。IT企画推進部の現場で培った実行力を武器に、ユーザーに寄り添うエンジニアを目指しています。
          </p>
        </div>
      </div>
    </section>
  );
};