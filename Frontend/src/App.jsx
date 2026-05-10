import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, Activity, PhoneCall, User } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <div className="ambient-glow glow-red"></div>
        <div className="ambient-glow glow-blue"></div>
        
        <nav className="glass-nav">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield color="#ef4444" size={32} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                Rasta<span style={{ color: '#ef4444' }}>Saathi</span>
              </span>
            </Link>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
              <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>About</Link>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-glass)', margin: '0 10px' }}></div>
              <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600' }}>Sign In</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Get Started</Link>
            </div>
          </div>
        </nav>

        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '40px 0', marginTop: 'auto', background: 'var(--bg-primary)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield color="#ef4444" size={24} />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700' }}>RastaSaathi</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>© 2026 RastaSaathi. IIT Madras Road Safety Hackathon.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
