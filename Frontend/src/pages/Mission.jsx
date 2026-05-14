import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, Target, Eye, Heart, Shield, Award, Zap, Compass, CheckCircle } from 'lucide-react';

const Mission = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '40px' }}>
          <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '2px', fontSize: '0.75rem', marginBottom: '16px', textTransform: 'uppercase' }}>
            {t('mission_manifesto')}
          </div>
          <h1 style={{ marginBottom: '24px' }}>
            {t('mission_page_title')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
            {t('mission_page_sub')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', marginBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <Eye size={20} color="#ef4444" />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{t('mission_v_title')}</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {t('mission_v_desc')}
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <Target size={20} color="#ef4444" />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{t('mission_m_title')}</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {t('mission_m_desc')}
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(239, 68, 68, 0.02)', borderRadius: '24px', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{t('human_impact')}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('impact_sub')}
          </p>
        </div>

        {/* Commitment Items */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
           <CommitItem icon={<Zap size={18} color="#ef4444" />} title={t('zero_delay')} desc={t('zero_delay_desc')} />
           <CommitItem icon={<Rocket size={18} color="#ef4444" />} title={t('scale')} desc={t('scale_desc')} />
           <CommitItem icon={<CheckCircle size={18} color="#ef4444" />} title={t('excellence')} desc={t('excellence_desc')} />
        </div>
      </motion.div>
    </div>
  );
};

const CommitItem = ({ icon, title, desc }) => (
  <div>
     <div style={{ marginBottom: '16px' }}>{icon}</div>
     <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '8px' }}>{title}</div>
     <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{desc}</div>
  </div>
);

export default Mission;

