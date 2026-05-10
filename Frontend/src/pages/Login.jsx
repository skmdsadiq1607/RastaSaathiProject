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
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width="20" />
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
