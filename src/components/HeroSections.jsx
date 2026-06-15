import React from "react";
import { FiHeart } from "react-icons/fi";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-10 pt-[120px] pb-[60px]"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(255,153,51,0.25), transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(19,136,8,0.22), transparent 50%),
          linear-gradient(135deg,#fff7ed 0%,#ffffff 40%,#ecfdf5 100%)
        `,
        marginTop: "-80px",
      }}
    >
      {/* Mandala rings */}
      {[320, 450, 580].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: `rgba(255,153,51,${0.15 - i * 0.04})`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: `spin-slow ${22 + i * 10}s linear infinite ${
              i % 2 === 0 ? "" : "reverse"
            }`,
          }}
        />
      ))}

      <div className="max-w-[900px] text-center relative z-[2] animate-fadeUp">

        {/* Sloka */}
        <div className="inline-block bg-white/60 border border-[#FF9933]/40 rounded-full px-7 py-2 mb-8 backdrop-blur">
          <span className="hindi text-[16px] text-[#FF9933] tracking-[1px]">
            "संगच्छध्वं संवदध्वम्"
          </span>

          <span className="text-[#0A2A66] text-[14px] ml-[10px]">
            — Let us move & speak together
          </span>
        </div>

        {/* Heading */}
        <h1 className="yatra text-[clamp(48px,8vw,90px)] text-[#FF9933] leading-[1.1] mb-2 drop-shadow-[0_0_50px_rgba(255,153,51,0.35)]">
          सामाजिक एकता
        </h1>

        <h2 className="text-[clamp(18px,3vw,28px)] text-[#0A2A66] tracking-[4px] mb-7">
          DIGITAL PLATFORM FOR COMMUNITIES okoko
        </h2>

        <p className="hindi text-[clamp(14px,2vw,18px)] text-[#0A2A66] leading-[1.8] max-w-[640px] mx-auto mb-5">
          समाज के उत्थान और एकजुटता की ओर एक नया कदम 🌟
        </p>

        <p className="text-[16px] text-[#0A2A66] leading-[1.7] max-w-[560px] mx-auto mb-11">
          A dedicated digital platform for our community — connecting families,
          empowering professionals, and building a stronger tomorrow together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-[60px]">

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeesRD4Aur6tjRa1lqmXYPvGMgm3uH6ujwQlLVum4AP4-Sn2Q/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-[16px] font-extrabold text-white transition transform hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg,#FF9933,#138808)",
              boxShadow: "0 10px 35px rgba(19,136,8,0.35)",
            }}
          >
            <FiHeart size={20} />
            Register for Community
          </a>

          <a
            href="#modules"
            className="px-10 py-4 rounded-full text-[16px] font-semibold border border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933]/10 transition"
          >
            Explore All Modules →
          </a>

        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10">

          {[
            { num: "16+", label: "Modules", labelHi: "मॉड्यूल" },
            { num: "5+", label: "Communities", labelHi: "समुदाय" },
            { num: "∞", label: "Connections", labelHi: "संबंध" },
          ].map((stat, i) => (
            <div key={i} className="text-center">

              <div className="text-[36px] font-bold text-[#FF9933] leading-none">
                {stat.num}
              </div>

              <div className="text-[#0A2A66] text-[12px] tracking-[1px]">
                {stat.label} /
                <span className="hindi ml-1">{stat.labelHi}</span>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <div
          className="w-[1px] h-[40px]"
          style={{
            background: "linear-gradient(to bottom,#FF9933,transparent)",
            animation: "fadeUp 1.5s ease-in-out infinite",
          }}
        />
      </div>
          
    </section>
  );
};

export default HeroSection;