import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ paddingTop: '60px', paddingBottom: '100px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>Get in <span style={{ color: '#ef4444' }}>Touch</span></h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>Have questions about the project or want to collaborate?</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-panel" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <Mail color="#ef4444" size={24} />
            </div>
            <div>
              <div style={{ fontWeight: '700' }}>Email Us</div>
              <div style={{ color: 'var(--text-secondary)' }}>contact@rastasaathi.in</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <Phone color="#3b82f6" size={24} />
            </div>
            <div>
              <div style={{ fontWeight: '700' }}>Call Us</div>
              <div style={{ color: 'var(--text-secondary)' }}>+91 94419 21812</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <MapPin color="#10b981" size={24} />
            </div>
            <div>
              <div style={{ fontWeight: '700' }}>Location</div>
              <div style={{ color: 'var(--text-secondary)' }}>IIT Madras, Chennai</div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '40px' }}>
          <h3 style={{ marginBottom: '24px' }}>Send a Message</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" className="form-input" placeholder="Your Name" />
            <input type="email" className="form-input" placeholder="Your Email" />
            <textarea className="form-input" rows="4" placeholder="How can we help?" style={{ resize: 'none' }}></textarea>
            <button 
              className="premium-button" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px',
                background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
              }}
            >
              <Send size={18} /> Send Message
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Global Support Narrative */}
      <div style={{ marginTop: '120px', textAlign: 'center' }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '24px' }}>
            Supporting the <span style={{ color: '#ef4444' }}>Global Community</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            RastaSaathi is more than a regional tool; it is a blueprint for global road safety. We are actively seeking partnerships with municipal authorities, hospital networks, and tech innovators to expand our digital safety net worldwide.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '60px', flexWrap: 'wrap' }}>
            {[
              { label: 'Partnerships', val: 'Active' },
              { label: 'Response Time', val: 'Minimal' },
              { label: 'AI Accuracy', val: '99%' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>{stat.val}</div>
                <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
