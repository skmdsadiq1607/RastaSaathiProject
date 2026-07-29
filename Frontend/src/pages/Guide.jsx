import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Smartphone, Info, AlertTriangle, UserPlus, Users, Zap, MessageCircle, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import whatsappQr from '../assets/whatsapp-qr.png';

const Guide = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ paddingBottom: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ display: 'inline-flex', padding: '8px 20px', borderRadius: '100px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '20px' }}
          >
            {t('official_protocol')}
          </motion.div>
          <h1 style={{ fontWeight: '900', marginBottom: '20px', lineHeight: '1.1' }}>
            {t('golden_minute_title')}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
            {t('golden_minute_sub')}
          </p>
        </div>

        {/* STEP BY STEP JOURNEY */}
        <div style={{ marginBottom: 'clamp(60px, 8vw, 120px)' }}>
           <h2 style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 56px)' }}>{t('guide_usage_title')}</h2>
           
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
                    padding: 'clamp(18px, 4vw, 32px)', 
                    display: 'flex', 
                    gap: '20px', 
                    alignItems: 'flex-start',
                    borderLeft: `5px solid ${step.color}`,
                    background: step.isHighlight ? `linear-gradient(90deg, ${step.color}15 0%, transparent 100%)` : undefined,
                    boxShadow: step.isHighlight ? `0 10px 30px ${step.color}10` : 'none'
                  }}
                >
                   <div style={{ 
                     minWidth: '48px', 
                     height: '48px', 
                     borderRadius: '14px', 
                     background: `${step.color}20`, 
                     color: step.color, 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center',
                     flexShrink: 0
                   }}>
                      {React.cloneElement(step.icon, { size: 24 })}
                   </div>
                   <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', marginBottom: '8px', fontWeight: '800', color: step.isHighlight ? step.color : 'var(--text-primary)' }}>{step.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{step.desc}</p>
                      {step.isHighlight && (
                        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                             <div style={{ padding: '10px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px dashed #10b981', color: '#10b981', fontWeight: '700', fontFamily: 'monospace' }}>
                                {t('twilio_command')}
                             </div>
                             <a 
                               href="https://wa.me/14155238886?text=Join%20soft-peace" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               style={{ color: '#10b981', textDecoration: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}
                             >
                               {t('connect_now')} <ArrowRight size={16} />
                             </a>
                          </div>
                          
                          {/* QR Code Scan Integration */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(0, 0, 0, 0.25)', padding: '20px', borderRadius: '16px', border: '1.5px solid var(--border-glass)', maxWidth: '440px' }}>
                            <img 
                              src={whatsappQr} 
                              alt="WhatsApp Sandbox Registration QR Code" 
                              style={{ width: '90px', height: '90px', borderRadius: '8px', border: '2px solid white', background: 'white', flexShrink: 0 }} 
                            />
                            <div>
                              <div style={{ fontWeight: '800', color: 'white', marginBottom: '6px', fontSize: '1rem' }}>Scan to Instantly Link</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                                Scan this QR code with your phone camera to prefill the registration code in WhatsApp and activate your safety alerts immediately.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* FEATURE HIGHLIGHTS */}
        <div style={{ marginBottom: 'clamp(48px, 8vw, 100px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
             <HighlightCard 
                icon={<Activity size={28} color="#3b82f6" />}
                title={t('orch_feature1_title')}
                desc={t('orch_feature1_desc')}
             />
             <HighlightCard 
                icon={<Zap size={28} color="#ef4444" />}
                title={t('orch_feature2_title')}
                desc={t('orch_feature2_desc')}
             />
             <HighlightCard 
                icon={<ShieldCheck size={28} color="#10b981" />}
                title={t('orch_feature3_title')}
                desc={t('orch_feature3_desc')}
             />
          </div>
        </div>

        {/* CRITICAL SAFETY SECTION */}
        <div className="glass-panel" style={{ padding: 'clamp(24px, 5vw, 56px)', border: '1px solid rgba(239, 68, 68, 0.4)', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)', borderRadius: '24px' }}>
           <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
              <AlertTriangle size={36} color="#ef4444" />
              <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', fontWeight: '900' }}>{t('safety_first')}</h2>
           </div>
           <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '24px' }}>
             {t('safety_assist_text')}
           </p>
           <div className="responsive-grid-2" style={{ gap: '16px' }}>
              <div style={{ padding: 'clamp(16px, 3vw, 24px)', background: 'rgba(0,0,0,0.2)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ fontWeight: '800', color: '#ef4444', marginBottom: '10px', fontSize: '1rem' }}>{t('do_not')}</div>
                 <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t('do_not_move')}</p>
              </div>
              <div style={{ padding: 'clamp(16px, 3vw, 24px)', background: 'rgba(0,0,0,0.2)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ fontWeight: '800', color: '#10b981', marginBottom: '10px', fontSize: '1rem' }}>{t('do')}</div>
                 <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t('do_stay_line')}</p>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const HighlightCard = ({ icon, title, desc }) => (
  <motion.div whileHover={{ y: -6 }} className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
    <div style={{ marginBottom: '18px' }}>{icon}</div>
    <h3 style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', marginBottom: '12px', fontWeight: '800' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>{desc}</p>
  </motion.div>
);

export default Guide;
