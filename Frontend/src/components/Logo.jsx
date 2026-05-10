import React from 'react';
import { Shield } from 'lucide-react';

const Logo = ({ size = 28 }) => {
  return (
    <div 
      className="logo-container" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        fontFamily: 'var(--font-heading)',
        fontSize: `${size}px`,
        fontWeight: '900',
        letterSpacing: '-1.5px',
        userSelect: 'none'
      }}
    >
      <Shield color="#ef4444" size={size * 0.85} strokeWidth={2.5} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'white' }}>Rasta</span><span style={{ color: '#ef4444' }}>Saathi</span>
      </div>
    </div>
  );
};

export default Logo;
