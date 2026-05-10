import React from 'react';

const Logo = ({ size = 32 }) => {
  const scale = size / 32;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={240 * scale} height={size} viewBox="0 0 240 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glow Filter for the Heartbeat */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Hyper-Pulse ECG Line - Weaving through the text */}
        <path 
          d="M0 20 H15 L18 10 L22 30 L26 20 H70 L75 5 L82 28 L88 15 L94 20 H150 L155 8 L162 30 L168 18 L174 20 H240" 
          stroke="#ef4444" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          filter="url(#glow)"
        />
        
        {/* Rasta - White Heavy Weight */}
        <text 
          x="12" 
          y="24" 
          fill="white" 
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif', 
            fontSize: '26px', 
            fontWeight: '900', 
            letterSpacing: '-1.5px',
            textShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        >
          Rasta
        </text>
        
        {/* Saathi - Red Bold with Glow */}
        <text 
          x="82" 
          y="24" 
          fill="#ef4444" 
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif', 
            fontSize: '26px', 
            fontWeight: '900', 
            letterSpacing: '-1px',
            textShadow: '0 0 15px rgba(239, 68, 68, 0.4)'
          }}
        >
          Saathi
        </text>

        {/* Foreground Pulse Accents (Crossing in front of letters) */}
        <path 
          d="M18 10 L22 30 L26 20" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          opacity="0.3"
        />
        <path 
          d="M75 5 L82 28 L88 15" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export default Logo;
