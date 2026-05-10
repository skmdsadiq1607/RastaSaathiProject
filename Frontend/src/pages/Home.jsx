import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Heart, Bell, ChevronRight, Activity, MapPin, Smartphone, BookOpen } from 'lucide-react';
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
            <Logo size={16} />
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

        {/* The Rescue Journey Section */}
        <div style={{ marginBottom: '140px' }}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>
              3 Steps to <span style={{ color: '#ef4444' }}>Safety</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              A precision-engineered orchestration of technology and medical expertise.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {[
              { num: '01', title: 'Trigger SOS', desc: 'Tap the emergency button to start the protocol. We capture precise GPS coordinates and network triage data.' },
              { num: '02', title: 'AI Assessment', desc: 'Our medical engine identifies injury severity and hospital needs using real-time inputs.' },
              { num: '03', title: 'Rescue Commences', desc: 'The nearest hospital is alerted, emergency contacts are notified via WhatsApp, and navigation starts instantly.' }
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

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '140px' }}>
          <FeatureCard 
            icon={<Logo size={32} />}
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

        {/* How It Works */}
        <div className="glass-panel" style={{ padding: '80px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '60px' }}>3 Steps to Safety</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(239, 68, 68, 0.2)', marginBottom: '-30px' }}>01</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Trigger SOS</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Tap the emergency button to start the protocol.</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(59, 130, 246, 0.2)', marginBottom: '-30px' }}>02</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>AI Assessment</h3>
              <p style={{ color: 'var(--text-secondary)' }}>AI identifies injury severity and hospital needs.</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(16, 185, 129, 0.2)', marginBottom: '-30px' }}>03</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Rescue Commences</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Contacts alerted and navigation starts instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
