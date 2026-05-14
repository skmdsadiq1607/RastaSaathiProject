import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = ({ variant = 'dropdown' }) => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'ur', label: 'اردو' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangLabel = languages.find(l => l.code === lang)?.label || 'English';

  if (variant === 'grid') {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '12px', 
        width: '100%' 
      }}>
        {languages.map((l) => (
          <motion.button
            key={l.code}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLang(l.code)}
            style={{
              padding: '16px',
              borderRadius: '16px',
              border: lang === l.code ? '2px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
              background: lang === l.code ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.03)',
              color: lang === l.code ? '#ef4444' : 'white',
              fontSize: '1rem',
              fontWeight: '800',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            {l.label}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '10px 18px',
          borderRadius: '14px',
          cursor: 'pointer',
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: '700',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease'
        }}
      >
        <Globe size={18} color="#ef4444" />
        <span style={{ letterSpacing: '0.5px' }}>{currentLangLabel}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '180px',
              background: 'rgba(2, 6, 23, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '10px',
              zIndex: 1100,
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(24px)'
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-secondary)', padding: '8px 12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Select Language
            </div>
            {languages.map((l) => (
              <motion.div
                key={l.code}
                whileHover={{ x: 5, background: 'rgba(255,255,255,0.05)' }}
                onClick={() => {
                  setLang(l.code);
                  setIsOpen(false);
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  color: lang === l.code ? '#ef4444' : 'rgba(255,255,255,0.8)',
                  background: lang === l.code ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                  fontSize: '0.95rem',
                  fontWeight: lang === l.code ? '800' : '600',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {l.label}
                {lang === l.code && (
                  <motion.div 
                    layoutId="active-lang-dot"
                    style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444' }} 
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
