import React from "react";
import {
  FiBriefcase,
  FiUsers,
  FiHeart,
  FiGlobe,
  FiActivity,
  FiBookOpen,
  FiUser,
  FiAward,
  FiFileText,
} from "react-icons/fi";

/* ===============================
   COMMUNITY DATA
================================ */

const communities = [
  {
    name: "Vaishya Samaj",
    nameHi: "वैश्य समाज",
    icon: FiBriefcase,
    desc: "The merchant community — pillars of India's commerce and economy.",
    color: "#FF9933",
  },
  {
    name: "COMMUNITIES",
    nameHi: "सामाजिक एकता",
    icon: FiAward,
    desc: "Unite, uplift and empower the Swarn community across generations.",
    color: "#FF9933",
    featured: true,
  },
  {
    name: "Other  Community",
    nameHi: "अन्य समुदाय",
    icon: FiHeart,
    desc:
      "Inclusive support with dignity, respect and equal opportunity for all.",
    color: "#138808",
  },
  {
    name: "NGOs & Societies",
    nameHi: "NGO और संस्थाएं",
    icon: FiGlobe,
    desc:
      "Registered NGOs, trusts and welfare societies serving the community.",
    color: "#0A2A66",
  },
];

const clubs = [
  { icon: FiActivity, name: "Doctor's Club", nameHi: "चिकित्सक क्लब" },
  { icon: FiFileText, name: "Lawyer's Club", nameHi: "वकील क्लब" },
  { icon: FiBookOpen, name: "Teacher's Club", nameHi: "शिक्षक क्लब" },
  { icon: FiBriefcase, name: "Businessman Club", nameHi: "व्यापारी क्लब" },
  { icon: FiUser, name: "Physiotherapist Club", nameHi: "फिजियोथेरेपिस्ट" },
];

/* ===============================
   COMPONENT
================================ */

const CommunitySection = () => {
  return (
    <section
      id="community"
      className="md:py-[100px] py-[48px] px-6 md:px-12"
      style={{
        background:
          "linear-gradient(180deg,#fff7ed 0%, #ffffff 50%, #ecfdf5 100%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}

        <div className="text-center mb-[60px]">

          <div className="yatra text-[13px] text-[#FF9933] tracking-[4px] mb-[10px]">
            समुदाय
          </div>

          <h2 className="text-[clamp(28px,4vw,48px)] text-[#0A2A66] mb-[14px] font-semibold">
            Our Communities
          </h2>

          <p className="text-[15px] text-[#64748b] max-w-[500px] mx-auto">
            One platform for multiple communities — each with their own
            dedicated space, voice and support.
          </p>

          <div
            className="w-[60px] h-[3px] mx-auto mt-[20px] rounded"
            style={{
              background: "linear-gradient(90deg,#FF9933,#138808)",
            }}
          />
        </div>

        {/* Community Cards */}

        <div className="grid gap-[22px] mb-[60px] [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">

          {communities.map((c, i) => {
            const Icon = c.icon;

            return (
              <div
                key={i}
                className="relative p-[34px_26px] border transition hover:-translate-y-[5px] bg-white"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  borderColor: `${c.color}25`,
                }}
              >

                {c.featured && (
                  <div
                    className="absolute -top-3 right-5 text-white text-[10px] font-extrabold px-[14px] py-[4px] rounded-full tracking-[1px]"
                    style={{
                      background: "linear-gradient(135deg,#FF9933,#138808)",
                    }}
                  >
                    FLAGSHIP
                  </div>
                )}

                <div
                  className="mb-[14px]"
                  style={{
                    color: c.color,
                  }}
                >
                  <Icon size={36} />
                </div>

                <h3
                  className="text-[20px] font-semibold mb-[4px]"
                  style={{
                    color: "#0A2A66",
                  }}
                >
                  {c.name}
                </h3>

                <div
                  className="hindi text-[13px] mb-[12px]"
                  style={{
                    color: "#FF9933",
                  }}
                >
                  {c.nameHi}
                </div>

                <p
                  className="text-[13px] leading-[1.6] mb-[18px]"
                  style={{
                    color: "#64748b",
                  }}
                >
                  {c.desc}
                </p>

                <div
                  className="inline-flex items-center gap-[6px] text-[12px] font-semibold px-[14px] py-[5px] rounded-full"
                  style={{
                    background: `${c.color}15`,
                    color: c.color,
                  }}
                >
                  <span
                    className="w-[7px] h-[7px] rounded-full"
                    style={{
                      background: c.color,
                      animation: "pulse-ring 2s infinite",
                    }}
                  />
                  Coming Soon
                </div>

              </div>
            );
          })}
        </div>

        {/* Professional Clubs */}

        <div
  className="rounded-[28px] px-[44px] md:py-[52px] py-[30px]"
  style={{
    background: "linear-gradient(75deg,#fff3e6,#dff7e5)"
  }}
>

          <div className="text-center mb-[40px] ">

            <h3 className="text-[30px] text-black mb-[6px] font-semibold">
              Professional Clubs
            </h3>

            <p className="hindi text-[18px] text-black">
              पेशेवर क्लब
            </p>

          </div>

          <div className="grid gap-[14px] [grid-template-columns:repeat(auto-fill,minmax(175px,1fr))]">

            {clubs.map((club, i) => {
              const Icon = club.icon;

              return (
                <div
                  key={i}
                  className="text-center cursor-pointer transition rounded-[16px] px-[14px] py-[18px]"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.15)";
                  }}
                >
                  <div className="mb-[8px] flex justify-center">
                    <Icon size={28} color="black" />
                  </div>

                  <div className="text-[15px] text-black mb-[4px] font-medium">
                    {club.name}
                  </div>

                  <div className="hindi text-[14px] text-black/90">
                    {club.nameHi}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CommunitySection;