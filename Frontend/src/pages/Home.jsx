import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Heart, Bell } from 'lucide-react';

const Home = () => {
  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '120px' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', padding: '8px 20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '30px', color: '#ef4444', fontWeight: '700', marginBottom: '30px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
        >
          🚀 IIT Madras Road Safety Hackathon 2026
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '24px' }}
        >
          Saving Lives in the <br />
          <span style={{ color: '#ef4444' }}>Golden Hour.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px' }}
        >
          RastaSaathi is India's first AI-powered emergency response network that connects accident victims to trauma centers in milliseconds.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/dashboard" className="premium-button sos-pulse" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
            Try Live Demo
          </Link>
          <Link to="/about" className="btn btn-outline" style={{ padding: '16px 40px', fontSize: '1.1rem', border: '1px solid var(--glass-border)', color: 'white', textDecoration: 'none' }}>
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        <FeatureCard 
          icon={<Zap color="#ef4444" />} 
          title="Instant Response" 
          desc="Unified SOS trigger that finds the nearest hospital and alerts contacts simultaneously." 
        />
        <FeatureCard 
          icon={<Shield color="#3b82f6" />} 
          title="AI Medic" 
          desc="Step-by-step first-aid guidance powered by medical-grade AI models." 
        />
        <FeatureCard 
          icon={<Bell color="#10b981" />} 
          title="Smart Alerts" 
          desc="Multi-channel alerts via WhatsApp and SMS with live location sharing." 
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-panel" 
    style={{ padding: '40px', textAlign: 'center' }}
  >
    <div style={{ background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
  </motion.div>
);

export default Home;
