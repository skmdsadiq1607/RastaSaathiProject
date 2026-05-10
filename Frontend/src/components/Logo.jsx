import React from 'react';

const Logo = ({ size = 32, showText = true }) => {
  // Size multiplier to keep everything proportional
  const scale = size / 32;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={showText ? 180 * scale : size} height={size} viewBox={showText ? "0 0 180 32" : "0 0 32 32"} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rasta - White Bold */}
        <text 
          x="0" 
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
        
        {/* Saathi - Red Medium */}
        <text 
          x="68" 
          y="24" 
          fill="#ef4444" 
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif', 
            fontSize: '24px', 
            fontWeight: '500', 
            letterSpacing: '-0.5px' 
          }}
        >
          Saathi
        </text>
        
        {/* Subtle Heart Pulse Accent flowing from the 'i' */}
        <path 
          d="M152 18H160L163 10L167 26L170 18H180" 
          stroke="#ef4444" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ opacity: 0.8 }}
        />
      </svg>
    </div>
  );
};

export default Logo;
