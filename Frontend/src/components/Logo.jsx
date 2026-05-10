import React from 'react';

const Logo = ({ size = 32 }) => {
  // Size multiplier for scaling
  const scale = size / 32;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={220 * scale} height={size} viewBox="0 0 220 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Continuous ECG Pulse Line travelling through the text */}
        <path 
          d="M0 20H20L24 14L28 26L32 20H75L79 10L85 30L91 20H150L154 12L160 28L164 20H220" 
          stroke="#ef4444" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ opacity: 0.6 }}
        />
        
        {/* Rasta - White Bold */}
        <text 
          x="10" 
          y="24" 
          fill="white" 
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif', 
            fontSize: '24px', 
            fontWeight: '900', 
            letterSpacing: '-1px' 
          }}
        >
          Rasta
        </text>
        
        {/* Saathi - Red Bold */}
        <text 
          x="78" 
          y="24" 
          fill="#ef4444" 
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif', 
            fontSize: '24px', 
            fontWeight: '900', 
            letterSpacing: '-0.5px' 
          }}
        >
          Saathi
        </text>

        {/* Highlight Pulse Spikes (Brighter Red for the spikes themselves) */}
        <path 
          d="M79 10L85 30L91 20" 
          stroke="#ef4444" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
};

export default Logo;
