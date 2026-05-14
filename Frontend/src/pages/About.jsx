import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Globe, Shield, Users, Target, Rocket, Award, Cpu, Heart, Database, Zap, Layers } from 'lucide-react';

const About = () => {
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
            {t('origin_tech')}
          </div>
          <h1 style={{ marginBottom: '24px' }}>
            {t('about_vision_title')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
            {t('about_vision_desc')}
          </p>
        </div>

        {/* Core Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '80px' }}>
          <div style={{ paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>{t('feature_ai_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              {t('about_tech_desc')}
            </p>
          </div>
          <div style={{ paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>{t('feature_route_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              {t('feature_route_desc')} {t('orch_feature1_desc')}
            </p>
          </div>
        </div>

        {/* Detailed Story Section */}
        <div style={{ marginBottom: '80px' }}>
           <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>{t('response_gap_title')}</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {t('response_gap_p1')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                 <AboutItem icon={<Layers size={18} color="#ef4444" />} title={t('verified_protocols')} desc={t('verified_protocols_desc')} />
                 <AboutItem icon={<Database size={18} color="#ef4444" />} title={t('data_security')} desc={t('data_security_desc')} />
                 <AboutItem icon={<Heart size={18} color="#ef4444" />} title={t('citizen_first')} desc={t('citizen_first_desc')} />
              </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <StatMini label={t('latency')} value="Sub-Second" />
          <StatMini label={t('stats_hospitals')} value="Global Grid" />
          <StatMini label={t('stats_responders')} value="Verified" />
          <StatMini label={t('project_stage')} value="Beta 1.0" />
        </div>
      </motion.div>
    </div>
  );
};

const AboutItem = ({ icon, title, desc }) => (
  <div style={{ display: 'flex', gap: '16px' }}>
     <div style={{ marginTop: '4px' }}>{icon}</div>
     <div>
        <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '4px' }}>{title}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>{desc}</div>
     </div>
  </div>
);

const StatMini = ({ label, value }) => (
  <div style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
    <div style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
  </div>
);

export default About;

