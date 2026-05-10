import React from 'react';

const Logo = ({ size = 32 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Deep Crimson Solid Heart */}
        <path 
          d="M50 85 C 50 85, 20 60, 20 40 C 20 30, 28 22, 38 22 C 45 22, 50 27, 50 27 C 50 27, 55 22, 62 22 C 72 22, 80 30, 80 40 C 80 60, 50 85, 50 85" 
          fill="#ef4444" 
        />
        {/* Solid White Pulse Line */}
        <path 
          d="M32 45h8l5-15 8 30 5-15h10" 
          fill="none" 
          stroke="white" 
          strokeWidth="5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
};

export default Logo;
