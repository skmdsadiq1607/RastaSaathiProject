import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Smartphone, BookOpen, Activity, Globe, Heart, Zap, CheckCircle, Users, AlertTriangle, Search, MessageSquare, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../components/Logo';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Background Ambient Glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)', filter: 'blur(120px)', zIndex: -1 }}></div>

      <div className="container" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', marginBottom: '120px' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '100px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '1px', marginBottom: '30px', textTransform: 'uppercase' }}
          >
            <Activity size={16} /> 24/7 Intelligent Road Safety
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1.5px' }}
          >
            {t('hero_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '900px', margin: '0 auto 40px', lineHeight: '1.6' }}
          >
            {t('hero_sub')}
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}
          >
            <Link to="/about" className="premium-button" style={{ padding: '18px 36px', fontSize: '1.1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={20} /> {t('hero_btn1')}
            </Link>
            <Link to="/guide" className="btn btn-outline" style={{ padding: '18px 36px', fontSize: '1.1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
              <Heart size={20} color="#ef4444" /> {t('hero_btn2')}
            </Link>
          </motion.div>

          {/* Hero Highlights */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
            {[
              { icon: <Activity size={18} color="#ef4444" />, text: t('hero_highlight1') },
              { icon: <MapPin size={18} color="#3b82f6" />, text: t('hero_highlight2') },
              { icon: <Zap size={18} color="#f59e0b" />, text: t('hero_highlight3') },
              { icon: <AlertTriangle size={18} color="#10b981" />, text: t('hero_highlight4') },
              { icon: <Navigation size={18} color="#8b5cf6" />, text: t('hero_highlight5') },
              { icon: <Shield size={18} color="#06b6d4" />, text: t('hero_highlight6') }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}
              >
                {item.icon} {item.text}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div style={{ marginBottom: '140px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '2px', marginBottom: '15px' }}>THE ORIGIN</div>
              <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '30px' }}>{t('about_title')}</h2>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '20px', color: 'white', fontWeight: '600' }}>{t('about_content1')}</p>
                <p style={{ marginBottom: '20px' }}>{t('about_content2')}</p>
                <p>{t('about_content3')}</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '50px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
                {t('about_content4')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '25px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '16px', borderLeft: '4px solid #ef4444' }}>
                <Shield size={32} color="#ef4444" />
                <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'white' }}>{t('about_content5')}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* VISION & MISSION SECTION - COMBINED */}
        <div style={{ marginBottom: '140px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
              <div style={{ padding: '60px', background: 'rgba(239, 68, 68, 0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '2px', marginBottom: '20px' }}>OUR VISION</div>
                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '24px' }}>{t('vision_content')}</h3>
              </div>
              <div style={{ padding: '60px' }}>
                <div style={{ color: '#3b82f6', fontWeight: '800', letterSpacing: '2px', marginBottom: '20px' }}>OUR MISSION</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[t('mission_p1'), t('mission_p2'), t('mission_p3'), t('mission_p4'), t('mission_p5')].map((point, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '18px', fontSize: '1.1rem', fontWeight: '600' }}>
                      <CheckCircle size={20} color="#3b82f6" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FEATURES SECTION */}
        <div style={{ marginBottom: '140px' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900' }}>Platform Capabilities</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            <FeatureCard icon={<Zap size={32} color="#ef4444" />} title={t('feat_smart_title')} desc={t('feat_smart_desc')} />
            <FeatureCard icon={<Smartphone size={32} color="#3b82f6" />} title={t('feat_ai_title')} desc={t('feat_ai_desc')} />
            <FeatureCard icon={<MapPin size={32} color="#f59e0b" />} title={t('feat_loc_title')} desc={t('feat_loc_desc')} />
            <FeatureCard icon={<Activity size={32} color="#10b981" />} title={t('feat_med_title')} desc={t('feat_med_desc')} />
            <FeatureCard icon={<AlertTriangle size={32} color="#ef4444" />} title={t('feat_road_title')} desc={t('feat_road_desc')} />
            <FeatureCard icon={<Users size={32} color="#8b5cf6" />} title={t('feat_comm_title')} desc={t('feat_comm_desc')} />
          </div>
        </div>

        {/* HOW IT WORKS SECTION */}
        <div style={{ marginBottom: '140px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900' }}>{t('hiw_title')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <StepItem num="1" title={t('hiw_step1_title')} desc={t('hiw_step1_desc')} icon={<Search size={24} />} />
            <StepItem num="2" title={t('hiw_step2_title')} desc={t('hiw_step2_desc')} icon={<Zap size={24} />} />
            <StepItem num="3" title={t('hiw_step3_title')} desc={t('hiw_step3_desc')} icon={<Heart size={24} />} />
            <StepItem num="4" title={t('hiw_step4_title')} desc={t('hiw_step4_desc')} icon={<MessageSquare size={24} />} />
            <StepItem num="5" title={t('hiw_step5_title')} desc={t('hiw_step5_desc')} icon={<Navigation size={24} />} />
          </div>
        </div>

        {/* IMPACT SECTION */}
        <div className="glass-panel" style={{ padding: '80px', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.08), transparent)' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '60px' }}>{t('impact_title_new')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px' }}>
            <ImpactItem value={t('impact_stat1_val')} label={t('impact_stat1_lbl')} color="#ef4444" />
            <ImpactItem value={t('impact_stat2_val')} label={t('impact_stat2_lbl')} color="#3b82f6" />
            <ImpactItem value={t('impact_stat3_val')} label={t('impact_stat3_lbl')} color="#10b981" />
          </div>
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div whileHover={{ y: -10 }} className="glass-panel" style={{ padding: '40px' }}>
    <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.03)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', fontWeight: '800' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
  </motion.div>
);

const StepItem = ({ num, title, desc, icon }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '30px', textAlign: 'center', position: 'relative' }}>
    <div style={{ position: 'absolute', top: '10px', left: '15px', fontSize: '2.5rem', fontWeight: '900', color: 'rgba(239, 68, 68, 0.05)' }}>{num}</div>
    <div style={{ color: '#ef4444', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
    <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: '800' }}>{title}</h4>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{desc}</p>
  </motion.div>
);

const ImpactItem = ({ value, label, color }) => (
  <div>
    <div style={{ fontSize: '2.8rem', fontWeight: '900', color: color, marginBottom: '15px', lineHeight: 1.1 }}>{value}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '600', maxWidth: '250px', margin: '0 auto' }}>{label}</div>
  </div>
);

export default Home;
