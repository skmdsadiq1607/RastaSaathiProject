import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Smartphone, Info, AlertTriangle, UserPlus, Users, Zap, MessageCircle, MapPin } from 'lucide-react';
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

        {/* Step-by-Step Usage */}
        <div style={{ marginBottom: '140px' }}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>
              {t('guide_usage_title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              From initial authentication to AI-powered rescue—here is exactly how RastaSaathi works for you.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {[
              { num: '01', title: t('guide_use_step1_title'), desc: t('guide_use_step1_desc'), color: '#3b82f6' },
              { num: '02', title: t('guide_use_step2_title'), desc: t('guide_use_step2_desc'), color: '#8b5cf6' },
              { num: '03', title: t('guide_use_step3_title'), desc: t('guide_use_step3_desc'), color: '#10b981' },
              { num: '04', title: t('guide_use_step4_title'), desc: t('guide_use_step4_desc'), color: '#ef4444' },
              { num: '05', title: t('guide_use_step5_title'), desc: t('guide_use_step5_desc'), color: '#f59e0b' },
              { num: '06', title: t('guide_use_step6_title'), desc: t('guide_use_step6_desc'), color: '#06b6d4' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel"
                style={{ 
                  padding: '50px', 
                  position: 'relative', 
                  borderTop: `4px solid ${step.color}`,
                  background: `linear-gradient(135deg, ${step.color}05 0%, transparent 100%)` 
                }}
              >
                <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '3rem', fontWeight: '900', color: `${step.color}20`, lineHeight: 1 }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '16px', fontWeight: '800' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WHATSAPP INTEGRATION */}
        <div className="glass-panel" style={{ padding: '60px', marginBottom: '100px', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <MessageCircle size={40} color="#10b981" />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>{t('whatsapp_title')}</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '40px' }}>
            {t('whatsapp_desc')}
          </p>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ padding: '20px 40px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>
              {t('whatsapp_number')}
            </div>
            <a 
              href={`https://wa.me/14155238886?text=Join%20do-hit`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="premium-button"
              style={{ textDecoration: 'none', background: '#10b981', padding: '15px 30px', borderRadius: '8px', fontWeight: '700' }}
            >
              Open WhatsApp
            </a>
          </div>
        </div>

        {/* Precision Orchestration Section */}
        <div style={{ marginBottom: '140px' }}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>
              {t('orch_title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              Our platform uses advanced AI-geospatial synchronization to orchestrate rescue operations with millisecond precision.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            <motion.div whileHover={{ y: -10 }} className="glass-panel" style={{ padding: '50px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)' }}>
              <div style={{ marginBottom: '24px', background: 'rgba(59, 130, 246, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={30} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '20px', fontWeight: '800' }}>{t('orch_feature1_title')}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{t('orch_feature1_desc')}</p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="glass-panel" style={{ padding: '50px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)' }}>
              <div style={{ marginBottom: '24px', background: 'rgba(239, 68, 68, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={30} color="#ef4444" />
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '20px', fontWeight: '800' }}>{t('orch_feature2_title')}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{t('orch_feature2_desc')}</p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="glass-panel" style={{ padding: '50px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)' }}>
              <div style={{ marginBottom: '24px', background: 'rgba(16, 185, 129, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={30} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '20px', fontWeight: '800' }}>{t('orch_feature3_title')}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{t('orch_feature3_desc')}</p>
            </motion.div>
          </div>
        </div>

        {/* Critical Warnings */}
        <div className="glass-panel" style={{ padding: '60px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <AlertTriangle size={40} color="#ef4444" />
            <h2 style={{ fontSize: '2rem', fontWeight: '900' }}>{t('guide_evac_title')}</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '30px' }}>
            {t('guide_evac_desc')}
          </p>
          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontWeight: '700' }}>
            ⚠️ CRITICAL: Always prioritize your own safety before attempting to rescue others.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Guide;
