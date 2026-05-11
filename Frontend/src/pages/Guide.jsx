import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Smartphone, Info, AlertTriangle, UserPlus, Users, Zap, MessageCircle, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
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
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ display: 'inline-flex', padding: '8px 20px', borderRadius: '100px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '24px' }}
          >
            {t('official_protocol')}
          </motion.div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1' }}>
            {t('golden_minute_title')}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '850px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('golden_minute_sub')}
          </p>
        </div>

        {/* STEP BY STEP JOURNEY - NEW VISUALS */}
        <div style={{ marginBottom: '120px' }}>
           <h2 style={{ fontSize: '2.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '60px' }}>{t('guide_usage_title')}</h2>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {[
                { id: '1', icon: <UserPlus />, title: t('guide_use_step1_title'), desc: t('guide_use_step1_desc'), color: '#3b82f6' },
                { id: '2', icon: <Smartphone />, title: t('guide_use_step2_title'), desc: t('guide_use_step2_desc'), color: '#8b5cf6' },
                { id: '3', icon: <MessageCircle />, title: t('guide_use_step3_title'), desc: t('guide_use_step3_desc'), color: '#10b981', isHighlight: true },
                { id: '4', icon: <Zap />, title: t('guide_use_step4_title'), desc: t('guide_use_step4_desc'), color: '#ef4444' },
                { id: '5', icon: <ShieldCheck />, title: t('guide_use_step5_title'), desc: t('guide_use_step5_desc'), color: '#f59e0b' },
                { id: '6', icon: <MapPin />, title: t('guide_use_step6_title'), desc: t('guide_use_step6_desc'), color: '#06b6d4' }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel"
                  style={{ 
                    padding: '32px', 
                    display: 'flex', 
                    gap: '24px', 
                    alignItems: 'flex-start',
                    borderLeft: `6px solid ${step.color}`,
                    background: step.isHighlight ? `linear-gradient(90deg, ${step.color}15 0%, transparent 100%)` : 'rgba(30, 41, 59, 0.5)',
                    boxShadow: step.isHighlight ? `0 10px 30px ${step.color}10` : 'none'
                  }}
                >
                   <div style={{ 
                     minWidth: '56px', 
                     height: '56px', 
                     borderRadius: '16px', 
                     background: `${step.color}20`, 
                     color: step.color, 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center' 
                   }}>
                      {React.cloneElement(step.icon, { size: 28 })}
                   </div>
                   <div>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontWeight: '800', color: step.isHighlight ? step.color : 'white' }}>{step.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.05rem' }}>{step.desc}</p>
                      {step.isHighlight && (
                        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                           <div style={{ padding: '10px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px dashed #10b981', color: '#10b981', fontWeight: '700', fontFamily: 'monospace' }}>
                              Join do-hit
                           </div>
                           <a 
                             href="https://wa.me/14155238886?text=Join%20do-hit" 
                             target="_blank" 
                             rel="noopener noreferrer"
                             style={{ color: '#10b981', textDecoration: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}
                           >
                             {t('connect_now')} <ArrowRight size={16} />
                           </a>
                        </div>
                      )}
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* FEATURE HIGHLIGHTS */}
        <div style={{ marginBottom: '120px' }}>
          <div className="responsive-grid-3">
             <HighlightCard 
                icon={<Activity size={32} color="#3b82f6" />}
                title={t('orch_feature1_title')}
                desc={t('orch_feature1_desc')}
             />
             <HighlightCard 
                icon={<Zap size={32} color="#ef4444" />}
                title={t('orch_feature2_title')}
                desc={t('orch_feature2_desc')}
             />
             <HighlightCard 
                icon={<ShieldCheck size={32} color="#10b981" />}
                title={t('orch_feature3_title')}
                desc={t('orch_feature3_desc')}
             />
          </div>
        </div>

        {/* CRITICAL SAFETY SECTION */}
        <div className="glass-panel" style={{ padding: '60px', border: '1px solid rgba(239, 68, 68, 0.4)', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)', borderRadius: '32px' }}>
           <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
              <AlertTriangle size={48} color="#ef4444" />
              <h2 style={{ fontSize: '2.2rem', fontWeight: '900' }}>{t('safety_first')}</h2>
           </div>
           <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '32px' }}>
             {t('safety_assist_text')}
           </p>
           <div className="responsive-grid-2" style={{ gap: '20px' }}>
              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ fontWeight: '800', color: '#ef4444', marginBottom: '12px', fontSize: '1.1rem' }}>{t('do_not')}</div>
                 <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{t('do_not_move')}</p>
              </div>
              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ fontWeight: '800', color: '#10b981', marginBottom: '12px', fontSize: '1.1rem' }}>{t('do')}</div>
                 <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{t('do_stay_line')}</p>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const HighlightCard = ({ icon, title, desc }) => (
  <motion.div whileHover={{ y: -10 }} className="glass-panel" style={{ padding: '40px' }}>
    <div style={{ marginBottom: '24px' }}>{icon}</div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontWeight: '800' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{desc}</p>
  </motion.div>
);

export default Guide;
