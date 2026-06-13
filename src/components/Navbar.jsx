// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiStar } from "react-icons/fi";
import { FaClipboardList, FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Modules", href: "#modules" },
    { label: "Matrimonial", href: "#matrimonial" },
    { label: "Community", href: "#community" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${scrolled
        ? "py-3 backdrop-blur-xl border-b border-[#FF9933]/30"
        : "py-5 bg-transparent border-b border-transparent"
        }`}
      style={
        scrolled
          ? {
            background:
              "linear-gradient(180deg,#fbd7b0 0%, #ccefd6 100%)",
          }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2">

        {/* Logo */}
        <div className="flex items-center gap-3.5">
          {/* <div
        className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
        style={{ background: "var(--grad-button)" }}
      > */}
          {/* <FiStar size={18} className="text-[#1a0e00]" /> */}
          {/* </div> */}

          <div>
            {/* <div className="yatra text-[18px] leading-none text-white">
          स्वर्ण समाज
        </div>
        <div className="text-[12px] text-white tracking-[2px]">
          SWARN SAMAJ
        </div> */}
            <img src="logo3.png" alt="" className="w-36" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[16px] transition duration-300 ${scrolled
                ? "text-[#0A2A66] hover:text-[#FF9933]"
                : "text-[#0A2A66] hover:text-[#FF9933]"
                }`}
            >
              {link.label}
            </a>
          ))}

          {/* Family Survey Button */}
          {/* <Link
            to={"/family-survey"}
            className="px-6 py-2.5 rounded-full font-bold text-[14px] transition hover:scale-105 flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg,#FF9933,#138808)",
              color: "#fff"
            }}
          >
            <FaClipboardList size={15} />
            <span>Family Survey</span>
          </Link> */}

          {/* Download App Button */}
          <a
            href="#join"
            className="px-6 py-2.5 rounded-full font-bold text-[14px] transition flex items-center gap-2 text-white"
            style={{
              background: "linear-gradient(135deg,#FF9933,#138808)"
            }}
          >
            <FaGooglePlay size={16} />
            <span>Download APP</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#FF9933]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col items-center gap-6 py-8 border-b border-[#FF9933]/20 backdrop-blur-md md:hidden"
          style={{
            background: "linear-gradient(180deg,#fbd7b0 0%, #ccefd6 100%)"
          }}
        >

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#0A2A66] text-[18px] font-semibold"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#join"
            className="px-5 py-3 rounded-full font-bold text-white flex items-center gap-2"
            style={{ background: "linear-gradient(135deg,#FF9933,#138808)" }}
          >
            <FaGooglePlay size={16} />
            Download APP
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;