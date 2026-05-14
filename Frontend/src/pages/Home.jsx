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
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Background Ambient Glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1 }}></div>

      <div className="container" style={{ paddingBottom: '120px' }}>
        
        {/* HERO SECTION */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center', marginBottom: '180px', paddingTop: '60px' }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '40px' }}>
            <span style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '14px 32px', 
              background: 'rgba(239, 68, 68, 0.08)', borderRadius: '100px', border: '1px solid rgba(239, 68, 68, 0.2)', 
              color: '#ef4444', fontSize: '0.9rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase'
            }}>
              <Radio size={18} className="pulse-sos" /> {t('national_initiative')}
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', lineHeight: '0.95', marginBottom: '32px', letterSpacing: '-0.06em', fontWeight: 900 }}>
            {t('hero_title').split('.')[0]}<span style={{ color: '#ef4444' }}>.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '850px', margin: '0 auto 60px', lineHeight: '1.6', fontWeight: '500' }}>
            {t('hero_sub')}
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/guide" className="btn btn-primary hero-btn">
              <Zap size={28} /> {t('view_guide')}
            </Link>
            <Link to="/about" className="btn btn-glass hero-btn">
              {t('vision')}
            </Link>
          </motion.div>
        </motion.div>


        {/* CORE TECH SECTION */}
        <div className="section-spacing">
          <div className="responsive-grid-2" style={{ alignItems: 'center', gap: '100px' }}>
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '3px', marginBottom: '24px', fontSize: '0.9rem', textTransform: 'uppercase' }}>{t('precision_eng')}</div>
              <h2 style={{ fontSize: 'clamp(3rem, 7vw, 4rem)', lineHeight: '1.05', marginBottom: '32px', fontWeight: 900 }}>{t('impact_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: '1.8', marginBottom: '48px' }}>
                Our architecture combines high-frequency geospatial indexing with state-of-the-art AI triage to ensure zero-latency emergency response.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                <Metric value="99.9%" label="UPTIME GRID" />
                <Metric value="<2s" label="DISPATCH" />
                <Metric value="AI" label="TRIAGE" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel" 
              style={{ padding: '80px 60px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.07) 0%, rgba(2, 6, 23, 0.4) 100%)', borderRadius: '48px' }}
            >
              <h3 style={{ fontSize: '2.5rem', marginBottom: '48px', fontWeight: 900, letterSpacing: '-0.02em' }}>{t('results_title')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                <Capability icon={<ShieldCheck />} text={t('orch_feature3_title')} sub={t('orch_feature3_desc')} />
                <Capability icon={<ActivitySquare />} text={t('orch_feature2_title')} sub={t('orch_feature2_desc')} />
                <Capability icon={<MapPin />} text={t('orch_feature1_title')} sub={t('orch_feature1_desc')} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* THE JOURNEY */}
        <div style={{ marginTop: '240px' }}>
           <div style={{ textAlign: 'center', marginBottom: '120px' }}>
              <h2 style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', marginBottom: '24px', fontWeight: 900 }}>{t('journey_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto' }}>{t('journey_sub')}</p>
           </div>
           
           <div className="responsive-grid">
              <StepCard num="01" title={t('step1_title')} desc={t('step1_desc')} icon={<Zap />} color="#ef4444" />
              <StepCard num="02" title={t('step2_title')} desc={t('step2_desc')} icon={<Activity />} color="#3b82f6" />
              <StepCard num="03" title={t('step3_title')} desc={t('step3_desc')} icon={<CheckCircle />} color="#10b981" />
           </div>
        </div>

        {/* CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel cta-panel" 
          style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(2, 6, 23, 0.8) 100%)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
        >
          <div style={{ width: '100px', height: '100px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 48px' }}>
            <Users size={50} color="#ef4444" />
          </div>
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', marginBottom: '32px', lineHeight: '1.0', fontWeight: 900 }}>{t('join_national_mission')}</h2>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '850px', margin: '0 auto 60px', lineHeight: '1.6', fontWeight: 500 }}>
            RastaSaathi is scaling its emergency grid across major urban corridors. Join our mission to eliminate road fatalities through precision technology.
          </p>
          
          <Link to="/register" className="btn btn-primary cta-btn">
            {t('become_responder')} <ArrowRight size={32} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

const Metric = ({ value, label }) => (
  <div style={{ textAlign: 'left' }}>
    <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#ef4444', marginBottom: '8px', letterSpacing: '-1px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</div>
  </div>
);

const Capability = ({ icon, text, sub }) => (
  <div style={{ display: 'flex', gap: '28px', color: 'white' }}>
    <div style={{ 
      flexShrink: 0, width: '64px', height: '64px', background: 'rgba(239, 68, 68, 0.1)', 
      borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' 
    }}>
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <div>
      <div style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>{text}</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5' }}>{sub}</div>
    </div>
  </div>
);

const StepCard = ({ num, title, desc, icon, color }) => (
  <motion.div whileHover={{ y: -20 }} className="glass-panel" style={{ padding: '80px 50px', position: 'relative', overflow: 'hidden', borderRadius: '40px' }}>
    <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '10rem', fontWeight: '900', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>{num}</div>
    <div style={{ width: '84px', height: '84px', background: `${color}15`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, marginBottom: '48px' }}>
      {React.cloneElement(icon, { size: 44 })}
    </div>
    <h3 style={{ fontSize: '2.2rem', marginBottom: '24px', position: 'relative', zIndex: 1, fontWeight: 900 }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', lineHeight: '1.7', position: 'relative', zIndex: 1, fontWeight: 500 }}>{desc}</p>
  </motion.div>
);

export default Home;

