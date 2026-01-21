import React from "react";

export const Story: React.FC = () => {
  return (
    <section id="story" className="py-32 px-6 max-w-5xl mx-auto space-y-24">
      {[
        {
          title: "感覚をみがく",
          text: "おむすびコンテスト優勝。お客様が「おいしい！」と感じる瞬間を想像し、カタチにする楽しさを知りました。",
          color: "#FF9F43",
        },
        {
          title: "課題をみつける",
          text: "営業で月間1位に。相手の困りごとを論理的に解決する力を養いました。",
          color: "#3B82F6",
        },
        {
          title: "可能性をひろげる",
          text: "ECサイト運営を通じて、テクノロジーで「もっと多くの人」へ価値を届けられることに気づきました。",
          color: "#FFD93D",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="pop-in bg-white/5 p-10 rounded-[3.5rem] border border-white/10 backdrop-blur-sm relative overflow-hidden group shadow-xl"
        >
          <div
            className="absolute top-0 left-0 w-2 h-full"
            style={{ backgroundColor: item.color }}
          ></div>
          <h3 className="text-2xl font-black mb-5 text-white">{item.title}</h3>
          <p className="leading-loose font-bold text-gray-400 text-lg">
            {item.text}
          </p>
        </div>
      ))}
    </section>
  );
};
