import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Globe, Shield, Users, Target, Rocket, Award, Cpu, Heart, Database, Zap, Layers } from 'lucide-react';
import { Activity, Globe, Shield, Users, Target, Rocket, Award, Cpu, Heart, Database, Zap, Layers, Eye, CheckCircle } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingBottom: '80px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '0', left: '-10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.03) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '25vw', height: '25vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.02) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: -1 }}></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '40px' }}>
          <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '20px', textTransform: 'uppercase' }}>
            {t('origin_tech')}
          </div>
          <h1 style={{ marginBottom: '28px', fontWeight: '800' }}>
            {t('about_vision_title')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '750px', margin: '0 auto' }}>
            {t('about_vision_desc')}
          </p>
        </div>

        {/* Core Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '100px' }}>
          <motion.div 
            whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.02)' }} 
            style={{ padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s' }}
          >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'white' }}>{t('feature_ai_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {t('about_tech_desc')}
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.02)' }} 
            style={{ padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s' }}
          >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'white' }}>{t('feature_route_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {t('feature_route_desc')} {t('orch_feature1_desc')}
            </p>
          </motion.div>
        </div>

        {/* Detailed Story Section */}
        <div style={{ marginBottom: '100px' }}>
           <h2 style={{ fontSize: '2.2rem', marginBottom: '32px' }}>{t('response_gap_title')}</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                {t('response_gap_p1')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                 <AboutItem icon={<Layers size={20} color="#ef4444" />} title={t('verified_protocols')} desc={t('verified_protocols_desc')} />
                 <AboutItem icon={<Database size={20} color="#ef4444" />} title={t('data_security')} desc={t('data_security_desc')} />
                 <AboutItem icon={<Heart size={20} color="#ef4444" />} title={t('citizen_first')} desc={t('citizen_first_desc')} />
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

