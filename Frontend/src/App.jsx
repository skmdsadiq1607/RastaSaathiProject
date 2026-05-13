import React, { useState, useEffect } from 'react';
// Version 1.1.0 - Deployed with Render backend integration

import { Routes, Route, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, ChevronRight, Globe as GlobeIcon, Heart, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';

// Components
import LanguageSwitcher from './components/LanguageSwitcher';
import Logo from './components/Logo';
import PublicChat from './components/PublicChat';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Guide from './pages/Guide';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Safety from './pages/Safety';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync login state on location change (for internal nav)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setIsMenuOpen(false); // Close mobile menu on nav
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/about', label: t('about') },
    { to: '/mission', label: t('vision_mission') },
    { to: '/safety', label: t('road_safety') },
    { to: '/guide', label: t('guide') },
    { to: '/contact', label: t('contact') },
  ];

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <nav className="glass-nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', zIndex: 1100, marginRight: '20px' }}>
            <Logo size={32} />
          </Link>
          
          {/* Desktop Menu */}
          <div className="desktop-menu" style={{ display: 'flex', gap: '15px', alignItems: 'center', flex: 1 }}>
            {navLinks.map(link => (
              <NavLink 
                key={link.to}
                to={link.to} 
                style={({ isActive }) => ({ 
                  color: isActive ? 'var(--brand-red)' : 'var(--text-secondary)', 
                  textDecoration: 'none', 
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  letterSpacing: '0.3px',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s ease'
                })}
              >
                {link.label}
              </NavLink>
            ))}
            
            <div style={{ height: '24px', width: '1px', background: 'var(--border-glass)', margin: '0 5px' }}></div>
            
            <LanguageSwitcher />

            {!isLoggedIn ? (
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginLeft: '10px' }}>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>{t('login')}</Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.8rem' }}>{t('register_btn')}</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginLeft: 'auto' }}>
                <Link to="/profile" className="btn btn-glass" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  padding: '6px 12px',
                  fontSize: '0.8rem'
                }}>
                  <User size={16} /> {t('profile')}
                </Link>
                <Link to="/dashboard" className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                   {t('dashboard')}
                </Link>
                <button onClick={handleLogout} className="btn" style={{ background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px 12px', fontSize: '0.8rem' }}>
                   {t('logout')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle & Quick Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1100 }}>
            {isLoggedIn && (
              <Link 
                to="/profile" 
                style={{ 
                  color: location.pathname === '/profile' ? '#ef4444' : 'white',
                  background: 'rgba(255,255,255,0.05)',
                  width: '40px', height: '40px', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textDecoration: 'none'
                }}
              >
                <User size={20} />
              </Link>
            )}
            <button 
              className="mobile-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white', padding: '10px', borderRadius: '10px', cursor: 'pointer' 
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="mobile-menu"
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%',
                background: 'rgba(2, 6, 23, 0.98)', backdropFilter: 'blur(20px)',
                zIndex: 1050, padding: '100px 40px', display: 'flex', flexDirection: 'column', gap: '30px'
              }}
            >
              {navLinks.map(link => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  style={{ color: 'white', textDecoration: 'none', fontSize: '1.8rem', fontWeight: '800' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '10px 0' }}></div>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="btn btn-glass" style={{ textAlign: 'center' }}>{t('login')}</Link>
                  <Link to="/register" className="btn btn-primary" style={{ textAlign: 'center' }}>{t('register_btn')}</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="btn btn-primary" style={{ textAlign: 'center' }}>{t('dashboard')}</Link>
                  <button onClick={handleLogout} className="btn" style={{ color: '#ef4444' }}>{t('logout')}</button>
                </>
              )}
              <div style={{ marginTop: 'auto' }}>
                <LanguageSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/safety" element={<Safety />} />
        </Routes>
      </main>

      <footer className="glass-panel" style={{ marginTop: 'auto', borderTop: '1px solid var(--border-glass)', borderRadius: 0, padding: '80px 0 40px' }}>
        <div className="container">
          <div className="responsive-grid-4" style={{ marginBottom: '60px' }}>
            <div>
              <Logo size={40} />
              <p style={{ color: 'var(--text-secondary)', marginTop: '20px', lineHeight: '1.6' }}>
                {t('footer_tagline')}
              </p>
              <div style={{ marginTop: '24px', fontWeight: '800', color: '#ef4444', letterSpacing: '1px', fontSize: '0.75rem' }}>
                {t('hackathon_tag')}
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px' }}>{t('human_impact')}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {t('impact_sub')}
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px' }}>{t('strategic_partnerships')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                   <GlobeIcon size={16} color="#3b82f6" /> {t('emergency_liaison')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                   <Heart size={16} color="#ef4444" /> {t('headquarters')}
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px' }}>{t('direct_support')}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>
                {t('direct_support_sub')}
              </p>
              <a href={`mailto:${t('contact_email')}`} style={{ color: '#ef4444', textDecoration: 'none', fontWeight: '700' }}>
                {t('contact_us_now')} &rarr;
              </a>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              &copy; 2026 RastaSaathi. All Rights Reserved.
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {t('made_with')} ❤️ {t('by_team')}
            </div>
          </div>
        </div>
      </footer>

      {/* Public Global Chatbot */}
      <PublicChat />
    </div>
  );
};

export default App;
