import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, Target, Eye, Heart, Shield, Award, Zap, Compass, CheckCircle } from 'lucide-react';

const Mission = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingBottom: '80px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '25vw', height: '25vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.02) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: -1 }}></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '40px' }}>
          <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '20px', textTransform: 'uppercase' }}>
            {t('mission_manifesto')}
          </div>
          <h1 style={{ marginBottom: '28px', fontWeight: '800' }}>
            {t('mission_page_title')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '750px', margin: '0 auto' }}>
            {t('mission_page_sub')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', marginBottom: '100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px', paddingBottom: '60px', borderBottom: '1px solid var(--border-glass)' }}>
            <motion.div whileHover={{ y: -5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '10px', background: 'var(--brand-red-glow)', borderRadius: '12px' }}>
                  <Eye size={22} color="#ef4444" />
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)' }}>{t('mission_v_title')}</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                {t('mission_v_desc')}
              </p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px' }}>
                  <Target size={22} color="#3b82f6" />
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)' }}>{t('mission_m_title')}</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                {t('mission_m_desc')}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel"
          style={{ textAlign: 'center', padding: '80px 40px', borderRadius: '32px', marginBottom: '100px' }}
        >
          <Heart size={48} color="#ef4444" style={{ marginBottom: '32px' }} />
          <h2 style={{ fontSize: '2.2rem', marginBottom: '24px' }}>{t('human_impact')}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
            {t('impact_sub')}
          </p>
        </motion.div>

        {/* Commitment Items */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
           <CommitItem icon={<Zap size={20} color="#ef4444" />} title={t('zero_delay')} desc={t('zero_delay_desc')} />
           <CommitItem icon={<Rocket size={20} color="#3b82f6" />} title={t('scale')} desc={t('scale_desc')} />
           <CommitItem icon={<CheckCircle size={20} color="#10b981" />} title={t('excellence')} desc={t('excellence_desc')} />
        </div>
      </motion.div>
    </div>
  );
};

const CommitItem = ({ icon, title, desc }) => (
  <div>
     <div style={{ marginBottom: '16px' }}>{icon}</div>
     <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{title}</div>
     <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{desc}</div>
  </div>
);

export default Mission;

