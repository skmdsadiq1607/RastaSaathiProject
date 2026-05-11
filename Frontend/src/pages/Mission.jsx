import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, Target, Eye, Heart, Shield, Award } from 'lucide-react';

const Mission = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '3px', fontSize: '0.9rem', marginBottom: '24px' }}
          >
            {t('mission_manifesto')}
          </motion.div>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1' }}>
            {t('mission_page_title')}
          </h1>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '850px', margin: '0 auto' }}>
            {t('mission_page_sub')}
          </p>
        </div>

        <div className="responsive-grid-2 section-spacing">
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-panel" 
            style={{ padding: '60px', borderTop: '6px solid #ef4444', background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '15px' }}>
                <Eye size={32} color="#ef4444" />
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '900' }}>{t('mission_v_title')}</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.9' }}>
              {t('mission_v_desc')}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-panel" 
            style={{ padding: '60px', borderTop: '6px solid #3b82f6', background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
              <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '15px' }}>
                <Target size={32} color="#3b82f6" />
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '900' }}>{t('mission_m_title')}</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.9' }}>
              {t('mission_m_desc')}
            </p>
          </motion.div>
        </div>

        <div className="glass-panel" style={{ padding: '80px', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.05), transparent)', borderRadius: '40px' }}>
          <Heart size={56} color="#ef4444" style={{ marginBottom: '32px' }} />
          <h2 style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '24px' }}>The Human Impact</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', maxWidth: '850px', margin: '0 auto', lineHeight: '1.8' }}>
            {t('impact_sub')} {t('hero_sub')}
          </p>
        </div>

        {/* Commitment Items */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginTop: '100px' }}>
           <CommitmentCard icon={<Shield color="#ef4444" />} title={t('zero_delay')} desc={t('zero_delay_desc')} />
           <CommitmentCard icon={<Rocket color="#3b82f6" />} title={t('scale')} desc={t('scale_desc')} />
           <CommitmentCard icon={<Award color="#10b981" />} title={t('excellence')} desc={t('excellence_desc')} />
        </div>
      </motion.div>
    </div>
  );
};

const CommitmentCard = ({ icon, title, desc }) => (
  <div style={{ textAlign: 'center' }}>
     <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>{icon}</div>
     <div style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '8px' }}>{title}</div>
     <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{desc}</div>
  </div>
);

export default Mission;
