import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Heart, Zap, Rocket, CheckCircle, MapPin, Brain, Shield, Clock, Users, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Mission = () => {
  const { t } = useLanguage();

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: 0, left: '5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', right: 0, width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }} />

      <div className="container" style={{ paddingBottom: '80px' }}>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', padding: 'clamp(40px,8vw,80px) 0 clamp(48px,6vw,80px)' }}
        >
          <span style={{
            display: 'inline-block', padding: '8px 20px',
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)',
            borderRadius: '100px', color: '#ef4444', fontSize: '0.78rem',
            fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '24px'
          }}>
            {t('mission_hero_label')}
          </span>
          <h1 style={{ marginBottom: '20px', fontWeight: 900 }}>
            {t('mission_hero_title').includes("Vision & Mission") ? (
              <>Vision & <span style={{ color: '#ef4444' }}>Mission</span></>
            ) : t('mission_hero_title').includes("विजन और मिशन") ? (
              <>विजन और <span style={{ color: '#ef4444' }}>मिशन</span></>
            ) : t('mission_hero_title')}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '680px', margin: '0 auto' }}>
            {t('mission_hero_desc')}
          </p>
        </motion.div>

        {/* ── VISION & MISSION CARDS ── */}
        <div className="responsive-grid-2" style={{ gap: 'clamp(20px, 4vw, 40px)', marginBottom: 'clamp(48px, 7vw, 80px)', alignItems: 'stretch' }}>
          
          {/* VISION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              padding: 'clamp(28px, 5vw, 48px)',
              borderRadius: '24px',
              border: '1px solid rgba(239,68,68,0.2)',
              background: 'linear-gradient(135deg, rgba(239,68,68,0.05) 0%, rgba(239,68,68,0.01) 100%)',
              display: 'flex', flexDirection: 'column', gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(239,68,68,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Eye size={22} color="#ef4444" />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2px' }}>{t('vision_label')}</div>
                <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{t('vision_title')}</h2>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              {t('vision_p1').includes("no road accident victim") ? (
                <>A future where <strong style={{ color: 'var(--text-primary)' }}>no road accident victim</strong> loses their life due to delayed emergency response. We envision a country where pressing SOS guarantees help arriving within minutes — not hours.</>
              ) : t('vision_p1').includes("सड़क दुर्घटना पीड़ित की जान न जाए") ? (
                <>एक ऐसा भविष्य जहां आपातकालीन प्रतिक्रिया में देरी के कारण किसी भी <strong style={{ color: 'var(--text-primary)' }}>सड़क दुर्घटना पीड़ित की जान न जाए</strong>। हम एक ऐसे देश की कल्पना करते हैं जहां एसओएस दबाने से मिनटों में मदद मिलने की गारंटी मिलती है - घंटों में नहीं।</>
              ) : t('vision_p1')}
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              {t('vision_p2').includes("backbone emergency layer") ? (
                <>We see RastaSaathi as India's <strong style={{ color: 'var(--text-primary)' }}>backbone emergency layer</strong> — connecting every road, every hospital, every ambulance into one intelligent, real-time grid.</>
              ) : t('vision_p2').includes("रीढ़ की हड्डी वाली आपातकालीन परत") ? (
                <>हम रास्तासाथी को भारत की <strong style={{ color: 'var(--text-primary)' }}>रीढ़ की हड्डी वाली आपातकालीन परत</strong> के रूप में देखते हैं - हर सड़क, हर अस्पताल, हर एम्बुलेंस को एक बुद्धिमान, वास्तविक समय के ग्रिड में जोड़ना।</>
              ) : t('vision_p2')}
            </p>
          </motion.div>

          {/* MISSION */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              padding: 'clamp(28px, 5vw, 48px)',
              borderRadius: '24px',
              border: '1px solid rgba(59,130,246,0.2)',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(59,130,246,0.01) 100%)',
              display: 'flex', flexDirection: 'column', gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Target size={22} color="#3b82f6" />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2px' }}>{t('mission_label')}</div>
                <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{t('mission_title')}</h2>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              {t('mission_p1').includes("any person on any road in India") ? (
                <>To build a platform that <strong style={{ color: 'var(--text-primary)' }}>any person on any road in India</strong> can use in a crisis — without needing to know addresses, make multiple calls, or wait for someone else to act.</>
              ) : t('mission_p1').includes("भारत की किसी भी सड़क पर कोई भी व्यक्ति") ? (
                <>एक ऐसा मंच तैयार करना जिसे <strong style={{ color: 'var(--text-primary)' }}>भारत की किसी भी सड़क पर कोई भी व्यक्ति</strong> संकट के समय उपयोग कर सके - बिना पते जानने, कई कॉल करने या किसी और के कार्रवाई करने का इंतजार किए।</>
              ) : t('mission_p1')}
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
              {t('mission_p2').includes("One tap") ? (
                <><strong style={{ color: 'var(--text-primary)' }}>One tap</strong>. Instant GPS capture. Hospitals found. Ambulance dispatched. AI guidance activated. WhatsApp alert sent. That's our mission — working, in real time.</>
              ) : t('mission_p2').includes("एक टैप") ? (
                <><strong style={{ color: 'var(--text-primary)' }}>एक टैप</strong>। त्वरित जीपीएस कैप्चर। अस्पताल मिले। एम्बुलेंस भेजी गई। एआई मार्गदर्शन सक्रिय। व्हाट्सएप अलर्ट भेजा गया। यही हमारा मिशन है - वास्तविक समय में काम करना।</>
              ) : t('mission_p2')}
            </p>
          </motion.div>
        </div>

        {/* ── THE PROBLEM IN NUMBERS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(48px, 7vw, 80px)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 44px)' }}>
            <h2 style={{ marginBottom: '12px' }}>{t('problem_numbers_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', maxWidth: '560px', margin: '0 auto' }}>
              {t('problem_numbers_desc')}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { val: t('stat1_val'), label: t('stat1_label'), sub: t('stat1_sub'), color: '#ef4444' },
              { val: t('stat2_val'), label: t('stat2_label'), sub: t('stat2_sub'), color: '#f59e0b' },
              { val: t('stat3_val'), label: t('stat3_label'), sub: t('stat3_sub'), color: '#10b981' },
              { val: t('stat4_val'), label: t('stat4_label'), sub: t('stat4_sub'), color: '#3b82f6' },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{
                  padding: 'clamp(20px, 4vw, 28px)',
                  border: `1px solid ${s.color}30`,
                  borderRadius: '16px',
                  background: `${s.color}08`,
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', fontWeight: 900, color: s.color, marginBottom: '6px' }}>{s.val}</div>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{s.label}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.4 }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── OUR CORE VALUES ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(48px, 7vw, 80px)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 44px)' }}>
            <h2 style={{ marginBottom: '12px' }}>{t('values_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', maxWidth: '520px', margin: '0 auto' }}>
              {t('values_desc')}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              {
                icon: <Zap size={24} />, color: '#ef4444',
                title: t('value1_title'),
                desc: t('value1_desc')
              },
              {
                icon: <Users size={24} />, color: '#3b82f6',
                title: t('value2_title'),
                desc: t('value2_desc')
              },
              {
                icon: <Shield size={24} />, color: '#10b981',
                title: t('value3_title'),
                desc: t('value3_desc')
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                style={{
                  padding: 'clamp(24px, 4vw, 36px)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '20px',
                  background: 'var(--bg-deep)'
                }}
              >
                <div style={{ width: '50px', height: '50px', background: `${v.color}18`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color, marginBottom: '18px' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── WHAT WE'RE BUILDING TOWARDS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(48px, 7vw, 80px)' }}
        >
          <div style={{
            padding: 'clamp(28px, 5vw, 56px)',
            borderRadius: '24px',
            border: '1px solid var(--border-glass)',
            background: 'var(--bg-deep)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ width: '52px', height: '52px', minWidth: '52px', background: 'rgba(239,68,68,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Rocket size={24} color="#ef4444" />
              </div>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', marginBottom: '16px' }}>{t('roadmap_title')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { icon: <Globe size={16} />, text: t('roadmap1') },
                    { icon: <Brain size={16} />, text: t('roadmap2') },
                    { icon: <MapPin size={16} />, text: t('roadmap3') },
                    { icon: <Clock size={16} />, text: t('roadmap4') },
                    { icon: <CheckCircle size={16} />, text: t('roadmap5') },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{ color: '#ef4444', marginTop: '2px', flexShrink: 0 }}>{item.icon}</div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.65 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CLOSING QUOTE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            padding: 'clamp(36px, 6vw, 64px) clamp(20px, 5vw, 60px)',
            background: 'linear-gradient(180deg, var(--brand-red-glow), transparent)',
            border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: '24px'
          }}
        >
          <Heart size={40} color="#ef4444" style={{ marginBottom: '24px' }} />
          <blockquote style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 20px',
            fontStyle: 'italic'
          }}>
            {t('closing_quote')}
          </blockquote>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
            {t('closing_by')}
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Mission;
