import React from 'react';

const Logo = ({ size = 32 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Elegant Professional Dove Silhouette */}
        <path 
          d="M21 10C21 10 18 8 15 8C12 8 10 10 10 10C10 10 8 7 5 7C2 7 1 10 1 10C1 10 2 15 7 17C12 19 14 17 14 17C14 17 16 22 21 22C19 18 21 10 21 10Z" 
          fill="white" 
        />
        <path 
          d="M21 10C22 9 23 7 23 5C23 3 21 2 20 2C19 2 18 3 18 5C18 7 19 9 21 10Z" 
          fill="white" 
        />
        {/* Beak Detail */}
        <path 
          d="M20 2L22 1" 
          stroke="white" 
          strokeWidth="1" 
          strokeLinecap="round" 
        />
      </svg>
    </div>
  );
};

export default Logo;
