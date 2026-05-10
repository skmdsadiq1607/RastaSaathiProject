import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Smartphone, MapPin, Bell, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Guide = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '24px' }}>
            {t('golden_minute_title')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('golden_minute_sub')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          <GuideSection 
            icon={<ShieldCheck size={32} color="#10b981" />}
            title={t('verified_protocols_title')}
            desc={t('verified_protocols_sub')}
          />
          <GuideSection 
            icon={<Activity size={32} color="#ef4444" />}
            title={t('immediate_action')}
            desc="Upon triggering the SOS, follow the visualized medical prompts on your dashboard immediately while help is in transit."
          />
        </div>

        {/* Detailed Grid */}
        <div className="glass-panel" style={{ padding: '60px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '40px', textAlign: 'center' }}>{t('first_aid_title')}</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            <ProtocolItem 
              title="Bleeding Control"
              steps={["Apply direct pressure", "Keep limb elevated", "Use clean dressing"]}
            />
            <ProtocolItem 
              title="Fracture Support"
              steps={["Do not move limb", "Apply cold compress", "Support with splint"]}
            />
            <ProtocolItem 
              title="Shock Management"
              steps={["Lay person flat", "Keep them warm", "Loosen tight clothing"]}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const GuideSection = ({ icon, title, desc }) => (
  <div className="glass-panel" style={{ padding: '40px' }}>
    <div style={{ marginBottom: '20px' }}>{icon}</div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{desc}</p>
  </div>
);

const ProtocolItem = ({ title, steps }) => (
  <div>
    <h4 style={{ color: '#ef4444', marginBottom: '15px', fontSize: '1.1rem', fontWeight: '700' }}>{title}</h4>
    <ul style={{ padding: 0, listStyle: 'none' }}>
      {steps.map((step, i) => (
        <li key={i} style={{ marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', gap: '8px' }}>
          <div style={{ color: '#ef4444' }}>•</div> {step}
        </li>
      ))}
    </ul>
  </div>
);

export default Guide;
