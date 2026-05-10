import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Globe, Shield, Users } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '24px' }}>
            {t('mission_title')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {t('mission_sub')}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '60px', marginBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Activity size={24} color="#ef4444" />
                <h3 style={{ fontSize: '1.4rem' }}>{t('tech_title')}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                {t('tech_sub')}
              </p>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Globe size={24} color="#3b82f6" />
                <h3 style={{ fontSize: '1.4rem' }}>Scalable Vision</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                {t('global_sub')}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          <StatItem icon={<Activity size={24} />} label="Latency" value="<2s" />
          <StatItem icon={<Globe size={24} />} label="Uptime" value="99.9%" />
          <StatItem icon={<Shield size={24} />} label="AI Models" value="5+" />
          <StatItem icon={<Users size={24} />} label="Reach" value="Global" />
        </div>
      </motion.div>
    </div>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
    <div style={{ color: '#ef4444', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
      {icon}
    </div>
    <div style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '5px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
  </div>
);

export default About;
