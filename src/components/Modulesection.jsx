import React, { useState } from "react";
import { modules } from "../components/data/Module";
import { FiShield } from "react-icons/fi";

const ModuleCard = ({ mod, index }) => {
  return (
    <div
      className="perspective group"
      style={{
        animationDelay: `${index * 0.08}s`,
        animation: "fadeUp 0.6s ease forwards",
        opacity: 0,
      }}
    >
      <div className="relative h-[220px] w-full flip-card group-hover:flipped">

        {/* FRONT */}
        <div
          className="flip-face rounded-[24px] p-[28px_24px] bg-white"
          style={{
            border: `2px solid ${mod.color}25`,
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="absolute top-[16px] right-[16px] text-[9px] font-bold tracking-[1.5px] px-[10px] py-[4px] rounded-[20px]"
            style={{
              background:
                mod.badge === "LIVE SOON"
                  ? "var(--grad-button)"
                  : "rgba(0,0,0,0.05)",
              color: mod.badge === "LIVE SOON" ? "#fff" : "#666",
            }}
          >
            {mod.badge}
          </div>

          <div className="mb-[16px]">
            <mod.icon size={40} />
          </div>

          <h3 className="text-[18px] mb-[4px] font-medium">
            {mod.title}
          </h3>

          <div className="text-[15px] mb-[12px] text-[var(--gold)] hindi">
            {mod.titleHi}
          </div>

          <div className="text-[13px] text-gray-500 hidden md:flex">
            Hover to view details
          </div>
        </div>

        {/* BACK */}
        <div
          className="flip-face flip-back rounded-[24px] p-[28px_24px] bg-white"
          style={{
            border: `2px solid ${mod.color}`,
            boxShadow: `0 12px 35px ${mod.color}30`,
          }}
        >
          <h3
            className="text-[18px] mb-[10px] font-semibold"
            style={{ color: mod.color }}
          >
            {mod.title}
          </h3>

          <p className="text-[15px] text-gray-600 leading-[1.6]">
            {mod.desc}
          </p>
        </div>

      </div>
    </div>
  );
};



const ModulesSection = () => {
  return (
    <section
      id="modules"
      className="md:py-[100px] py-[48px] px-[48px]"
      style={{ background: "var(--cream-dark)" }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-[60px]">

          {/* Logo */}
          <div
            className="w-[70px] h-[70px] mx-auto mb-[18px] rounded-full flex items-center justify-center"
            style={{
              background: "var(--grad-gold)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            <FiShield size={34} color="#fff" />
          </div>

          <div className="yatra text-[13px] text-[var(--gold)] tracking-[4px] mb-[10px]">
            हमारे मॉड्यूल
          </div>

          <h2 className="text-[clamp(28px,4vw,48px)] text-[var(--text-dark)] mb-[14px] font-medium">
            All Platform Modules
          </h2>

          <p className="text-[15px] text-[var(--text-muted)] max-w-[500px] mx-auto">
            Hover over any module to see a quick preview. One platform, every
            need.
          </p>

          <div
            className="w-[60px] h-[3px] mx-auto mt-[20px] rounded-[2px]"
            style={{ background: "var(--grad-gold)" }}
          />
        </div>

        {/* Grid */}
        <div className="grid gap-[22px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ModulesSection;