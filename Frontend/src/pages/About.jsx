import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Shield, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
      style={{ paddingTop: '60px', paddingBottom: '100px' }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '20px' }}>
          About <span style={{ color: '#ef4444' }}>RastaSaathi</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          Revolutionizing road safety through AI-powered emergency response and real-time trauma care orchestration.
        </p>
      </div>

      {/* Vision & Mission */}
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

      {/* Technical Backbone */}
      <div className="glass-panel" style={{ padding: '60px', marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '40px', fontSize: '2.5rem', textAlign: 'center' }}>The Digital Backbone</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Shield color="#ef4444" size={28} />
              <h3 style={{ fontSize: '1.4rem' }}>Unified SOS Protocol</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Our proprietary SOS engine doesn't just send a message. In one single execution, it captures GPS coordinates, queries our hospital database using geospatial `$near` logic, and fires concurrent alerts via Twilio's WhatsApp and SMS gateways.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Users color="#3b82f6" size={28} />
              <h3 style={{ fontSize: '1.4rem' }}>AI Triage & First Aid</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Using high-performance models like Claude 3.5 and Gemini 1.5, RastaSaathi provides interactive first-aid guidance. It acts as a digital first-responder, giving precise instructions for bleeding control, CPR, and trauma stabilization.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <ShieldCheck color="#10b981" size={28} />
              <h3 style={{ fontSize: '1.4rem' }}>Hospital Intelligence</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              We've curated a database of 370+ trauma centers across Hyderabad. The system utilizes Google's Distance Matrix API with a local straight-line distance fallback to ensure a response even under low-bandwidth conditions.
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default About;
