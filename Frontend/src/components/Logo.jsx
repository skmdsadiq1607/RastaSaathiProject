import React from 'react';

const Logo = ({ size = 32 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M21 5C21 5 18 2 13 2C8 2 3 5 3 5C3 5 2 11 7 13C12 15 15 13 15 13C15 13 16 18 12 21C16 21 21 17 21 11C21 5 21 5 21 5Z" 
          fill="white" 
        />
        <path 
          d="M7 13C5 15 3 21 3 21C7 21 9 15 7 13Z" 
          fill="white" 
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export default Logo;
