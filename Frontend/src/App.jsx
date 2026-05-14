import React, { useState, useEffect } from 'react';
// Version 1.1.1 - Optimized Alignment and Spacing
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

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setIsMenuOpen(false);
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
        <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%', height: '80px' }}>
          {/* Logo Section */}
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', marginRight: '30px' }}>
            <Logo size={32} />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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
            </div>
            
            <div style={{ height: '24px', width: '1px', background: 'var(--border-glass)', margin: '0 20px' }}></div>
            
            <LanguageSwitcher />

            {/* Right Side Actions */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px', alignItems: 'center' }}>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>{t('login')}</Link>
                  <Link to="/register" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>{t('register_btn')}</Link>
                </>
              ) : (
                <>
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
                  <button onClick={handleLogout} className="btn" style={{ 
                    background: 'transparent', 
                    border: '1px solid rgba(239, 68, 68, 0.3)', 
                    color: '#ef4444', 
                    padding: '8px 16px', 
                    fontSize: '0.85rem' 
                  }}>
                    {t('logout')}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile UI */}
          <div className="mobile-only-ui" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px', zIndex: 1100 }}>
            {isLoggedIn && (
              <Link to="/profile" className="mobile-profile-link" style={{ color: 'white' }}>
                <User size={24} />
              </Link>
            )}
            <button 
              className="mobile-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: 'white',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mobile-menu-backdrop"
                style={{ backdropFilter: 'blur(10px)' }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Drawer */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="mobile-menu-drawer"
                style={{
                  position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(320px, 85vw)',
                  padding: '40px 30px', display: 'flex', flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                  <Logo size={28} />
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      style={{
                        fontSize: '1.1rem', fontWeight: '700', color: location.pathname === link.to ? '#ef4444' : 'white',
                        textDecoration: 'none', padding: '16px 20px', borderRadius: '16px',
                        background: location.pathname === link.to ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                        transition: 'all 0.3s ease',
                        border: location.pathname === link.to ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid transparent'
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '30px 0' }}></div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" className="btn btn-glass" style={{ width: '100%', padding: '18px', fontSize: '1rem' }} onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
                      <Link to="/register" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1rem' }} onClick={() => setIsMenuOpen(false)}>{t('register_btn')}</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1rem' }} onClick={() => setIsMenuOpen(false)}>{t('dashboard')}</Link>
                      <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn" style={{ color: '#ef4444', width: '100%', background: 'rgba(239, 68, 68, 0.05)', padding: '18px', fontSize: '1rem' }}>{t('logout')}</button>
                    </>
                  )}
                </div>

                <div style={{ marginTop: 'auto', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: '900', color: '#ef4444', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' }}>
                    {t('language_label')}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LanguageSwitcher />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <main style={{ flex: 1, paddingTop: '120px' }}>
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
          <Route path="/safety" element={<RoadSafety />} />
        </Routes>
      </main>

      <footer className="glass-panel" style={{ marginTop: 'auto', borderTop: '1px solid var(--border-glass)', borderRadius: 0, padding: '80px 0 40px' }}>
        <div className="container">
          <div className="responsive-grid-4" style={{ marginBottom: '60px' }}>
            <div>
              <Logo size={40} />
              <p style={{ color: 'var(--text-secondary)', marginTop: '20px', lineHeight: '1.6' }}>
                {t('footer_tagline').split(/(RastaSaathi)/g).map((part, i) => 
                  part === 'RastaSaathi' ? <span key={i}>Rasta<span style={{ color: '#ef4444' }}>Saathi</span></span> : part
                )}
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
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
            <div style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>
              Rasta<span style={{ color: '#ef4444' }}>Saathi</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>
              {t('made_with')} ❤️ {t('by_team')}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: '500', letterSpacing: '1px' }}>
              Dr.Lakshmi | Sadiq | Krishna | Chakravarthi | Hasini
            </div>
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', marginTop: '10px' }}>
              &copy; 2026 RastaSaathi. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      <PublicChat />
    </div>
  );
};

export default App;
