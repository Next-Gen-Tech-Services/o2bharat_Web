import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const platformLinks = [
    "Matrimonial",
    "Job Portal",
    "Business Pages",
    "Events",
    "Donations",
    "Startup Ideas",
  ];

  return (
    <footer
      className="border-t py-[60px] px-6 md:px-10 pb-[30px]"
      style={{
        background:
          "linear-gradient(180deg,#fbd7b0 0%, #ccefd6 100%)",
        borderColor: "rgba(255,153,51,0.15)",
      }}
    >

      <div className="max-w-[1200px] mx-auto">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-14 mb-12">

          {/* Brand */}
          <div className="text-center sm:text-left">

            <div className="flex items-center justify-center sm:justify-start gap-3 mb-5">

              {/* <div
                className="w-[44px] h-[44px] flex items-center justify-center rounded-full text-[22px]"
                style={{ background: "linear-gradient(135deg,#FF9933,#138808)" }}
              >
                ⭐
              </div>

              <div>
                <div className="yatra text-[18px] text-[#FF9933]">
                  स्वर्ण समाज
                </div>

                <div className="text-[9px] text-[#0A2A66] tracking-[2px]">
                  SWARN SAMAJ
                </div>
              </div> */}

              <img src="logo3.png" alt="" className="w-36" />


            </div>

            <p className="hindi text-[14px] text-[#0A2A66] leading-[1.8] max-w-[420px] mx-auto sm:mx-0">
              "संगच्छध्वं संवदध्वम्" — एक डिजिटल प्लेटफॉर्म जो समाज को
              एकजुट करने का प्रयास करता है।
            </p>

            {/* WhatsApp Button */}
            {/* <div className="mt-6 flex justify-center sm:justify-start">
              <a
                href="https://chat.whatsapp.com/J8d07SJbwzlB3lX9R3iUA6?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-[12px] rounded-full text-[14px] font-bold bg-[#25D366] text-white hover:bg-[#20b858] transition"
              >
                <FaWhatsapp size={16} />
                Join WhatsApp
              </a>
            </div> */}

          </div>

          {/* Platform Links */}
          <div className="text-center sm:text-left">

            <h4 className="text-[#FF9933] text-[16px] mb-5">
              Platform
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-2">
              {platformLinks.map((item) => (
                <a
                  key={item}
                  href="#modules"
                  className="text-[#0A2A66] text-[13px] hover:text-[#FF9933] transition"
                >
                  {item}
                </a>
              ))}
            </div>

          </div>

          {/* Legal & Support */}
          <div className="text-center sm:text-left">

            <h4 className="text-[#FF9933] text-[16px] mb-5">
              Legal & Support
            </h4>

            <div className="flex flex-col gap-2">
              <a
                href="/privacy-policy"
                className="text-[#0A2A66] text-[13px] hover:text-[#FF9933] transition"
              >
                Privacy Policy
              </a>

              <a
                href="/terms-and-conditions"
                className="text-[#0A2A66] text-[13px] hover:text-[#FF9933] transition"
              >
                Terms & Conditions
              </a>

              <a
                href="/support"
                className="text-[#0A2A66] text-[13px] hover:text-[#FF9933] transition"
              >
                Support
              </a>

               <a
                href="/child-safety"
                className="text-[#0A2A66] text-[13px] hover:text-[#FF9933] transition"
              >
                Child Safety
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 flex justify-center items-center gap-3 text-center"
          style={{ borderColor: "rgba(255,153,51,0.15)" }}>

          <div className="text-[#64748b] text-[12px]">
            © 2026 DIGITAL PLATFORM FOR COMMUNITIES. All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;