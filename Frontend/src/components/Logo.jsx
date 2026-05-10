import React from 'react';

const Logo = ({ size = 32 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Precise Dove with Olive Branch Silhouette */}
        <path 
          d="M21 7.2c-1.3-.7-2.8-1-4.3-.8-1.5.2-2.9.8-4 1.8.5-1.5.4-3.1-.2-4.5-.6-1.4-1.8-2.5-3.3-3.1 0 0 .1.1.2.2.1.2.2.4.2.6 0 .5-.2.9-.5 1.2s-.7.5-1.2.5c-.2 0-.4 0-.6-.1-.1-.1-.2-.1-.2-.2-.2 1.1-.1 2.3.4 3.3.5 1 1.3 1.8 2.2 2.3-.9-.1-1.8-.4-2.6-.9-.8-.5-1.5-1.2-2-2-.1-.1-.2-.2-.3-.1s-.1.2-.1.3c.4 1.8 1.4 3.4 2.8 4.6 1.4 1.1 3.2 1.7 5.1 1.6-1.5.9-3.2 1.5-4.9 1.7-1.7.2-3.4.1-5.1-.3-.2 0-.3.1-.3.3s.1.3.3.3c3.4 1 7 .9 10.3-.2 3.3-1.1 6.2-3.2 8.3-6 .1-.1.1-.3 0-.4s-.3-.2-.4-.1z" 
          fill="white" 
        />
        {/* Stylized Olive Branch Detail */}
        <path 
          d="M7 6c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1zm-2 2c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1zm4-1c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1z" 
          fill="white" 
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export default Logo;
