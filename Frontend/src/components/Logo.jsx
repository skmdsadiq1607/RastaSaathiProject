import React from 'react';

const Logo = ({ size = 32 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Unmistakable Dove Silhouette */}
        <path 
          d="M21.5 5.5C20.5 4.5 18 4 16 5C14 6 13 8 13 8C13 8 11 6 9 5.5C7 5 5 5.5 4 6.5C3 7.5 3.5 10 5 12C6.5 14 9 16 12 18C15 16 17.5 14 19 12C20.5 10 21 8.5 21 7.5C21 6.5 22.5 6.5 21.5 5.5Z" 
          fill="white" 
        />
        <path 
          d="M12 18C11 19 10 21 8 22C10 21.5 11.5 20 12 18Z" 
          fill="white" 
          opacity="0.7"
        />
        <path 
          d="M12 18C13 19 14 21 16 22C14 21.5 12.5 20 12 18Z" 
          fill="white" 
          opacity="0.7"
        />
        {/* Small Head Detail */}
        <circle cx="12" cy="10" r="2.5" fill="white" />
        <path d="M11 8.5L12 7.5L13 8.5" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

export default Logo;
