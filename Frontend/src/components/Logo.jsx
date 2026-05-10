import React from 'react';

const Logo = ({ size = 32 }) => {
  const scale = size / 32;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={260 * scale} height={size} viewBox="0 0 260 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Surgical Glow Filter */}
        <defs>
          <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The Vital Heartbeat - Refined Path */}
        <path 
          d="M0 20 H30 L35 12 L42 28 L48 20 H90 L95 5 L102 30 L108 15 L114 20 H180 L185 10 L192 28 L198 20 H260" 
          stroke="#ef4444" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          filter="url(#neon)"
          style={{ opacity: 0.9 }}
        />
        
        {/* Rasta - Ultra Bold White */}
        <text 
          x="35" 
          y="24" 
          fill="white" 
          style={{ 
            fontFamily: 'Outfit, Inter, system-ui, sans-serif', 
            fontSize: '26px', 
            fontWeight: '900', 
            letterSpacing: '-1.5px',
          }}
        >
          Rasta
        </text>
        
        {/* Saathi - Ultra Bold Red */}
        <text 
          x="108" 
          y="24" 
          fill="#ef4444" 
          style={{ 
            fontFamily: 'Outfit, Inter, system-ui, sans-serif', 
            fontSize: '26px', 
            fontWeight: '900', 
            letterSpacing: '-1.2px',
          }}
        >
          Saathi
        </text>

        {/* High-Contrast Spike Highlights */}
        <path 
          d="M95 5 L102 30 L108 15" 
          stroke="white" 
          strokeWidth="1" 
          strokeLinecap="round" 
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default Logo;
