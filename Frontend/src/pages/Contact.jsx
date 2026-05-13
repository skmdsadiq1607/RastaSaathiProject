import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Globe, MessageSquare } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '24px' }}>
            {t('global_title')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('global_sub')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <Mail size={32} color="#ef4444" style={{ marginBottom: '20px' }} />
            <h3>{t('strategic_partnerships')}</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>{t('contact_email')}</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <Phone size={32} color="#3b82f6" style={{ marginBottom: '20px' }} />
            <h3>{t('emergency_liaison')}</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>{t('contact_phone')}</p>
          </div>

          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <Globe size={32} color="#10b981" style={{ marginBottom: '20px' }} />
            <h3>{t('headquarters')}</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>{t('contact_address')}</p>
          </div>
        </div>

        {/* Reach out form placeholder / direct message */}
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)' }}>
          <MessageSquare size={40} color="#ef4444" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{t('direct_support')}</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 30px' }}>
            {t('direct_support_sub')}
          </p>
          <a href={`mailto:${t('contact_email')}`} className="premium-button" style={{ textDecoration: 'none', display: 'inline-block', padding: '15px 30px', background: '#ef4444', color: 'white', borderRadius: '8px', fontWeight: '700' }}>
            {t('contact_us_now')}
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
