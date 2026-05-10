import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
      style={{ paddingTop: '60px', paddingBottom: '100px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '20px' }}>
          About <span style={{ color: '#ef4444' }}>RastaSaathi</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          Revolutionizing road safety through AI-powered emergency response and real-time trauma care orchestration.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '100px' }}>
        <div className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <Target color="#ef4444" size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Our Mission</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            To minimize the "Golden Hour" response time by connecting accident victims with the nearest specialized trauma centers instantly using AI and real-time geofencing.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <Eye color="#3b82f6" size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Our Vision</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            A future where no road accident fatality occurs due to delay in medical assistance or lack of first-aid knowledge. We aim to be the digital backbone of India's road safety infrastructure.
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '40px' }}>Built for the IIT Madras Road Safety Hackathon</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ef4444' }}>370+</div>
            <div style={{ color: 'var(--text-secondary)' }}>Hospitals Integrated</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#3b82f6' }}>AI</div>
            <div style={{ color: 'var(--text-secondary)' }}>Medical Assistant</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#10b981' }}>Live</div>
            <div style={{ color: 'var(--text-secondary)' }}>Emergency Alerts</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
