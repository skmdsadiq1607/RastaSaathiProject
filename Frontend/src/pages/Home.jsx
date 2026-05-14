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
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div style={{ position: 'relative' }}>
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
              display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', 
              background: 'rgba(239, 68, 68, 0.05)', borderRadius: '100px', 
              color: '#ef4444', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase'
            }}>
              <Radio size={14} className="pulse-sos" /> {t('national_initiative')}
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ marginBottom: '24px', fontWeight: 800 }}>
            {t('hero_title').split('.')[0]}<span style={{ color: '#ef4444' }}>.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            {t('hero_sub')}
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
          <div className="responsive-grid-2" style={{ alignItems: 'center', gap: '60px' }}>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '2px', marginBottom: '16px', fontSize: '0.75rem', textTransform: 'uppercase' }}>{t('precision_eng')}</div>
              <h2 style={{ marginBottom: '24px' }}>{t('impact_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '32px' }}>
                Our architecture combines high-frequency geospatial indexing with state-of-the-art AI triage to ensure zero-latency emergency response.
              </p>
              
              <div style={{ display: 'flex', gap: '40px' }}>
                <Metric value="99.9%" label="UPTIME" />
                <Metric value="<2s" label="DISPATCH" />
                <Metric value="AI" label="TRIAGE" />
              </div>
            </motion.div>

            <div style={{ padding: '40px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>{t('results_title')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Capability icon={<ShieldCheck size={20} />} text={t('orch_feature3_title')} sub={t('orch_feature3_desc')} />
                <Capability icon={<ActivitySquare size={20} />} text={t('orch_feature2_title')} sub={t('orch_feature2_desc')} />
                <Capability icon={<MapPin size={20} />} text={t('orch_feature1_title')} sub={t('orch_feature1_desc')} />
              </div>
            </div>
          </div>
        </div>

        {/* THE JOURNEY */}
        <div style={{ marginTop: '160px' }}>
           <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ marginBottom: '16px' }}>{t('journey_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>{t('journey_sub')}</p>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <StepItem num="01" title={t('step1_title')} desc={t('step1_desc')} />
              <StepItem num="02" title={t('step2_title')} desc={t('step2_desc')} />
              <StepItem num="03" title={t('step3_title')} desc={t('step3_desc')} />
           </div>
        </div>

        {/* CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '160px', padding: '80px 40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <h2 style={{ marginBottom: '24px' }}>{t('join_national_mission')}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            RastaSaathi is scaling its emergency grid across major urban corridors.
          </p>
          
          <Link to="/register" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
            {t('become_responder')} <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

const Metric = ({ value, label }) => (
  <div>
    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ef4444', marginBottom: '4px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px' }}>{label}</div>
  </div>
);

const Capability = ({ icon, text, sub }) => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <div style={{ color: '#ef4444', marginTop: '4px' }}>{icon}</div>
    <div>
      <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>{text}</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{sub}</div>
    </div>
  </div>
);

const StepItem = ({ num, title, desc }) => (
  <div style={{ padding: '32px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ef4444', marginBottom: '16px' }}>STEP {num}</div>
    <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{desc}</p>
  </div>
);

export default Home;

