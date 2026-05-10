import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

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
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '20px', color: 'white' }}>
          About Rasta<span style={{ color: '#ef4444' }}>Saathi</span>
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
              <Logo size={28} />
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

      {/* Team & Mission Narrative */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center', marginTop: '100px' }}>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '24px' }}>
            Built by <span style={{ color: '#ef4444' }}>Visionaries</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '24px' }}>
            RastaSaathi was born out of the IIT Madras Road Safety Hackathon with a single, unwavering goal: to ensure that technology serves as a bridge to life. Our team combines expertise in AI, geospatial engineering, and emergency medicine.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
            We believe that road safety is not just about rules, but about the reliability of the safety net when those rules fail. Every line of code in RastaSaathi is written to protect, guide, and rescue.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {[
            { label: 'Latency', val: '<2s' },
            { label: 'Uptime', val: '99.9%' },
            { label: 'Coverage', val: 'Global' },
            { label: 'AI Models', val: 'SOTA' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass-panel"
              style={{ padding: '30px', textAlign: 'center' }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444', marginBottom: '8px' }}>{stat.val}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
