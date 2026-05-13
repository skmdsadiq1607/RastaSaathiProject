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
import RoadSafety from './pages/RoadSafety';

function App() {
  const { t, lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'ur', label: 'اردو' }
  ];

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <nav className="glass-nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', zIndex: 1100 }}>
            <Logo size={32} />
          </Link>
          
          {/* Desktop Menu */}
          <div className="desktop-menu" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navLinks.map(link => (
              <NavLink 
                key={link.to}
                to={link.to} 
                style={({ isActive }) => ({ 
                  color: isActive ? 'var(--brand-red)' : 'var(--text-secondary)', 
                  textDecoration: 'none', 
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  transition: 'color 0.3s ease'
                })}
              >
                {link.label}
              </NavLink>
            ))}
            
            <div style={{ height: '24px', width: '1px', background: 'var(--border-glass)', margin: '0 8px' }}></div>
            
            <LanguageSwitcher />

            {!isLoggedIn ? (
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginLeft: '12px' }}>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}>{t('login')}</Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>{t('register_btn')}</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginLeft: '12px' }}>
                <Link to="/profile" className="btn btn-glass" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '8px 16px',
                  fontSize: '0.85rem'
                }}>
                  <User size={16} /> {t('profile')}
                </Link>
                <Link to="/dashboard" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                   {t('dashboard')}
                </Link>
                <button onClick={handleLogout} className="btn" style={{ background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '8px 16px', fontSize: '0.8rem' }}>
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
                  width: '48px', height: '48px', borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textDecoration: 'none'
                }}
              >
                <User size={22} />
              </Link>
            )}
            <button 
              className="mobile-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: 'white', 
                cursor: 'pointer',
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 1100px) {
            .desktop-menu { display: none !important; }
            .mobile-toggle { display: flex !important; }
            .glass-nav { background: #020617 !important; border-bottom: 1px solid rgba(255,255,255,0.1); }
          }
        `}</style>
      </nav>

      {/* Mobile Menu Overlay - MOVED OUTSIDE NAV */}
      <AnimatePresence>
        {isMenuOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ position: 'absolute', inset: 0, background: '#020617' }}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{ 
                position: 'absolute', top: 0, right: 0, bottom: 0, width: '100%',
                background: '#020617', 
                display: 'flex', flexDirection: 'column', padding: '80px 24px 40px',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <Logo size={28} />
                <button onClick={() => setIsMenuOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '10px', borderRadius: '12px' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--brand-red)', letterSpacing: '2px', marginBottom: '16px' }}>Navigation</p>
                {navLinks.map(link => (
                  <NavLink 
                    key={link.to}
                    to={link.to} 
                    style={({ isActive }) => ({ 
                      color: isActive ? 'var(--brand-red)' : 'white', 
                      textDecoration: 'none', 
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      padding: '16px 20px',
                      background: isActive ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    })}
                  >
                    {link.label}
                    <ChevronRight size={20} opacity={0.3} />
                  </NavLink>
                ))}
              </div>
              
              <div style={{ marginTop: 'auto' }}>
                <div style={{ padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '32px' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '24px' }}>Select Language</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {languages.map(l => {
                      const isActive = lang === l.code;
                      return (
                        <button 
                          key={l.code}
                          onClick={() => setLang(l.code)}
                          style={{
                            padding: '12px', borderRadius: '12px', border: isActive ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                            background: isActive ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
                            color: isActive ? '#ef4444' : 'white', fontWeight: '700', fontSize: '0.85rem'
                          }}
                        >
                          {l.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {!isLoggedIn ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Link to="/login" className="btn btn-glass" style={{ width: '100%' }}>{t('login')}</Link>
                    <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>{t('register_btn')}</Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Link to="/profile" style={{ 
                      padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)', color: 'white', fontWeight: '800',
                      textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px'
                    }}>
                      <User size={20} /> {t('profile')}
                    </Link>
                    <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%' }}>{t('dashboard')}</Link>
                    <button onClick={handleLogout} className="btn" style={{ width: '100%', border: '1px solid #ef4444', color: '#ef4444', background: 'transparent' }}>{t('logout')}</button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main style={{ flex: 1, paddingTop: 'var(--nav-height)' }}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/safety" element={<RoadSafety />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '100px 0 60px', marginTop: '120px', background: 'rgba(2, 6, 23, 0.8)', position: 'relative' }}>
        <div className="container">
          <div className="responsive-grid" style={{ marginBottom: '80px' }}>
             <div>
                <Logo size={28} />
                <p style={{ color: 'var(--text-secondary)', marginTop: '24px', fontSize: '1rem', lineHeight: '1.8', maxWidth: '300px' }}>
                  {t('footer_tagline')}
                </p>
             </div>
             <div>
                <h4 style={{ color: 'white', marginBottom: '28px', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('navigation')}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   {navLinks.map(l => (
                     <Link key={l.to} to={l.to} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>{l.label}</Link>
                   ))}
                </div>
             </div>
             <div>
                <h4 style={{ color: 'white', marginBottom: '28px', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('contact')}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{t('contact_email')}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{t('contact_phone')}</p>
                </div>
             </div>
          </div>
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '30px' }}>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', fontWeight: '600' }}>
              © 2026 RASTASAATHI. {t('hackathon_tag')}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', fontWeight: '800', letterSpacing: '0px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '10px' }}>
                   Made with <Heart size={16} color="#ef4444" fill="#ef4444" />
                </div>
                <span>by Team-Rasta<span style={{ color: '#ef4444' }}>Saathi</span></span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                Dr Lakshmi | Sadiq | Krishna | Chakravarthi | Hasini
              </div>
            </div>
          </div>
        </div>
      </footer>
      <PublicChat />
    </div>
  );
}

export default App;
