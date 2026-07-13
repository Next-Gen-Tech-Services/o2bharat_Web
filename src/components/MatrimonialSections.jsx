import React, { useState } from "react";
import { membershipPlans } from "../components/data/Module";
import { FaWhatsapp } from "react-icons/fa";
import RequestModal from "./RequestModal";

import Phone1 from "../../public/o2bApp1.png";
import Phone2 from "../../public/o2bApp2.png";
import Phone3 from "../../public/o2bApp3.png";
import Phone4 from "../../public/o2bApp4.png";
import Phone5 from "../../public/o2bApp5.png";

const ProfileScreen = () => (
  <>
    <div className="text-center mb-[4px]">
      <div
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-[28px] mx-auto mb-2"
        style={{
          background: "linear-gradient(135deg,#FF9933,#138808)",
        }}
      >
        👤
      </div>

      <div className="text-[12px] text-[#FF9933] font-bold">Amit Sharma</div>

      <div className="text-[9px] text-[#ffffff]">
        28 yrs • Software Engineer • Delhi
      </div>
    </div>

    {[
      ["Education", "B.Tech, IIT Delhi"],
      ["Community", "Swarn Samaj"],
      ["Height", `5'10"`],
      ["Status", "Never Married"],
    ].map(([key, val], i) => (
      <div
        key={i}
        className="flex justify-between py-[5px] text-[9px] border-b border-black/10"
      >
        <span className="text-[#ffffff]">{key}</span>
        <span className="text-[#ffffff]">{val}</span>
      </div>
    ))}
  </>
);

const MatrimonialSection = () => {
  const [activeScreen, setActiveScreen] = useState(1);
  const screens = [Phone1, Phone2, Phone3, Phone4, Phone5];
  const [openRequestModal, setOpenRequestModal] = useState(false);

  return (
    <section
      id="matrimonial"
      className="relative overflow-hidden py-[60px] md:py-[120px] px-5 md:px-10"
      style={{
        background:
          "linear-gradient(180deg,#fff7ed 0%, #ffffff 50%, #ecfdf5 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 70% 40%, rgba(255,153,51,0.18), transparent 60%),
            radial-gradient(circle at 20% 70%, rgba(19,136,8,0.12), transparent 60%)
          `,
        }}
      />

      <div
        className="
max-w-[1200px] mx-auto
grid grid-cols-1 md:grid-cols-2
gap-[40px] md:gap-[80px]
items-center
"
      >
        {/* LEFT CONTENT */}
        <div>
          <div className="yatra text-[14px] text-[#FF9933] tracking-[4px] mb-3">
            सामाजिक एकता ऐप
          </div>

          <h2 className="text-[28px] md:text-[clamp(34px,4vw,52px)] text-[#0A2A66] mb-5 leading-[1.2]">
            One App For <br />
            <span className="text-[#138808]"> ALL COMMUNITIES</span>
          </h2>

          <p className="hindi text-[15px] md:text-[17px] text-[#0A2A66] leading-[1.9] mb-9 max-w-[520px]">
            समाज के लिए एक डिजिटल मंच जहाँ समाज के लोग आपस में जुड़ सकेंगे —
            विवाह, रोजगार, व्यापार, सहायता और सामुदायिक कार्यक्रमों के लिए।
          </p>

          {/* Features */}
          <div className="flex flex-col gap-[14px] mb-9">
            {[
              { icon: "👤", text: "Create your profile & find matches " },
              {
                icon: "🤝",
                text: "Become a Matchmaker — create profiles on behalf of others",
              },
              {
                icon: "💌",
                text: "Send interest; contact revealed only on mutual acceptance",
              },
              {
                icon: "🔒",
                text: "Privacy-first: contact info hidden until both parties agree",
              },
            ].map((f, i) => (
              <div key={i} className="flex gap-3 items-start max-w-full">
                <span className="text-[20px] flex-shrink-0">{f.icon}</span>

                <span className="text-[13px] sm:text-[14px] text-[#0A2A66] leading-[1.5] break-words">
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex  flex-row  md:gap-4 gap-4">
            <a
              href="#join"
              className="px-7 md:px-8 py-[12px] md:py-[14px] rounded-[40px] text-[13px] md:text-[15px] font-extrabold text-white shadow-[0_8px_30px_rgba(19,136,8,0.4)]"
              style={{
                background: "linear-gradient(135deg,#FF9933,#138808)",
              }}
            >
              Download APP
            </a>

            {/* <a
              href="https://chat.whatsapp.com/J8d07SJbwzlB3lX9R3iUA6?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-[12px] md:py-[14px] rounded-[40px] text-[13px] md:text-[15px] font-bold bg-[#25D366] text-white hover:bg-[#20b858] transition"
            >
              <FaWhatsapp size={18} />
              Join WhatsApp
            </a> */}

            <button
              onClick={() => setOpenRequestModal(true)}
              className="px-7 md:px-8 py-[12px] md:py-[14px] rounded-[40px] text-[13px] md:text-[15px] font-extrabold text-white shadow-[0_8px_30px_rgba(19,136,8,0.4)] cursor-pointer"
              style={{
                background: "linear-gradient(135deg,#FF9933,#138808)",
              }}
            >
              Raise a request
            </button>
          </div>
        </div>

        {/* PHONE MOCKUPS */}
        <div className="relative flex justify-center items-center mt-12 md:mt-0 h-[320px] sm:h-[360px] md:h-auto">
          {screens.map((screen, i) => {
            const isActive = i === activeScreen;

            let offset = i - activeScreen;

            // Make the carousel circular
            if (offset > screens.length / 2) {
              offset -= screens.length;
            }
            if (offset < -screens.length / 2) {
              offset += screens.length;
            }

            return (
              <div
                key={i}
                onClick={() => setActiveScreen(i)}
                className="absolute transition-all duration-500 cursor-pointer"
                style={{
                  transform: `translateX(${offset * 120}px) scale(${isActive ? 1 : 0.8})`,
                  opacity:
                    Math.abs(offset) > 1 ? 0 : 0.6 + (isActive ? 0.4 : 0),
                  zIndex: isActive ? 10 : 5,
                }}
              >
                <img
                  src={screen}
                  alt={`Phone Mockup ${i + 1}`}
                  className="w-[180px] sm:w-[220px] md:w-[280px] rounded-4xl border border-3 border-gray-200 lg:w-[320px] object-contain select-none pointer-events-none"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Screen selector dots */}
      <div className="flex justify-center gap-2 mt-[40px]">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveScreen(i)}
            className={`h-[8px] rounded-[4px] transition-all ${i === activeScreen
              ? "w-[24px] bg-[#FF9933]"
              : "w-[8px] bg-[rgba(255,153,51,0.3)]"
              }`}
          />
        ))}
      </div>
      <RequestModal
        isOpen={openRequestModal}
        onClose={() => setOpenRequestModal(false)}
      />
    </section>
  );
};

export default MatrimonialSection;

{
  /* Membership plans */
}
{
  /* <div style={{ maxWidth: 1200, margin: '80px auto 0' }}>
        <h3 style={{
          fontFamily: 'Outfit', fontSize: 32,
          color: '#faf6ee', textAlign: 'center', marginBottom: 8,
        }}>
          Membership Plans
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 40, fontFamily: 'Tiro Devanagari Hindi' }}>
          सदस्यता योजना
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 20,
        }}>
          {membershipPlans.map((plan, i) => (
            <div key={i} style={{
              background: plan.popular
                ? 'linear-gradient(135deg, rgba(200,146,42,0.15), rgba(232,184,75,0.08))'
                : 'rgba(255,255,255,0.03)',
              border: `2px solid ${plan.popular ? '#c8922a' : 'rgba(200,146,42,0.12)'}`,
              borderRadius: 20,
              padding: '28px 24px',
              position: 'relative',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #c8922a, #e8b84b)',
                  color: '#1a0e00', fontSize: 10, fontWeight: 800,
                  padding: '4px 14px', borderRadius: 20, letterSpacing: 1,
                }}>MOST POPULAR</div>
              )}
              <div style={{ fontFamily: 'Outfit', fontSize: 20, color: '#e8b84b', marginBottom: 4 }}>
                {plan.name}
              </div>
              <div style={{ fontFamily: 'Tiro Devanagari Hindi', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
                {plan.nameHi}
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#faf6ee', fontFamily: 'Outfit' }}>
                {plan.price}
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>{plan.period}</span>
              </div>
              <div style={{ height: 1, background: 'rgba(200,146,42,0.15)', margin: '16px 0' }} />
              {plan.features.map((f, j) => (
                <div key={j} style={{
                  display: 'flex', gap: 8, alignItems: 'flex-start',
                  marginBottom: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)',
                }}>
                  <span style={{ color: '#c8922a', fontSize: 12, marginTop: 2 }}>✦</span>
                  {f}
                </div>
              ))}
              <button style={{
                width: '100%',
                marginTop: 20,
                background: plan.popular
                  ? 'linear-gradient(135deg, #c8922a, #e8b84b)'
                  : 'transparent',
                color: plan.popular ? '#1a0e00' : '#e8b84b',
                border: plan.popular ? 'none' : '1px solid rgba(200,146,42,0.4)',
                borderRadius: 30,
                padding: '12px',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div> */
}
