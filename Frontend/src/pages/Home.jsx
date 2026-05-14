import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Smartphone, BookOpen, Activity, Globe, Heart, Zap, CheckCircle, Award, Star, Users, ArrowRight, Radio, ShieldCheck, ZapOff, ActivitySquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../components/Logo';

const Home = () => {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambient Glows */}
      <div style={{ position: 'absolute', top: '0', left: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: '25vw', height: '25vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1 }}></div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        
        {/* HERO SECTION */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center', marginBottom: '120px', paddingTop: '40px' }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
            <span style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 24px', 
              background: 'rgba(239, 68, 68, 0.05)', borderRadius: '100px', border: '1px solid rgba(239, 68, 68, 0.1)',
              color: '#ef4444', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase'
            }}>
              <Radio size={16} className="pulse-sos" /> {t('national_initiative')}
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ marginBottom: '28px', fontWeight: 800 }}>
            {t('hero_title').split('.')[0]}<span style={{ color: '#ef4444' }}>.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 48px', lineHeight: '1.6' }}>
            {t('hero_sub')}
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/guide" className="btn btn-primary">
               {t('view_guide')}
            </Link>
            <Link to="/about" className="btn btn-glass">
              {t('vision')}
            </Link>
          </motion.div>
        </motion.div>


        {/* CORE TECH SECTION */}
        <div className="section-spacing">
          <div className="responsive-grid-2" style={{ alignItems: 'center', gap: '80px' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '3px', marginBottom: '20px', fontSize: '0.8rem', textTransform: 'uppercase' }}>{t('precision_eng')}</div>
              <h2 style={{ marginBottom: '28px' }}>{t('impact_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '40px' }}>
                Our architecture combines high-frequency geospatial indexing with state-of-the-art AI triage to ensure zero-latency emergency response.
              </p>
              
              <div style={{ display: 'flex', gap: '50px' }}>
                <Metric value="99.9%" label="UPTIME" />
                <Metric value="<2s" label="DISPATCH" />
                <Metric value="AI" label="TRIAGE" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel"
              style={{ padding: '60px 50px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px' }}
            >
              <h3 style={{ fontSize: '1.8rem', marginBottom: '40px' }}>{t('results_title')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <Capability icon={<ShieldCheck size={24} />} text={t('orch_feature3_title')} sub={t('orch_feature3_desc')} />
                <Capability icon={<ActivitySquare size={24} />} text={t('orch_feature2_title')} sub={t('orch_feature2_desc')} />
                <Capability icon={<MapPin size={24} />} text={t('orch_feature1_title')} sub={t('orch_feature1_desc')} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* THE JOURNEY */}
        <div style={{ marginTop: '180px' }}>
           <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{ marginBottom: '20px' }}>{t('journey_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto' }}>{t('journey_sub')}</p>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              <StepItem num="01" title={t('step1_title')} desc={t('step1_desc')} />
              <StepItem num="02" title={t('step2_title')} desc={t('step2_desc')} />
              <StepItem num="03" title={t('step3_title')} desc={t('step3_desc')} />
           </div>
        </div>

        {/* CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            marginTop: '180px', padding: '100px 40px', textAlign: 'center', 
            background: 'linear-gradient(180deg, transparent, rgba(239, 68, 68, 0.02))',
            borderTop: '1px solid rgba(255,255,255,0.05)', borderRadius: '40px'
          }}
        >
          <h2 style={{ marginBottom: '28px' }}>{t('join_national_mission')}</h2>
          <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 48px', lineHeight: '1.6' }}>
            RastaSaathi is scaling its emergency grid across major urban corridors. Join our mission today.
          </p>
          
          <Link to="/register" className="btn btn-primary" style={{ padding: '18px 48px', fontSize: '1.1rem' }}>
            {t('become_responder')} <ArrowRight size={22} style={{ marginLeft: '10px' }} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

const Metric = ({ value, label }) => (
  <motion.div whileHover={{ y: -5 }}>
    <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ef4444', marginBottom: '6px', letterSpacing: '-1px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px' }}>{label}</div>
  </motion.div>
);

const Capability = ({ icon, text, sub }) => (
  <motion.div whileHover={{ x: 10 }} style={{ display: 'flex', gap: '24px' }}>
    <div style={{ 
      width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', 
      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', flexShrink: 0
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>{text}</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{sub}</div>
    </div>
  </motion.div>
);

const StepItem = ({ num, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-panel"
    style={{ padding: '40px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}
  >
    <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#ef4444', marginBottom: '24px' }}>PHASE {num}</div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>{desc}</p>
  </motion.div>
);

export default Home;

