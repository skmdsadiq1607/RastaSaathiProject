import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus, Smartphone, Radio, Zap, Brain, Camera, FileText,
  AlertTriangle, CheckCircle, XCircle, ChevronDown, MapPin,
  Phone, MessageSquare, Shield, Info, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import whatsappQr from '../assets/whatsapp-qr.png';

const Guide = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  /* ─── Data ─── */
  const SETUP_STEPS = [
    {
      num: '01',
      icon: <UserPlus size={22} />,
      color: '#3b82f6',
      title: t('guide_step1_title'),
      desc: t('guide_step1_desc'),
      tips: [
        t('guide_step1_tip1'),
        t('guide_step1_tip2'),
        t('guide_step1_tip3'),
      ],
    },
    {
      num: '02',
      icon: <MessageSquare size={22} />,
      color: '#10b981',
      title: t('guide_step2_title'),
      isHighlight: true,
      desc: t('guide_step2_desc'),
      tips: [
        t('guide_step2_tip1'),
        t('guide_step2_tip2'),
        t('guide_step2_tip3'),
      ],
    },
    {
      num: '03',
      icon: <Smartphone size={22} />,
      color: '#8b5cf6',
      title: t('guide_step3_title'),
      desc: t('guide_step3_desc'),
      tips: [
        t('guide_step3_tip1'),
        t('guide_step3_tip2'),
        t('guide_step3_tip3'),
      ],
    },
    {
      num: '04',
      icon: <Radio size={22} />,
      color: '#ef4444',
      title: t('guide_step4_title'),
      desc: t('guide_step4_desc'),
      tips: [
        t('guide_step4_tip1'),
        t('guide_step4_tip2'),
        t('guide_step4_tip3'),
      ],
    },
    {
      num: '05',
      icon: <Brain size={22} />,
      color: '#f59e0b',
      title: t('guide_step5_title'),
      desc: t('guide_step5_desc'),
      tips: [
        t('guide_step5_tip1'),
        t('guide_step5_tip2'),
        t('guide_step5_tip3'),
      ],
    },
    {
      num: '06',
      icon: <Camera size={22} />,
      color: '#ec4899',
      title: t('guide_step6_title'),
      desc: t('guide_step6_desc'),
      tips: [
        t('guide_step6_tip1'),
        t('guide_step6_tip2'),
        t('guide_step6_tip3'),
      ],
    },
    {
      num: '07',
      icon: <FileText size={22} />,
      color: '#06b6d4',
      title: t('guide_step7_title'),
      desc: t('guide_step7_desc'),
      tips: [
        t('guide_step7_tip1'),
        t('guide_step7_tip2'),
        t('guide_step7_tip3'),
      ],
    },
  ];

  const FAQS = [
    {
      q: t('guide_faq1_q'),
      a: t('guide_faq1_a'),
    },
    {
      q: t('guide_faq2_q'),
      a: t('guide_faq2_a'),
    },
    {
      q: t('guide_faq3_q'),
      a: t('guide_faq3_a'),
    },
    {
      q: t('guide_faq4_q'),
      a: t('guide_faq4_a'),
    },
    {
      q: t('guide_faq5_q'),
      a: t('guide_faq5_a'),
    },
    {
      q: t('guide_faq6_q'),
      a: t('guide_faq6_a'),
    },
    {
      q: t('guide_faq7_q'),
      a: t('guide_faq7_a'),
    },
  ];

  const DO_DONTS = {
    do: [
      t('guide_do1'),
      t('guide_do2'),
      t('guide_do3'),
      t('guide_do4'),
      t('guide_do5'),
      t('guide_do6'),
    ],
    dont: [
      t('guide_dont1'),
      t('guide_dont2'),
      t('guide_dont3'),
      t('guide_dont4'),
      t('guide_dont5'),
      t('guide_dont6'),
    ],
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient */}
      <div style={{ position: 'absolute', top: 0, left: '10%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }} />

      <div className="container" style={{ paddingBottom: '80px' }}>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', padding: 'clamp(36px,8vw,80px) 0 clamp(40px,6vw,72px)' }}
        >
          <span style={{
            display: 'inline-block', padding: '8px 20px',
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)',
            borderRadius: '100px', color: '#ef4444', fontSize: '0.78rem',
            fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '22px'
          }}>
            {t('guide_hero_label')}
          </span>
          <h1 style={{ marginBottom: '18px', fontWeight: 900 }}>
            {t('guide_hero_title').includes("How to Use RastaSaathi") ? (
              <>How to Use <span style={{ color: '#ef4444' }}>RastaSaathi</span></>
            ) : t('guide_hero_title').includes("रास्तासाथी का उपयोग कैसे करें") ? (
              <>रास्तासाथी का <span style={{ color: '#ef4444' }}>उपयोग कैसे करें</span></>
            ) : t('guide_hero_title')}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '680px', margin: '0 auto' }}>
            {t('guide_hero_desc')}
          </p>
        </motion.div>

        {/* ── SETUP STEPS ── */}
        <div style={{ marginBottom: 'clamp(56px, 8vw, 100px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 52px)' }}>
            <h2 style={{ marginBottom: '12px' }}>{t('guide_steps_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '520px', margin: '0 auto' }}>
              {t('guide_steps_desc')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {SETUP_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                style={{
                  borderRadius: '20px',
                  border: `1px solid ${step.isHighlight ? step.color + '40' : 'var(--border-glass)'}`,
                  background: step.isHighlight
                    ? `linear-gradient(135deg, ${step.color}10 0%, ${step.color}04 100%)`
                    : 'var(--bg-deep)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', gap: 'clamp(14px, 3vw, 24px)', padding: 'clamp(20px, 4vw, 32px)', alignItems: 'flex-start' }}>
                  {/* Step number */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <div style={{
                      width: '48px', height: '48px',
                      background: `${step.color}18`,
                      border: `2px solid ${step.color}40`,
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: step.color
                    }}>
                      {step.icon}
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: step.color, letterSpacing: '1px' }}>{step.num}</span>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                      {step.title}
                      {step.isHighlight && (
                        <span style={{ marginLeft: '10px', fontSize: '0.7rem', fontWeight: 900, background: step.color, color: 'white', padding: '3px 8px', borderRadius: '6px', verticalAlign: 'middle' }}>
                          {t('guide_step2_required')}
                        </span>
                      )}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 'clamp(0.88rem, 2vw, 0.97rem)', marginBottom: '14px' }}>
                      {step.desc}
                    </p>

                    {/* Tips */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {step.tips.map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <CheckCircle size={14} color={step.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tip}</span>
                        </div>
                      ))}
                    </div>

                    {/* WhatsApp QR for step 02 */}
                    {step.isHighlight && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                          marginTop: '20px',
                          display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap',
                          padding: '20px', borderRadius: '16px',
                          background: 'rgba(16,185,129,0.06)',
                          border: '1px solid rgba(16,185,129,0.2)',
                          maxWidth: '500px'
                        }}
                      >
                        <img
                          src={whatsappQr}
                          alt="WhatsApp QR Code"
                          style={{ width: '80px', height: '80px', borderRadius: '10px', border: '2px solid white', background: 'white', flexShrink: 0 }}
                        />
                        <div>
                          <div style={{ fontWeight: 800, color: '#10b981', fontSize: '0.95rem', marginBottom: '6px' }}>
                            {t('guide_step2_scan')}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                            {t('guide_step2_scan_desc')}
                          </div>
                          <a
                            href="https://wa.me/14155238886?text=join%20do-hit"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              color: 'white', background: '#10b981',
                              padding: '8px 16px', borderRadius: '10px',
                              fontSize: '0.82rem', fontWeight: 800, textDecoration: 'none'
                            }}
                          >
                            {t('guide_step2_btn')} <ArrowRight size={14} />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── DO'S & DON'TS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(56px, 8vw, 100px)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 44px)' }}>
            <h2 style={{ marginBottom: '12px' }}>{t('guide_do_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '520px', margin: '0 auto' }}>
              {t('guide_do_desc')}
            </p>
          </div>

          <div className="responsive-grid-2" style={{ gap: '16px' }}>
            {/* DO */}
            <div style={{
              padding: 'clamp(20px, 4vw, 32px)', borderRadius: '20px',
              border: '1px solid rgba(16,185,129,0.25)',
              background: 'rgba(16,185,129,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <CheckCircle size={22} color="#10b981" />
                <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 800, color: '#10b981' }}>{t('guide_do_heading')}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DO_DONTS.do.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckCircle size={14} color="#10b981" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'T */}
            <div style={{
              padding: 'clamp(20px, 4vw, 32px)', borderRadius: '20px',
              border: '1px solid rgba(239,68,68,0.25)',
              background: 'rgba(239,68,68,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <XCircle size={22} color="#ef4444" />
                <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 800, color: '#ef4444' }}>{t('guide_dont_heading')}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DO_DONTS.dont.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <XCircle size={14} color="#ef4444" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── EMERGENCY NUMBERS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(56px, 8vw, 100px)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 40px)' }}>
            <h2 style={{ marginBottom: '12px' }}>{t('guide_numbers_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '480px', margin: '0 auto' }}>
              {t('guide_numbers_desc')}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {[
              { num: '108', label: t('guide_num1_label'), sub: t('guide_num1_sub'), color: '#ef4444' },
              { num: '100', label: t('guide_num2_label'), sub: t('guide_num2_sub'), color: '#3b82f6' },
              { num: '101', label: t('guide_num3_label'), sub: t('guide_num3_sub'), color: '#f59e0b' },
              { num: '112', label: t('guide_num4_label'), sub: t('guide_num4_sub'), color: '#10b981' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{
                  padding: 'clamp(18px, 3vw, 24px)', borderRadius: '16px',
                  border: `1px solid ${item.color}30`,
                  background: `${item.color}08`,
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 900, color: item.color, marginBottom: '6px' }}>{item.num}</div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.4 }}>{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── FAQ ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 44px)' }}>
            <h2 style={{ marginBottom: '12px' }}>{t('guide_faq_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '480px', margin: '0 auto' }}>
              {t('guide_faq_desc')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '820px', margin: '0 auto' }}>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                style={{
                  border: '1px solid var(--border-glass)',
                  borderRadius: '16px',
                  background: 'var(--bg-deep)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: 'clamp(16px, 3vw, 22px) clamp(16px, 3vw, 24px)',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    textAlign: 'left', gap: '12px'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: 'var(--text-primary)', flex: 1 }}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0, color: '#ef4444' }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 22px)',
                        borderTop: '1px solid var(--border-glass)'
                      }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', lineHeight: 1.7, paddingTop: '14px' }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Guide;
