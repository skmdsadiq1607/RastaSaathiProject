import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Heart, Bell, ChevronRight, Activity, MapPin, Smartphone, BookOpen } from 'lucide-react';

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
            <Link to="/guide" className="premium-button sos-pulse" style={{ padding: '20px 50px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BookOpen size={20} /> View Emergency Guide
            </Link>
            <Link to="/about" className="btn btn-outline" style={{ padding: '20px 50px', fontSize: '1.2rem', border: '1px solid rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none' }}>
              Our Vision
            </Link>
          </motion.div>
        </div>

        {/* Feature Showroom */}
        <div style={{ marginBottom: '140px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>The Core Infrastructure</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Built on a foundation of speed, intelligence, and reliability.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <FeatureCard 
              icon={<Zap color="#ef4444" size={32} />} 
              title="Instant SOS" 
              desc="A single tap triggers a chain reaction: your live location is captured, and alerts are dispatched via WhatsApp/SMS to all emergency contacts in under 1 second." 
            />
            <FeatureCard 
              icon={<Shield color="#3b82f6" size={32} />} 
              title="AI Medic Assistant" 
              desc="Get life-saving first-aid guidance instantly. Our AI models analyze the situation and provide step-by-step instructions while help is on the way." 
            />
            <FeatureCard 
              icon={<Bell color="#10b981" size={32} />} 
              title="Trauma Center Routing" 
              desc="We've mapped 370+ hospitals. The system automatically finds the nearest facility that is actually equipped for your specific medical needs." 
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="glass-panel" style={{ padding: '80px 40px', textAlign: 'center', marginBottom: '100px' }}>
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

const StatCard = ({ icon, title, label }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="glass-panel" 
    style={{ padding: '50px 40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '100px' }}
  >
    <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.03)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
      {icon}
    </div>
    <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>{title}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
  </motion.div>
);

export default Home;
