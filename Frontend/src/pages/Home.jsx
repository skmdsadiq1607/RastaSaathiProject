import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Heart, Bell, ChevronRight, Activity, MapPin, Smartphone } from 'lucide-react';

const Home = () => {
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
            <Activity size={16} color="#ef4444" />
            <span style={{ letterSpacing: '1px', fontWeight: '600' }}>PRECISION EMERGENCY RESPONSE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', fontWeight: '900', lineHeight: '0.95', marginBottom: '32px', letterSpacing: '-2px' }}
          >
            Seconds Save <br />
            <span className="text-gradient-red" style={{ filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.3))' }}>Lives.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 50px', lineHeight: '1.5' }}
          >
            RastaSaathi orchestrates AI, geospatial data, and real-time alerts to bridge the gap between accident and life-saving care.
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/dashboard" className="premium-button sos-pulse" style={{ padding: '20px 50px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Launch SOS Demo <ChevronRight size={20} />
            </Link>
            <Link to="/about" className="btn btn-outline" style={{ padding: '20px 50px', fontSize: '1.2rem', border: '1px solid rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none' }}>
              Our Vision
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid with Hover Effects */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', position: 'relative' }}>
          <StatCard icon={<Zap color="#ef4444" />} title="0.8s Latency" label="Alert Dispatch" />
          <StatCard icon={<MapPin color="#3b82f6" />} title="370+" label="Hospitals Mapped" />
          <StatCard icon={<Smartphone color="#10b981" />} title="Dual-Channel" label="WhatsApp & SMS" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, label }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="glass-panel" 
    style={{ padding: '50px 40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}
  >
    <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.03)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
      {icon}
    </div>
    <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>{title}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
  </motion.div>
);

export default Home;
