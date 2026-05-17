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
      <span style={{ color: 'var(--text-primary)' }}>Rasta</span>
      <span style={{ 
        background: light ? 'var(--text-primary)' : 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginLeft: '1px'
      }}>Saathi</span>
    </div>
  );
};

export default Logo;
