import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Globe, Shield, Users, Target, Rocket, Award, Cpu, Heart } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1100px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '3px', fontSize: '0.9rem', marginBottom: '20px' }}
          >
            {t('origin_tech')}
          </motion.div>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', fontWeight: '900', marginBottom: '32px', lineHeight: '1.1' }}>
            {t('about_vision_title')}
          </h1>
          <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto' }}>
            {t('about_vision_desc')}
          </p>
        </div>

        {/* Core Pillars */}
        <div className="responsive-grid-2 section-spacing">
          <div className="glass-panel" style={{ padding: '50px', borderLeft: '6px solid #ef4444' }}>
            <Cpu size={40} color="#ef4444" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '800' }}>{t('feature_ai_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {t('about_tech_desc')}
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '50px', borderLeft: '6px solid #3b82f6' }}>
            <Globe size={40} color="#3b82f6" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '800' }}>{t('feature_route_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {t('feature_route_desc')} {t('orch_feature1_desc')}
            </p>
          </div>
        </div>

        {/* Detailed Story Section */}
        <div className="responsive-grid-2 section-spacing" style={{ alignItems: 'center' }}>
           <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '24px' }}>{t('response_gap_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '24px' }}>
                {t('response_gap_p1')}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8' }}>
                {t('response_gap_p2')}
              </p>
           </div>
           <div className="glass-panel" style={{ padding: '50px', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                 <AboutFeature icon={<Award color="#ef4444" />} title={t('verified_protocols')} desc={t('verified_protocols_desc')} />
                 <AboutFeature icon={<Shield color="#3b82f6" />} title={t('data_security')} desc={t('data_security_desc')} />
                 <AboutFeature icon={<Heart color="#10b981" />} title={t('citizen_first')} desc={t('citizen_first_desc')} />
              </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
          <StatItem icon={<Activity size={24} />} label={t('latency')} value="Optimized" />
          <StatItem icon={<Globe size={24} />} label={t('stats_hospitals')} value="Global Grid" />
          <StatItem icon={<Users size={24} />} label={t('stats_responders')} value="Verified" />
          <StatItem icon={<Shield size={24} />} label={t('project_stage')} value="Production" />
        </div>
      </motion.div>
    </div>
  );
};

const AboutFeature = ({ icon, title, desc }) => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
     <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>{icon}</div>
     <div>
        <div style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '4px' }}>{title}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{desc}</div>
     </div>
  </div>
);

const StatItem = ({ icon, label, value }) => (
  <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ color: '#ef4444', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
      {icon}
    </div>
    <div style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '5px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{label}</div>
  </div>
);

export default About;
