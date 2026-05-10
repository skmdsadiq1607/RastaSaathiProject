import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
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

function App() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

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

  return (
    <div className="page-wrapper">
      <div className="ambient-glow glow-red"></div>
      <div className="ambient-glow glow-blue"></div>
      
      <nav className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', padding: '0 20px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <Logo size={32} />
          </Link>
          
          <div className="desktop-menu" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' })}>{t('home')}</NavLink>
            <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' })}>{t('about')}</NavLink>
            <NavLink to="/mission" style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' })}>{t('vision_mission')}</NavLink>
            <NavLink to="/guide" style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' })}>{t('guide')}</NavLink>
            <NavLink to="/contact" style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' })}>{t('contact')}</NavLink>
            
            <LanguageSwitcher />

            {!isLoggedIn ? (
              <>
                <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' })}>{t('login')}</NavLink>
                <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px' }}>Register</Link>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'var(--text-primary)', textDecoration: 'none', fontWeight: '600' })}>{t('dashboard')}</NavLink>
                <button onClick={handleLogout} className="btn btn-outline" style={{ border: '1px solid #ef4444', color: '#ef4444', padding: '8px 15px' }}>Logout</button>
              </>
            )}
          </div>

          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            {isMenuOpen ? <LogOut size={28} /> : <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '25px', height: '3px', background: 'white' }}></div>
              <div style={{ width: '25px', height: '3px', background: 'white' }}></div>
              <div style={{ width: '25px', height: '3px', background: 'white' }}></div>
            </div>}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ background: 'rgba(2, 6, 23, 0.95)', borderTop: '1px solid var(--border-glass)', overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '15px', textAlign: 'center' }}>
                <NavLink to="/" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'white', textDecoration: 'none', fontSize: '1.1rem' })}>{t('home')}</NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'white', textDecoration: 'none', fontSize: '1.1rem' })}>{t('about')}</NavLink>
                <NavLink to="/mission" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'white', textDecoration: 'none', fontSize: '1.1rem' })}>{t('vision_mission')}</NavLink>
                <NavLink to="/guide" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'white', textDecoration: 'none', fontSize: '1.1rem' })}>{t('guide')}</NavLink>
                <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'white', textDecoration: 'none', fontSize: '1.1rem' })}>{t('contact')}</NavLink>
                
                <div style={{ padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <LanguageSwitcher />
                </div>

                {!isLoggedIn ? (
                  <>
                    <NavLink to="/login" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'white', textDecoration: 'none', fontSize: '1.1rem' })}>{t('login')}</NavLink>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn btn-primary">Register</Link>
                  </>
                ) : (
                  <>
                    <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'var(--accent-red)' : 'white', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '700' })}>{t('dashboard')}</NavLink>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn btn-danger">Logout</button>
                  </>
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
            <Route path="/mission" element={<Mission />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '60px 0', marginTop: 'auto', background: 'rgba(2, 6, 23, 0.5)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Logo size={24} />
            </div>
            <div style={{ maxWidth: '600px' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t('footer_tagline')}</p>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              © 2026 RastaSaathi. Designed for IIT Madras Road Safety Hackathon.
            </div>
          </div>
        </div>
      </footer>
      <PublicChat />
    </div>
  );
}

export default App;
