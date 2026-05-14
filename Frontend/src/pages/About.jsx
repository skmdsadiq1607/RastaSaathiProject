import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Globe, Shield, Users, Target, Rocket, Award, Cpu, Heart, Database, Zap, Layers } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingBottom: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '120px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '4px', fontSize: '0.85rem', marginBottom: '24px', textTransform: 'uppercase' }}
          >
            {t('origin_tech')}
          </motion.div>
          <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 5rem)', fontWeight: '900', marginBottom: '32px', lineHeight: '1.0', letterSpacing: '-0.04em' }}>
            {t('about_vision_title')}
          </h1>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto', fontWeight: 500 }}>
            {t('about_vision_desc')}
          </p>
        </div>

        {/* Core Pillars */}
        <div className="responsive-grid-2 section-spacing">
          <div className="glass-panel" style={{ padding: '60px', borderLeft: '8px solid #ef4444', borderRadius: '40px' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
              <Cpu size={40} color="#ef4444" />
            </div>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '24px', fontWeight: '900', letterSpacing: '-0.02em' }}>{t('feature_ai_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.2rem', fontWeight: 500 }}>
              {t('about_tech_desc')}
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '60px', borderLeft: '8px solid #3b82f6', borderRadius: '40px' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
              <Globe size={40} color="#3b82f6" />
            </div>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '24px', fontWeight: '900', letterSpacing: '-0.02em' }}>{t('feature_route_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.2rem', fontWeight: 500 }}>
              {t('feature_route_desc')} {t('orch_feature1_desc')}
            </p>
          </div>
        </div>

        {/* Detailed Story Section */}
        <div className="responsive-grid-2 section-spacing" style={{ alignItems: 'center', gap: '80px' }}>
           <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '32px', letterSpacing: '-0.03em' }}>{t('response_gap_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: '1.8', marginBottom: '28px', fontWeight: 500 }}>
                {t('response_gap_p1')}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: '1.8', fontWeight: 500 }}>
                {t('response_gap_p2')}
              </p>
           </motion.div>
           <div className="glass-panel" style={{ padding: '60px', background: 'rgba(255,255,255,0.02)', borderRadius: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                 <AboutFeature icon={<Layers color="#ef4444" />} title={t('verified_protocols')} desc={t('verified_protocols_desc')} />
                 <AboutFeature icon={<Database color="#3b82f6" />} title={t('data_security')} desc={t('data_security_desc')} />
                 <AboutFeature icon={<Heart color="#10b981" />} title={t('citizen_first')} desc={t('citizen_first_desc')} />
              </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '120px' }}>
          <StatItem icon={<Zap size={28} />} label={t('latency')} value="Sub-Second" />
          <StatItem icon={<Globe size={28} />} label={t('stats_hospitals')} value="Global Grid" />
          <StatItem icon={<Users size={28} />} label={t('stats_responders')} value="Verified" />
          <StatItem icon={<Shield size={28} />} label={t('project_stage')} value="Beta 1.0" />
        </div>
      </motion.div>
    </div>
  );
};

const AboutFeature = ({ icon, title, desc }) => (
  <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
     <div style={{ width: '56px', height: '56px', flexShrink: 0, background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       {React.cloneElement(icon, { size: 28 })}
     </div>
     <div>
        <div style={{ fontWeight: '900', fontSize: '1.3rem', marginBottom: '8px', letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5', fontWeight: 500 }}>{desc}</div>
     </div>
  </div>
);

const StatItem = ({ icon, label, value }) => (
  <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px' }}>
    <div style={{ color: '#ef4444', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
      {icon}
    </div>
    <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '8px', letterSpacing: '-1px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</div>
  </div>
);

export default About;

