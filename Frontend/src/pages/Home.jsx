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
      <div style={{ position: 'absolute', top: '0', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: -1, pointerEvents: 'none' }}></div>

      <div className="container" style={{ paddingBottom: '60px' }}>
        
        {/* HERO SECTION */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            textAlign: 'center', 
            minHeight: '75vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '40px 0 60px'
          }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '20px' }}>
            <span style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', 
              background: 'rgba(239, 68, 68, 0.05)', borderRadius: '100px', border: '1px solid rgba(239, 68, 68, 0.1)',
              color: '#ef4444', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase'
            }}>
              <Radio size={14} className="pulse-sos" /> {t('national_initiative')}
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ marginBottom: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t('hero_title').split(/(RastaSaathi)/g).map((part, i) => 
              part === 'RastaSaathi' ? <span key={i}>Rasta<span style={{ color: '#ef4444' }}>Saathi</span></span> : part
            )}
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            {t('hero_sub')}
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '420px' }}>
            <Link to="/guide" className="btn btn-primary" style={{ flex: 1, minWidth: '140px' }}>
               {t('view_guide')}
            </Link>
            <Link to="/about" className="btn btn-glass" style={{ flex: 1, minWidth: '140px' }}>
              {t('vision')}
            </Link>
          </motion.div>
        </motion.div>


        {/* CORE TECH SECTION */}
        <div className="section-spacing">
          <div className="responsive-grid-2" style={{ alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '3px', marginBottom: '16px', fontSize: '0.75rem', textTransform: 'uppercase' }}>{t('precision_eng')}</div>
              <h2 style={{ marginBottom: '20px' }}>{t('impact_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: '1.8', marginBottom: '32px' }}>
                {t('impact_sub')}
              </p>
              
              <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
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
              style={{ padding: 'clamp(24px, 5vw, 50px)', borderRadius: '28px' }}
            >
              <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', marginBottom: '28px', color: 'var(--text-primary)' }}>{t('results_title')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Capability icon={<ShieldCheck size={22} />} text={t('orch_feature3_title')} sub={t('orch_feature3_desc')} />
                <Capability icon={<ActivitySquare size={22} />} text={t('orch_feature2_title')} sub={t('orch_feature2_desc')} />
                <Capability icon={<MapPin size={22} />} text={t('orch_feature1_title')} sub={t('orch_feature1_desc')} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* THE JOURNEY */}
        <div className="section-spacing" style={{ marginTop: '80px' }}>
           <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ marginBottom: '16px' }}>{t('journey_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', maxWidth: '600px', margin: '0 auto' }}>{t('journey_sub')}</p>
           </div>
           
           <div className="responsive-grid">
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
            marginTop: '80px', padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)', textAlign: 'center', 
            background: 'linear-gradient(180deg, transparent, var(--brand-red-glow))',
            borderTop: '1px solid var(--border-glass)', borderRadius: '28px'
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>{t('join_national_mission')}</h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 36px', lineHeight: '1.6' }}>
            {t('home_mission_sub')}
          </p>
          
          <Link to="/register" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1rem' }}>
            {t('become_responder')} <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

const Metric = ({ value, label }) => (
  <motion.div whileHover={{ y: -5 }}>
    <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', color: '#ef4444', marginBottom: '4px', letterSpacing: '-1px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '2px' }}>{label}</div>
  </motion.div>
);

const Capability = ({ icon, text, sub }) => (
  <motion.div whileHover={{ x: 6 }} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
    <div style={{ 
      width: '44px', height: '44px', minWidth: '44px', background: 'var(--brand-red-glow)', 
      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444'
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>{text}</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{sub}</div>
    </div>
  </motion.div>
);

const StepItem = ({ num, title, desc }) => (
  <motion.div 
    whileHover={{ y: -6 }}
    className="glass-panel"
    style={{ padding: 'clamp(24px, 4vw, 36px)', borderRadius: '20px' }}
  >
    <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#ef4444', marginBottom: '16px' }}>PHASE {num}</div>
    <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', marginBottom: '12px', color: 'var(--text-primary)' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{desc}</p>
  </motion.div>
);

export default Home;
