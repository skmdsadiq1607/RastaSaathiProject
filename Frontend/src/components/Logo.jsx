import React from 'react';

const Logo = ({ size = 28 }) => {
  return (
    <div 
      className="logo-container" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        fontFamily: 'var(--font-heading)',
        fontSize: `${size}px`,
        fontWeight: '900',
        letterSpacing: '-1.5px',
        userSelect: 'none'
      }}
    >
      <span style={{ color: 'white' }}>Rasta</span><span style={{ color: '#ef4444' }}>Saathi</span>
    </div>
  );
};

export default Logo;
