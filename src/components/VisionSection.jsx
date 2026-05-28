import React from "react";
import {
  FiUsers,
  FiMessageCircle,
  FiHeart,
  FiBriefcase,
  FiTrendingUp,
  FiBell,
  FiLifeBuoy,
  FiUser,
  FiSmile,
  FiHome,
  FiAward,
  FiZap
} from "react-icons/fi";

const goals = [
  { icon: FiUsers, title: "Sangathan", titleHi: "संगठन", desc: "Youth, Women & Professional groups for instant guidance & unity." },
  { icon: FiMessageCircle, title: "Samvaad", titleHi: "संवाद", desc: "Direct communication between every member of the community." },
  { icon: FiHeart, title: "Sahyog", titleHi: "सहयोग", desc: "Stand together in times of need with collective strength." },
  { icon: FiBriefcase, title: "Vyapaar", titleHi: "व्यापार", desc: "Commerce within the community first — empower our own." },
  { icon: FiTrendingUp, title: "Rozgaar", titleHi: "रोजगार", desc: "Community members providing jobs to our own youth." },
  { icon: FiBell, title: "Suchna", titleHi: "सूचना", desc: "Rapid information dissemination to maximum members." },
  { icon: FiLifeBuoy, title: "Madad", titleHi: "मदद", desc: "Identify and support the needy in our community." },
  { icon: FiUser, title: "Vriddhjan", titleHi: "वृद्धजन", desc: "Honor seniors, spend time, gain wisdom and give back." },
  { icon: FiSmile, title: "Divyangjan", titleHi: "दिव्यांगजन", desc: "Build a better future for children with special needs." },
  { icon: FiHome, title: "Vidhwa Sambal", titleHi: "विधवा संबल", desc: "Support and rehabilitation for widows who need help." },
  { icon: FiAward, title: "Praabuddh Varg", titleHi: "प्रबुद्ध वर्ग", desc: "Successful members guiding the community with expertise." },
  { icon: FiZap, title: "Startup", titleHi: "स्टार्टअप", desc: "Guide and fund new business ideas within our community." }
];

const VisionSection = () => {
  return (
    <section
      id="vision"
      className="md:py-[100px] py-[48px] px-[40px]"
      style={{
        background:
          "linear-gradient(180deg,#fff7ed 0%, #ffffff 50%, #ecfdf5 100%)"
      }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-[64px]">

          <div className="yatra text-[16px] text-[#FF9933] tracking-[4px] mb-[12px]">
            दूरगामी लक्ष्य
          </div>

          <h2 className="text-[clamp(28px,4vw,48px)] text-[#0A2A66] mb-[16px] font-medium">
            Our Vision & Goals
          </h2>

          <p className="text-[#475569] max-w-[560px] mx-auto text-[16px] leading-[1.7]">
            समाज का समग्र विकास — A comprehensive platform to address every
            need of our community.
          </p>

          <div
            className="w-[60px] h-[3px] mx-auto mt-[24px] rounded-[2px]"
            style={{
              background: "linear-gradient(90deg,#FF9933,#138808)"
            }}
          />
        </div>

        {/* Goals Grid */}
        <div className="grid gap-[20px] grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">

          {goals.map((goal, i) => (
            <div
              key={i}
              className="bg-white border border-[#e2e8f0] rounded-[20px] p-[28px_24px] cursor-pointer transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[#FF9933]/40"
            >

              <div className="mb-[16px] text-[#FF9933]">
                <goal.icon size={34} />
              </div>

              <h3 className="text-[19px] text-[#0A2A66] mb-[4px] font-medium">
                {goal.title}
              </h3>

              <div className="hindi text-[15px] text-[#FF9933] mb-[10px]">
                {goal.titleHi}
              </div>

              <p className="text-[15px] text-[#475569] leading-[1.6]">
                {goal.desc}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default VisionSection;