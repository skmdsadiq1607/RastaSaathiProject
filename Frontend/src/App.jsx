import React, { useState, useEffect } from 'react';
// Version 1.1.1 - Optimized Alignment and Spacing
import { Routes, Route, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, ChevronRight, Globe as GlobeIcon, Heart, User, Mail, Phone, Home as HomeIcon, LayoutDashboard, ShieldCheck, BookOpen, MessageSquare } from 'lucide-react';
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

const GithubIcon = ({ size = 20 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

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

          {/* Mobile UI - Hidden when menu is open */}
          {!isMenuOpen && (
            <div className="mobile-only-ui" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
              {isLoggedIn && (
                <Link to="/profile" className="mobile-profile-link" style={{ color: 'white' }}>
                  <User size={24} />
                </Link>
              )}
              <button
                className="mobile-toggle"
                onClick={() => setIsMenuOpen(true)}
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
                  cursor: 'pointer'
                }}
              >
                <Menu size={24} />
              </button>
            </div>
          )}
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
                  position: 'fixed', top: 0, right: 0, bottom: 0,
                  width: '100%', height: '100dvh', // Full screen
                  padding: '30px', display: 'flex', flexDirection: 'column',
                  overflowY: 'auto', // Scrollable
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexShrink: 0 }}>
                  <Logo size={28} />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={28} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      style={{
                        fontSize: '1.25rem', fontWeight: '800', color: location.pathname === link.to ? '#ef4444' : 'white',
                        textDecoration: 'none', padding: '20px', borderRadius: '20px',
                        background: location.pathname === link.to ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                        border: location.pathname === link.to ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid transparent',
                        textAlign: 'center'
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0', flexShrink: 0 }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" className="btn btn-glass" style={{ width: '100%', padding: '20px', fontSize: '1.1rem' }} onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
                      <Link to="/register" className="btn btn-primary" style={{ width: '100%', padding: '20px', fontSize: '1.1rem' }} onClick={() => setIsMenuOpen(false)}>{t('register_btn')}</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%', padding: '20px', fontSize: '1.1rem' }} onClick={() => setIsMenuOpen(false)}>{t('dashboard')}</Link>
                      <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn" style={{ color: '#ef4444', width: '100%', background: 'rgba(239, 68, 68, 0.05)', padding: '20px', fontSize: '1.1rem' }}>{t('logout')}</button>
                    </>
                  )}
                </div>

                <div style={{ marginTop: '30px', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '30px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#ef4444', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '3px', textAlign: 'center' }}>
                    {t('language_label')}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LanguageSwitcher variant="grid" />
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
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            gap: '60px', 
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}>
            {/* Left Side: Brand & Mission */}
            <div style={{ flex: '1.5', minWidth: '320px' }}>
              <div style={{ color: 'white', fontWeight: '900', fontSize: '1.8rem', letterSpacing: '1px', marginBottom: '24px' }}>
                Rasta<span style={{ color: '#ef4444' }}>Saathi</span>
              </div>
              <h3 style={{ 
                fontSize: '2rem', 
                color: 'white', 
                marginBottom: '20px',
                lineHeight: '1.2' 
              }}>
                Saving Lives <span style={{ color: '#ef4444' }}>Every Second.</span>
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '1.1rem', 
                lineHeight: '1.7',
                maxWidth: '500px'
              }}>
                At RastaSaathi, we believe every life is precious. Our technology is built to fight for every second, ensuring that the 'Golden Hour' is never lost to bureaucracy or delay.
              </p>
            </div>

            {/* Right Side: Connect Icons Only */}
            <div style={{ 
              flex: '1', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'flex-end',
              minWidth: '200px'
            }}>
              <h4 style={{ color: 'white', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px', opacity: 0.5 }}>Connect</h4>
              <div style={{ display: 'flex', gap: '15px' }}>
                {[
                  { href: `mailto:${t('contact_email')}`, icon: <Mail size={20} />, label: 'Email' },
                  { href: "https://github.com/skmdsadiq1607/RastaSaathiProject", icon: <GithubIcon size={20} />, label: 'Github', target: '_blank' },
                  { to: "/contact", icon: <Phone size={20} />, label: 'Contact' }
                ].map((item, idx) => {
                  const LinkComponent = item.to ? Link : 'a';
                  return (
                    <LinkComponent 
                      key={idx}
                      to={item.to}
                      href={item.href}
                      target={item.target}
                      rel={item.target ? "noopener noreferrer" : undefined}
                      style={{ 
                        width: '45px',
                        height: '45px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: 'var(--text-secondary)',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                    >
                      {item.icon}
                    </LinkComponent>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
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
