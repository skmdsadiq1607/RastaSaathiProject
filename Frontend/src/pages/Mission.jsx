import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, Target, Eye, Heart } from 'lucide-react';

const Mission = () => {
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
            {t('mission_page_title')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
            {t('mission_page_sub')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', marginBottom: '100px' }}>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-panel" 
            style={{ padding: '50px', borderTop: '4px solid #ef4444' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <Eye size={32} color="#ef4444" />
              <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>{t('mission_v_title')}</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              {t('mission_v_desc')}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-panel" 
            style={{ padding: '50px', borderTop: '4px solid #3b82f6' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <Target size={32} color="#3b82f6" />
              <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>{t('mission_m_title')}</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              {t('mission_m_desc')}
            </p>
          </motion.div>
        </div>

        <div className="glass-panel" style={{ padding: '80px', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.05), transparent)' }}>
          <Heart size={48} color="#ef4444" style={{ marginBottom: '30px' }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '20px' }}>The Human Impact</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            Behind every line of code at RastaSaathi is a commitment to saving a life. We believe that in the age of AI, no person should die because an ambulance took too long or a hospital wasn't ready. 
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Mission;
