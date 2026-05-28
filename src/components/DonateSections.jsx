import React from "react";

const donationCauses = [
  { icon: "📚", title: "Child Education", titleHi: "बाल शिक्षा", desc: "Help poor children access quality education", color: "#2e6e4a", raised: 65 },
  { icon: "🍱", title: "Feed a Child", titleHi: "भोजन दान", desc: "Provide nutritious meals to underprivileged kids", color: "#c8922a", raised: 80 },
  { icon: "🐄", title: "Feed Animals", titleHi: "पशु सेवा", desc: "Care for stray and needy animals in our community", color: "#4a2e9a", raised: 45 },
  { icon: "♿", title: "Divyangjan Support", titleHi: "दिव्यांगजन सहायता", desc: "Equipment, therapy and care for persons with disabilities", color: "#9a2e2e", raised: 55 },
  { icon: "💐", title: "Widow Support", titleHi: "विधवा सहायता", desc: "Support and rehabilitation for widows in the community", color: "#b83272", raised: 40 },
  { icon: "🚀", title: "Startup Fund", titleHi: "उद्यमिता निधि", desc: "Seed funding for financially weak entrepreneurs", color: "#2e6e8a", raised: 30 },
];

const DonateSection = () => {
  return (
    <section
      id="donate"
      className="py-[100px] px-6 md:px-10 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#120800,#1a0e00)" }}
    >
      {/* Background glow */}
      <div
        className="absolute -left-[100px] top-[20%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,146,42,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16">

          <div className="yatra text-[14px] text-[var(--gold)] tracking-[4px] mb-3">
            दान और सेवा
          </div>

          <h2 className="text-[clamp(28px,4vw,48px)] text-[#faf6ee] mb-4">
            Donations & Help
          </h2>

          <p className="text-white max-w-[500px] mx-auto text-[16px]">
            Every rupee goes directly to the cause. Use our QR code to donate instantly.
          </p>

          <div className="w-[60px] h-[3px] bg-[var(--grad-gold)] mx-auto mt-6 rounded" />
        </div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-[60px] items-center">

          {/* QR Box */}
          <div className="bg-white/[0.04] border border-[rgba(200,146,42,0.25)] rounded-[28px] px-[36px] py-[48px] text-center">

            <h3 className="text-[22px] text-[var(--gold-bright)] mb-2">
              Scan & Donate
            </h3>

            <p className="hindi text-white text-[14px] mb-8">
              QR कोड से दान करें
            </p>

            {/* QR Placeholder */}
            <div className="w-[200px] h-[200px] bg-white rounded-[16px] mx-auto mb-6 flex items-center justify-center border-[4px] border-[var(--gold-bright)] shadow-[0_0_40px_rgba(200,146,42,0.3)]">
              <span className="text-black text-sm">QR CODE</span>
            </div>

            <p className="text-white text-[12px] leading-relaxed">
              Replace this with your actual UPI / QR code.
              <br />
              All donations are used transparently.
            </p>

            <div className="mt-6 bg-[rgba(200,146,42,0.1)] border border-[rgba(200,146,42,0.2)] rounded-[12px] p-[14px] text-[13px] text-[var(--gold-bright)]">
              🔒 Secure • Transparent • Verified
            </div>

          </div>

          {/* Causes */}
          <div className="flex flex-col gap-4">

            {donationCauses.map((cause, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-[16px] px-5 py-4 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${cause.color}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${cause.color}12`;
                  e.currentTarget.style.borderColor = `${cause.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = `${cause.color}30`;
                }}
              >

                <span className="text-[28px] flex-shrink-0">
                  {cause.icon}
                </span>

                <div className="flex-1">

                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[15px] text-[#faf6ee]">
                      {cause.title}
                    </span>

                    <span className="hindi text-[12px] text-white">
                      {cause.titleHi}
                    </span>
                  </div>

                  <p className="text-[12px] text-white mb-2">
                    {cause.desc}
                  </p>

                  {/* Progress */}
                  <div className="h-[4px] bg-white/[0.06] rounded">

                    <div
                      className="h-full rounded transition-all duration-700"
                      style={{
                        width: `${cause.raised}%`,
                        background: `linear-gradient(90deg, ${cause.color}, ${cause.color}cc)`,
                      }}
                    />

                  </div>

                </div>

                <button
                  className="text-[12px] font-bold px-3 py-[6px] rounded-[20px] whitespace-nowrap"
                  style={{
                    background: `${cause.color}20`,
                    color: cause.color,
                    border: `1px solid ${cause.color}40`,
                  }}
                >
                  Donate
                </button>

              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default DonateSection;