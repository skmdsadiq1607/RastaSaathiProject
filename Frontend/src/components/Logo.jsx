import React from 'react';

const Logo = ({ size = 32 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Literal Professional Dove Silhouette */}
        <path 
          d="M21 5C21 5 18.5 2 14.5 2C10.5 2 7 5 7 5C7 5 3 7 2 11C1 15 4 19 8 19C12 19 15 16 15 16C15 16 16.5 19 19 19C21.5 19 23 16.5 23 13.5C23 10.5 21 5 21 5Z" 
          fill="white" 
        />
        <path 
          d="M7 5C5 7 2 13 2 13C2 13 5 15 7 13C9 11 7 5 7 5Z" 
          fill="white" 
          opacity="0.9"
        />
        <path 
          d="M21 5C21 5 23 10.5 23 13.5C23 16.5 21.5 19 19 19C16.5 19 15 16 15 16C15 16 17 14 19 12C21 10 21 5 21 5Z" 
          fill="white" 
          opacity="0.9"
        />
        {/* The Head & Beak Detail */}
        <circle cx="14.5" cy="5.5" r="2.5" fill="white" />
        <path d="M16 4.5L18 3.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Logo;
