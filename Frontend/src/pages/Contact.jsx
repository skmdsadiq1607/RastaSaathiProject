import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <Mail size={32} color="#ef4444" style={{ marginBottom: '20px' }} />
            <h3>Strategic Partnerships</h3>
            <p style={{ color: 'var(--text-secondary)' }}>partners@rastasaathi.in</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <Phone size={32} color="#3b82f6" style={{ marginBottom: '20px' }} />
            <h3>Government Liaison</h3>
            <p style={{ color: 'var(--text-secondary)' }}>+91 1800-RASTA-SOS</p>
          </div>

          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <Globe size={32} color="#10b981" style={{ marginBottom: '20px' }} />
            <h3>Headquarters</h3>
            <p style={{ color: 'var(--text-secondary)' }}>IIT Madras Research Park, Chennai</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
