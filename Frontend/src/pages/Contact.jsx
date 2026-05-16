import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ paddingBottom: '100px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900' }}>
          {t('contact_us_now')}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.2rem' }}>
          {t('contact_sub')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-panel" style={{ padding: '35px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'var(--brand-red-glow)', padding: '15px', borderRadius: '15px' }}>
              <Mail color="#ef4444" size={28} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{t('email_us')}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{t('contact_email')}</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '35px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '15px' }}>
              <Phone color="#3b82f6" size={28} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{t('call_us')}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{t('contact_phone')}</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '35px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '15px', borderRadius: '15px' }}>
              <MapPin color="#10b981" size={28} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{t('location')}</div>
              <div style={{ color: 'var(--text-secondary)' }}>IIT Madras, Chennai</div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '50px' }}>
          <h3 style={{ marginBottom: '32px', fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>Send a Message</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <input type="text" className="form-input" placeholder="Your Name" />
            <input type="email" className="form-input" placeholder="Your Email" />
            <textarea className="form-input" rows="4" placeholder="How can we help?" style={{ resize: 'none' }}></textarea>
            <button 
              className="premium-button" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px',
                background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '800',
                cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)'
              }}
            >
              <Send size={20} /> {t('send_message')}
            </button>
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
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '24px' }}>
            {t('global_community_title')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '850px', margin: '0 auto' }}>
            {t('global_community_sub')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginTop: '60px', flexWrap: 'wrap' }}>
            {[
              { label: t('stat_partnerships'), val: t('stat_active') },
              { label: t('stat_response'), val: t('stat_minimal') },
              { label: t('stat_accuracy'), val: t('stat_99') }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>{stat.val}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--brand-red)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
