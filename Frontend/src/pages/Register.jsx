import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../components/Logo';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        name: formData.name,
        phone: formData.email, // Backend uses 'phone' field for identity
        password: formData.password,
        role: 'victim' // Default role
      });
      
      localStorage.setItem('token', res.data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      window.dispatchEvent(new Event('storage'));
      navigate('/dashboard');
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.post(`${API_BASE_URL}/auth/google`, {
          token: tokenResponse.access_token
        });
        localStorage.setItem('token', res.data.data.accessToken);
        localStorage.setItem('user', JSON.stringify(res.data.data.user));
        window.dispatchEvent(new Event('storage'));
        navigate('/dashboard');
      } catch (err) {
        console.error("Registration Error:", err);
        setError(err.response?.data?.message || 'Failed to create account.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google Registration Failed')
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', paddingTop: '40px', paddingBottom: '40px' }}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-panel" 
        style={{ width: '100%', maxWidth: '500px', padding: 'clamp(24px, 8vw, 50px)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
            <Logo size={48} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: '900', marginBottom: '12px', letterSpacing: '-1px' }}>{t('register_title')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{t('register_sub')}</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(239,68,68,0.2)', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-secondary)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Full Name</label>
            <input 
              type="text" 
              name="name"
              className="form-input" 
              placeholder="John Doe" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-secondary)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t('email_label')}</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="you@example.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-secondary)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t('password_label')}</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <button 
            type="submit" 
            className="premium-button" 
            disabled={loading}
            style={{ width: '100%', marginBottom: '20px', padding: '18px', border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creating Account...' : t('register_btn')}
          </button>
          
          <div style={{ position: 'relative', textAlign: 'center', margin: '32px 0' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border-glass)' }}></div>
            <span style={{ position: 'relative', background: 'var(--bg-primary)', padding: '0 16px', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600' }}>or continue with</span>
          </div>

          <button 
            type="button" 
            onClick={() => registerWithGoogle()}
            disabled={loading}
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px', 
              background: 'white', 
              color: '#1f2937', 
              padding: '16px', 
              borderRadius: '12px', 
              border: 'none', 
              fontWeight: '700', 
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
              opacity: loading ? 0.7 : 1
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? 'Authenticating...' : 'Sign up with Google'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)', fontSize: '1rem' }}>
          {t('have_account')} <Link to="/login" style={{ color: 'var(--accent-red)', textDecoration: 'none', fontWeight: '700' }}>Login here</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;

