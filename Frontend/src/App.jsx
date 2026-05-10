import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, LayoutDashboard, LogOut, User } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Contact from './pages/Contact';

function App() {
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
        
        <nav className="glass-nav">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', flexWrap: 'wrap', padding: '10px 20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield color="#ef4444" size={32} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                Rasta<span style={{ color: '#ef4444' }}>Saathi</span>
              </span>
            </Link>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '0.8rem' }}>About</Link>
              <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '0.8rem' }}>Contact</Link>
              
              {isLoggedIn && (
                <>
                  <Link to="/dashboard" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                    <LayoutDashboard size={16} /> Dash
                  </Link>
                </>
              )}
              {!isLoggedIn ? (
                <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
              ) : (
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.7rem', border: '1px solid #ef4444', color: '#ef4444' }}>
                  Out
                </button>
              )}
            </div>
          </div>
        </nav>

        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield color="#ef4444" size={24} />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.2rem' }}>RastaSaathi</span>
              </div>
              
              <div style={{ maxWidth: '600px' }}>
                <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px', fontSize: '1.1rem' }}>
                  Made with ❤️ by Team-RastaSaathi
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', letterSpacing: '0.5px' }}>
                  Dr.Lakshmi | Sadiq | Krishna | Chakravarthi | Hasini
                </p>
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
