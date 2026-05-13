import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Smartphone, BookOpen, Activity, Globe, Heart, Zap, CheckCircle, Award, Star, Users, ArrowRight, Radio } from 'lucide-react';
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
    <div style={{ overflow: 'hidden' }}>
      <div className="container" style={{ paddingBottom: '120px' }}>
        
        {/* HERO SECTION */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center', marginBottom: '180px' }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '40px' }}>
            <span style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '14px 32px', 
              background: 'rgba(239, 68, 68, 0.08)', borderRadius: '100px', border: '1px solid rgba(239, 68, 68, 0.2)', 
              color: '#ef4444', fontSize: '0.9rem', fontWeight: '900', letterSpacing: '2px'
            }}>
              <Radio size={18} className="pulse-sos" /> {t('national_initiative')}
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', lineHeight: '1.0', marginBottom: '32px', letterSpacing: '-0.05em', fontWeight: 900 }}>
            {t('hero_title').split('.')[0]}<span style={{ color: '#ef4444' }}>.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 60px', lineHeight: '1.6', fontWeight: '500' }}>
            {t('hero_sub')}
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/guide" className="btn btn-primary hero-btn">
              <BookOpen size={28} /> {t('view_guide')}
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
              <div style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '2px', marginBottom: '24px', fontSize: '0.9rem' }}>{t('precision_eng')}</div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', lineHeight: '1.1', marginBottom: '32px' }}>{t('impact_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '48px' }}>
                {t('hero_sub')}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                <Metric value="LIVE" label="MEDICAL GRID" />
                <Metric value="AI" label="TRIAGE CORE" />
                <Metric value="0s" label="RESPONSE GAP" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel" 
              style={{ padding: '80px 60px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)' }}
            >
              <h3 style={{ fontSize: '2.2rem', marginBottom: '48px', fontWeight: 900 }}>{t('results_title')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <Capability icon={<Zap />} text={t('impact_feature1')} />
                <Capability icon={<Activity />} text={t('impact_feature2')} />
                <Capability icon={<Shield />} text={t('impact_feature3')} />
                <Capability icon={<MapPin />} text={t('dynamic_routing')} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* THE JOURNEY */}
        <div style={{ marginTop: '200px' }}>
           <div style={{ textAlign: 'center', marginBottom: '100px' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '24px' }}>{t('journey_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>{t('journey_sub')}</p>
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
          className="glass-panel pulse-sos cta-panel" 
        >
          <div style={{ width: '100px', height: '100px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 48px' }}>
            <Users size={50} color="#ef4444" />
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '32px', lineHeight: '1.1' }}>{t('join_national_mission')}</h2>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 60px', lineHeight: '1.7' }}>
            RastaSaathi is scaling across major urban corridors. Join our mission to eliminate road fatalities through technology and collective action.
          </p>
          
          <Link to="/register" className="btn btn-primary cta-btn">
            {t('become_responder')} <ArrowRight size={32} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

const MetricBox = ({ label, value }) => (
  <div style={{ padding: '20px 30px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>{label}</div>
    <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'white' }}>{value}</div>
  </div>
);

const FeedItem = ({ title, time, loc, severity, color }) => (
  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '900', color: color, textTransform: 'uppercase' }}>{title}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{time}</div>
     </div>
     <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{loc}</div>
     <div style={{ display: 'inline-block', padding: '4px 12px', background: `${color}15`, color: color, borderRadius: '8px', fontSize: '0.75rem', fontWeight: '900' }}>
        {severity} Triage
     </div>
  </div>
);

const Metric = ({ value, label }) => (
  <div style={{ textAlign: 'left' }}>
    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ef4444', marginBottom: '12px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</div>
  </div>
);

const Capability = ({ icon, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: 'rgba(255,255,255,0.95)' }}>
    <div style={{ color: '#ef4444' }}>{React.cloneElement(icon, { size: 30 })}</div>
    <span style={{ fontSize: '1.4rem', fontWeight: '700' }}>{text}</span>
  </div>
);

const StepCard = ({ num, title, desc, icon, color }) => (
  <motion.div whileHover={{ y: -20 }} className="glass-panel" style={{ padding: '80px 50px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '10rem', fontWeight: '900', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>{num}</div>
    <div style={{ width: '80px', height: '80px', background: `${color}15`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, marginBottom: '48px' }}>
      {React.cloneElement(icon, { size: 40 })}
    </div>
    <h3 style={{ fontSize: '2rem', marginBottom: '24px', position: 'relative', zIndex: 1 }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: '1.8', position: 'relative', zIndex: 1 }}>{desc}</p>
  </motion.div>
);

const FooterInfo = ({ label, value }) => (
  <div style={{ textAlign: 'center' }}>
     <div style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '900', marginBottom: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</div>
     <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>{value}</div>
  </div>
);

export default Home;
