import React from 'react';

const Logo = ({ size = 32 }) => {
  // Balanced aspect ratio for text-only branding
  const scale = size / 32;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={140 * scale} height={size} viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rasta - White Heavy Bold */}
        <text 
          x="0" 
          y="24" 
          fill="white" 
          style={{ 
            fontFamily: 'Outfit, Inter, system-ui, sans-serif', 
            fontSize: '24px', 
            fontWeight: '900', 
            letterSpacing: '-1.2px',
          }}
        >
          Rasta
        </text>
        
        {/* Saathi - Red Bold */}
        <text 
          x="66" 
          y="24" 
          fill="#ef4444" 
          style={{ 
            fontFamily: 'Outfit, Inter, system-ui, sans-serif', 
            fontSize: '24px', 
            fontWeight: '900', 
            letterSpacing: '-0.8px',
          }}
        >
          Saathi
        </text>
      </svg>
    </div>
  );
};

export default Logo;
