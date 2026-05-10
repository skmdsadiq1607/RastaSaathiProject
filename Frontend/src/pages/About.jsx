import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Globe, Shield, Users, Target, Rocket } from 'lucide-react';

const About = () => {
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
            {t('mission_title')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {t('mission_sub')}
          </p>
        </div>

        {/* The Journey Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', marginBottom: '100px', alignItems: 'center' }}>
          <div className="glass-panel" style={{ padding: '40px', borderLeft: '4px solid #ef4444' }}>
            <Rocket size={32} color="#ef4444" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{t('about_vision_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              {t('about_vision_desc')}
            </p>
          </div>
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Target size={24} color="#3b82f6" /> The Strategy
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
              By integrating AI directly into the dispatch workflow, we eliminate the 'human-in-the-loop' delay that often costs lives. Our strategy is focused on <strong>Zero-Latency response</strong>.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              We partner with local hospitals to create a real-time 'Medical Grid' where every second is accounted for and every resource is optimized.
            </p>
          </div>
        </div>

        {/* Technology Deep Dive */}
        <div className="glass-panel" style={{ padding: '60px', marginBottom: '80px', background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(239, 68, 68, 0.05) 100%)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Shield size={24} color="#ef4444" />
                <h3 style={{ fontSize: '1.4rem' }}>{t('about_tech_title')}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                {t('about_tech_desc')}
              </p>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Globe size={24} color="#3b82f6" />
                <h3 style={{ fontSize: '1.4rem' }}>{t('global_title')}</h3>
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
