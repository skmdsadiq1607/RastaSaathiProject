import React from 'react';

const Logo = ({ size = 28, light = false }) => {
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
      <span style={{ color: 'white' }}>Rasta</span>
      <span style={{ 
        background: light ? 'white' : 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
        WebkitBackgroundClip: light ? 'initial' : 'text',
        WebkitTextFillColor: light ? 'white' : 'transparent',
        marginLeft: '1px'
      }}>Saathi</span>
    </div>
  );
};

export default Logo;
