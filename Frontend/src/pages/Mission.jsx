import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, Target, Eye, Heart, Shield, Award, Zap, Compass, CheckCircle } from 'lucide-react';

const Mission = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingBottom: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1100px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '120px' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '4px', fontSize: '0.85rem', marginBottom: '24px', textTransform: 'uppercase' }}
          >
            {t('mission_manifesto')}
          </motion.div>
          <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 5rem)', fontWeight: '900', marginBottom: '32px', lineHeight: '1.0', letterSpacing: '-0.04em' }}>
            {t('mission_page_title')}
          </h1>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto', fontWeight: 500 }}>
            {t('mission_page_sub')}
          </p>
        </div>

        <div className="responsive-grid-2 section-spacing">
          <motion.div 
            whileHover={{ y: -15 }}
            className="glass-panel" 
            style={{ padding: '64px', borderTop: '8px solid #ef4444', background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, transparent 100%)', borderRadius: '48px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', color: '#ef4444' }}>
                <Eye size={40} />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em' }}>{t('mission_v_title')}</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: '1.8', fontWeight: 500 }}>
              {t('mission_v_desc')}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -15 }}
            className="glass-panel" 
            style={{ padding: '64px', borderTop: '8px solid #3b82f6', background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.08) 0%, transparent 100%)', borderRadius: '48px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', color: '#3b82f6' }}>
                <Target size={40} />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em' }}>{t('mission_m_title')}</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: '1.8', fontWeight: 500 }}>
              {t('mission_m_desc')}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel" 
          style={{ padding: '100px 80px', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.1), transparent)', borderRadius: '60px' }}
        >
          <Heart size={64} color="#ef4444" style={{ marginBottom: '40px' }} />
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '32px', letterSpacing: '-0.03em' }}>{t('human_impact')}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.4rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.7', fontWeight: 500 }}>
            {t('impact_sub')}
          </p>
        </motion.div>

        {/* Commitment Items */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', marginTop: '120px' }}>
           <CommitmentCard icon={<Zap color="#ef4444" />} title={t('zero_delay')} desc={t('zero_delay_desc')} />
           <CommitmentCard icon={<Rocket color="#3b82f6" />} title={t('scale')} desc={t('scale_desc')} />
           <CommitmentCard icon={<CheckCircle color="#10b981" />} title={t('excellence')} desc={t('excellence_desc')} />
        </div>
      </motion.div>
    </div>
  );
};

const CommitmentCard = ({ icon, title, desc }) => (
  <div className="glass-panel" style={{ padding: '50px 40px', textAlign: 'center', borderRadius: '32px' }}>
     <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {React.cloneElement(icon, { size: 32 })}
        </div>
     </div>
     <div style={{ fontWeight: '900', fontSize: '1.4rem', marginBottom: '12px', letterSpacing: '-0.01em' }}>{title}</div>
     <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500, lineHeight: '1.5' }}>{desc}</div>
  </div>
);

export default Mission;

