import React from 'react';

const Logo = ({ size = 32 }) => {
  // Use a taller internal canvas for better vertical maneuvering
  const scale = size / 40;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={280 * scale} height={size} viewBox="0 0 280 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Perfectly Balanced Heartbeat Path (Centered at y=20) */}
        <path 
          d="M0 20 H40 L45 8 L52 32 L58 20 H100 L105 2 L112 38 L118 15 L124 20 H195 L200 8 L207 32 L213 20 H280" 
          stroke="#ef4444" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          filter="url(#neon-glow)"
          style={{ opacity: 0.9 }}
        />
        
        {/* Rasta - Mathematically centered vertically */}
        <text 
          x="45" 
          y="28" 
          fill="white" 
          style={{ 
            fontFamily: 'Outfit, Inter, system-ui, sans-serif', 
            fontSize: '28px', 
            fontWeight: '900', 
            letterSpacing: '-1.8px',
          }}
        >
          Rasta
        </text>
        
        {/* Saathi - Mathematically centered vertically */}
        <text 
          x="118" 
          y="28" 
          fill="#ef4444" 
          style={{ 
            fontFamily: 'Outfit, Inter, system-ui, sans-serif', 
            fontSize: '28px', 
            fontWeight: '900', 
            letterSpacing: '-1.5px',
          }}
        >
          Saathi
        </text>

        {/* High-Precision Spike Highlights */}
        <path 
          d="M105 2 L112 38 L118 15" 
          stroke="white" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default Logo;
