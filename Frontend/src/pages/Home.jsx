import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Smartphone, BookOpen, Activity, Globe, Heart, Zap, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../components/Logo';

const Home = () => {
  const { t } = useLanguage();
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Background Ambient Glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: -1 }}></div>

      <div className="container" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '140px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '40px' }}
          >
            <Logo size={18} />
            <span style={{ letterSpacing: '1px', fontWeight: '600' }}>PRECISION EMERGENCY RESPONSE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(3.5rem, 10vw, 5.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '32px', letterSpacing: '-2px' }}
          >
            {t('hero_title').replace('.', '')}
            <span style={{ color: '#ef4444' }}>.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 50px', lineHeight: '1.5' }}
          >
            {t('hero_sub')}
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.div whileHover={{ scale: 1.05, translateY: -5 }} whileTap={{ scale: 0.95 }}>
              <Link to="/guide" className="premium-button sos-pulse" style={{ 
                padding: '20px 40px', 
                fontSize: '1.2rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
                color: 'white',
                borderRadius: '12px',
                fontWeight: '700',
                boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)',
                transition: 'box-shadow 0.3s ease'
              }}>
                <BookOpen size={20} /> {t('view_guide')}
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, translateY: -5 }} whileTap={{ scale: 0.95 }}>
              <Link to="/about" className="btn btn-outline" style={{ 
                padding: '20px 40px', 
                fontSize: '1.2rem', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: 'white', 
                textDecoration: 'none',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}>
                {t('vision')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Impact Section - DRAMATICALLY IMPROVED */}
        <div style={{ marginBottom: '160px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div
               initial={{ x: -50, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: true }}
            >
              <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '2px', marginBottom: '15px' }}>EMPOWERMENT</div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '25px', lineHeight: '1.1' }}>{t('impact_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '40px' }}>
                {t('impact_sub')}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <ImpactMetric value="85%" label="FASTER RESPONSE" />
                <ImpactMetric value="10k+" label="LIVES IMPACTED" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-panel" 
              style={{ padding: '50px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', fontWeight: '800' }}>Core Capabilities</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <CapabilityItem icon={<Zap size={18} />} text={t('impact_feature1')} />
                <CapabilityItem icon={<Activity size={18} />} text={t('impact_feature2')} />
                <CapabilityItem icon={<Shield size={18} />} text={t('impact_feature3')} />
                <CapabilityItem icon={<MapPin size={18} />} text="Geospatial Precision" />
              </ul>
            </motion.div>
          </div>
        </div>

        {/* The Rescue Journey Section */}
        <div style={{ marginBottom: '140px' }}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>
              {t('journey_title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              {t('journey_sub')}
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {[
              { num: '01', title: t('step1_title'), desc: t('step1_desc') },
              { num: '02', title: t('step2_title'), desc: t('step2_desc') },
              { num: '03', title: t('step3_title'), desc: t('step3_desc') }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass-panel"
                style={{ padding: '50px', position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '4rem', fontWeight: '900', color: 'rgba(239, 68, 68, 0.05)', lineHeight: 1 }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', position: 'relative', zIndex: 1 }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', position: 'relative', zIndex: 1 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ecosystem Section */}
        <div className="glass-panel" style={{ padding: '80px', marginBottom: '140px', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05), transparent)' }}>
          <Globe size={48} color="#3b82f6" style={{ marginBottom: '30px' }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '20px' }}>{t('eco_title')}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            {t('eco_sub')}
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '140px' }}>
          <FeatureCard 
            icon={<Shield size={32} color="#ef4444" />}
            title={t('feature_ai_title')}
            desc={t('feature_ai_desc')}
          />
          <FeatureCard 
            icon={<MapPin size={32} color="#3b82f6" />}
            title={t('feature_route_title')}
            desc={t('feature_route_desc')}
          />
          <FeatureCard 
            icon={<Smartphone size={32} color="#10b981" />}
            title={t('feature_alert_title')}
            desc={t('feature_alert_desc')}
          />
        </div>

        {/* JOIN THE MISSION SECTION - RESTORED */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-panel" 
          style={{ 
            padding: '80px', 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(2, 6, 23, 0.8) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '24px'
          }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>Join the Mission</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.7' }}>
            RastaSaathi is more than a platform—it's a community of responders. Join us in making the roads safer for everyone.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="premium-button" style={{ 
                padding: '15px 40px', 
                textDecoration: 'none', 
                background: '#ef4444', 
                color: 'white', 
                borderRadius: '8px', 
                fontWeight: '700',
                fontSize: '1.1rem'
              }}>
                Become a Responder
              </Link>
            </motion.div>
          </div>

          <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
             <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '800', marginBottom: '5px' }}>EMAIL US</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>rastasaathi@gmail.com</div>
             </div>
             <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '800', marginBottom: '5px' }}>CALL US</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>+91 9441921812</div>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

const ImpactMetric = ({ value, label }) => (
  <div>
    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ef4444', marginBottom: '5px' }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px' }}>{label}</div>
  </div>
);

const CapabilityItem = ({ icon, text }) => (
  <li style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', color: 'rgba(255,255,255,0.8)' }}>
    <div style={{ color: '#ef4444' }}>{icon}</div>
    <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{text}</span>
  </li>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-panel" 
    style={{ padding: '40px', textAlign: 'left' }}
  >
    <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.03)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
  </motion.div>
);

export default Home;
