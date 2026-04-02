// src/components/Logos/VortexVariations/NexusVortex.jsx
import React from "react";

const SufianLogo = ({ className = "", size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vortexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#D48F29" />
        </linearGradient>
      </defs>

      {/* --- LAYER 1: The BOLD OUTER STRUCTURE --- */}
      <path
        d="M30 40C30 20 70 20 70 40C70 50 30 50 30 60C30 80 70 80 70 60"
        stroke="url(#vortexGradient)"
        strokeWidth="10"
        strokeLinecap="square"
      />

      {/* --- LAYER 2: THE OBSIDIAN NEXUS LINE --- */}
      {/* This creates the architectural 'carved' detail */}
      <path
        d="M30 40C30 20 70 20 70 40C70 50 30 50 30 60C30 80 70 80 70 60"
        stroke="#323130"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.5"
      />
    </svg>
  );
};

export default SufianLogo;
