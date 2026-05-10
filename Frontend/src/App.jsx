import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, LayoutDashboard, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Guide from './pages/Guide';
import PublicChat from './components/PublicChat';
import LanguageSwitcher from './components/LanguageSwitcher';
import Logo from './components/Logo';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { lang, setLang, t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('roadsos_token'));

  // Listen for storage changes to update navbar
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('roadsos_token'));
    };
    window.addEventListener('storage', checkAuth);
    // Custom event for same-tab login
    window.addEventListener('auth-change', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('roadsos_token');
    localStorage.removeItem('roadsos_user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="page-wrapper">
        <div className="ambient-glow glow-red"></div>
        <div className="ambient-glow glow-blue"></div>
        
        <nav className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', padding: '0 20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
              <Logo size={32} />
            </Link>
            
            {/* Desktop Menu */}
            <div className="desktop-menu" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>{t('home')}</Link>
              <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>{t('about')}</Link>
              <Link to="/guide" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>{t('guide')}</Link>
              <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>{t('contact')}</Link>
              
              {isLoggedIn && (
                <Link to="/dashboard" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600' }}>{t('dashboard')}</Link>
              )}

              <LanguageSwitcher />
              
              {!isLoggedIn ? (
                <Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px' }}>{t('login')}</Link>
              ) : (
                <button onClick={handleLogout} className="btn btn-outline" style={{ border: '1px solid #ef4444', color: '#ef4444' }}>Logout</button>
              )}
            </div>

            {/* Mobile Toggle */}
            <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              {isMenuOpen ? <LogOut size={28} /> : <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ width: '25px', height: '3px', background: 'white' }}></div>
                <div style={{ width: '25px', height: '3px', background: 'white' }}></div>
                <div style={{ width: '25px', height: '3px', background: 'white' }}></div>
              </div>}
            </button>
          </div>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ background: 'rgba(2, 6, 23, 0.95)', borderTop: '1px solid var(--border-glass)', overflow: 'hidden' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px', textAlign: 'center' }}>
                  <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>{t('home')}</Link>
                  <Link to="/about" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>{t('about')}</Link>
                  <Link to="/guide" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>{t('guide')}</Link>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>{t('contact')}</Link>
                  {isLoggedIn ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>{t('dashboard')}</Link>
                      <button onClick={handleLogout} className="premium-button">Logout</button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="premium-button">{t('login')}</Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <style>{`
            @media (max-width: 1024px) {
              .desktop-menu { display: none !important; }
              .mobile-toggle { display: block !important; }
            }
          `}</style>
        </nav>

        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AnimatePresence>
        </main>

        <PublicChat />
        
        <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '60px 0', marginTop: 'auto', background: 'rgba(2, 6, 23, 0.5)', textAlign: 'center' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield color="#ef4444" size={24} />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.2rem', color: 'white' }}>
                  Rasta<span style={{ color: '#ef4444' }}>Saathi</span>
                </span>
              </div>
              
              <div style={{ maxWidth: '600px' }}>
                <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px', fontSize: '1.1rem' }}>
                  Made with ❤️ by Team-<span style={{ color: 'white' }}>Rasta</span><span style={{ color: '#ef4444' }}>Saathi</span>
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', letterSpacing: '0.5px' }}>
                  Dr.Lakshmi | Sadiq | Krishna | Chakravarthi | Hasini
                </p>
              </div>

              <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '600' }}>
                  <span style={{ color: '#ef4444' }}>📧</span> rastasaathi@gmail.com
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '600' }}>
                  <span style={{ color: '#ef4444' }}>📞</span> +91 9441921812
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '20px' }}>
                © 2026 RastaSaathi. IIT Madras Road Safety Hackathon Project.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
