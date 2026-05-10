import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Custom Google Login Button
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError('');
        
        // 1. Send the Google Access Token to our backend
        const res = await axios.post(`${API_BASE_URL}/auth/google`, {
          token: tokenResponse.access_token
        });

        // 2. Save the returned JWT from our own backend
        localStorage.setItem('roadsos_token', res.data.data.accessToken);
        localStorage.setItem('roadsos_user', JSON.stringify(res.data.data.user));
        
        // Notify Navbar
        window.dispatchEvent(new Event('auth-change'));

        // 3. Redirect to the SOS Dashboard
        navigate('/dashboard');

      } catch (err) {
        console.error("Google Auth Error:", err);
        setError(err.response?.data?.message || 'Failed to authenticate with Google.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google Login Failed')
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-panel" 
        style={{ width: '100%', maxWidth: '450px', padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to your RastaSaathi account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', border: '1px solid rgba(239,68,68,0.2)', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="you@example.com" />
          </div>
          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          
          <button type="button" className="btn btn-primary" style={{ width: '100%', marginBottom: '16px', padding: '14px' }}>
            Sign In
          </button>
          
          <div style={{ position: 'relative', textAlign: 'center', margin: '24px 0' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border-glass)' }}></div>
            <span style={{ position: 'relative', background: 'var(--bg-primary)', padding: '0 16px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>or</span>
          </div>

          <button 
            type="button" 
            onClick={() => loginWithGoogle()}
            disabled={loading}
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px', 
              background: 'white', 
              color: '#1f2937', 
              padding: '12px', 
              borderRadius: '8px', 
              border: 'none', 
              fontWeight: '600', 
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? 'Connecting...' : 'Sign in with Google'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: '600' }}>Register here</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
