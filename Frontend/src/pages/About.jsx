import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Zap, Map as MapIcon } from 'lucide-react';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '24px' }}>
          About <span className="text-gradient">RastaSaathi</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          Built for the IIT Madras Road Safety Hackathon 2026. Our mission is to eliminate the 'Golden Hour' delay in road accident response using Artificial Intelligence and automated dispatch systems.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '2rem' }}>The Architecture</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Brain color="#a855f7" size={28} />
              <h3 style={{ fontSize: '1.25rem' }}>AI Triage Engine</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Dual-model fallback architecture utilizing Anthropic Claude 3.5 Sonnet and Google Gemini 1.5 Flash to instantly predict injury severity and provide interactive first-aid guidance.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <MapIcon color="#3b82f6" size={28} />
              <h3 style={{ fontSize: '1.25rem' }}>Geospatial Routing</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Powered by MongoDB `$near` queries and Google Maps API. We don't just find the closest hospital, we find the closest hospital equipped for your specific medical severity.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Zap color="#f59e0b" size={28} />
              <h3 style={{ fontSize: '1.25rem' }}>Instant Dispatch</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Integrated directly with Twilio's WhatsApp API to bypass traditional SMS delays, blasting live locations and ETAs to emergency contacts in milliseconds.
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default About;
