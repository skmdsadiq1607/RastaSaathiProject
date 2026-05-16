import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-glass)',
        color: 'var(--text-primary)',
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      aria-label="Toggle Theme"
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'var(--brand-red)';
        e.currentTarget.style.background = 'var(--brand-red-glow)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-glass)';
        e.currentTarget.style.background = 'var(--glass-bg)';
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
