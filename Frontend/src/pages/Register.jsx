import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Custom Google Login Button (Registration via Google uses the same logic since we upsert the user)
  const registerWithGoogle = useGoogleLogin({
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
    onError: () => setError('Google Registration Failed')
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '40px 0' }}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-panel" 
        style={{ width: '100%', maxWidth: '500px', padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Join RastaSaathi and protect your loved ones</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', border: '1px solid rgba(239,68,68,0.2)', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">First Name</label>
              <input type="text" className="form-input" placeholder="John" />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Last Name</label>
              <input type="text" className="form-input" placeholder="Doe" />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="you@example.com" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Emergency Contact Phone</label>
            <input type="tel" className="form-input" placeholder="+91 98765 43210" />
          </div>
          
          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          
          <button type="button" className="btn btn-primary" style={{ width: '100%', marginBottom: '16px', padding: '14px' }}>
            Create Account
          </button>
          
          <div style={{ position: 'relative', textAlign: 'center', margin: '24px 0' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border-glass)' }}></div>
            <span style={{ position: 'relative', background: 'var(--bg-primary)', padding: '0 16px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>or</span>
          </div>

          <button 
            type="button" 
            onClick={() => registerWithGoogle()}
            disabled={loading}
            className="btn btn-outline" 
            style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '12px', opacity: loading ? 0.7 : 1 }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width="20" />
            {loading ? 'Authenticating...' : 'Sign up with Google'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: '600' }}>Sign In</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;
