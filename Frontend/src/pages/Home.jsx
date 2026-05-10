import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, Map, MessageSquare, Clock } from 'lucide-react';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container"
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 100px' }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '600', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            IIT Madras Road Safety Hackathon 2026
          </span>
        </motion.div>
        
        <h1 style={{ fontSize: '4.5rem', marginBottom: '24px' }}>
          Seconds Save <span className="text-gradient-red">Lives.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          The world's most advanced AI-powered emergency response platform. Trigger an SOS, get real-time AI triage, and route to the nearest hospital instantly.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/register" className="btn btn-danger" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            <ShieldAlert size={20} /> Request Access
          </Link>
          <Link to="/dashboard" className="btn btn-glass" style={{ padding: '16px 32px', fontSize: '1.1rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'white' }}>
            Demo SOS
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        {[
          { icon: <ShieldAlert color="#ef4444" size={32} />, title: "Instant SOS", desc: "One tap instantly alerts emergency contacts via WhatsApp with your live GPS location." },
          { icon: <Map color="#3b82f6" size={32} />, title: "AI Hospital Routing", desc: "Geospatially maps 300+ hospitals to find the fastest route equipped for your severity." },
          { icon: <MessageSquare color="#10b981" size={32} />, title: "Medical Chatbot", desc: "Powered by Claude & Gemini to provide life-saving first-aid instructions while waiting." },
          { icon: <Clock color="#f59e0b" size={32} />, title: "Real-time ETAs", desc: "Live socket connections beam ambulance locations directly to hospital dashboards." }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            className="glass-panel" 
            style={{ padding: '32px' }}
          >
            <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.05)', display: 'inline-flex', padding: '16px', borderRadius: '16px' }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;
