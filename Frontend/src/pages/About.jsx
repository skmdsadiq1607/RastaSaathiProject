import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Brain, MessageSquare, Phone, FileText, Camera, Shield, Clock, Wifi, AlertTriangle, Heart, Users, Zap, Navigation, Radio } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Glow */}
      <div style={{ position: 'absolute', top: 0, left: '5%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', right: 0, width: '28vw', height: '28vw', background: 'radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }} />

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
            {t('about_page_label')}
          </span>
          <h1 style={{ marginBottom: '20px', fontWeight: 900 }}>
            {t('about_hero_title').includes("Moments That Can't Wait") ? (
              <>Built for the <span style={{ color: '#ef4444' }}>Moments That Can't Wait</span></>
            ) : t('about_hero_title').includes("उन क्षणों के लिए जो इंतजार नहीं कर सकते") ? (
              <>उन क्षणों के लिए <span style={{ color: '#ef4444' }}>जो इंतजार नहीं कर सकते</span></>
            ) : t('about_hero_title')}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '720px', margin: '0 auto' }}>
            {t('about_hero_desc')}
          </p>
        </motion.div>

        {/* ── THE PROBLEM WE SOLVE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, rgba(239,68,68,0.02) 100%)',
            border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: '24px',
            padding: 'clamp(28px, 5vw, 56px)',
            marginBottom: 'clamp(48px, 6vw, 80px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              width: '52px', height: '52px', minWidth: '52px',
              background: 'rgba(239,68,68,0.1)', borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <AlertTriangle size={24} color="#ef4444" />
            </div>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <h2 style={{ marginBottom: '16px', fontSize: 'clamp(1.3rem, 3.5vw, 2rem)' }}>
                {t('about_why_title')}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', marginBottom: '16px' }}>
                {t('about_why_p1').includes("1.5 lakh road accident deaths every year") ? (
                  <>India records over <strong style={{ color: 'var(--text-primary)' }}>1.5 lakh road accident deaths every year</strong> — one every 4 minutes. The leading cause isn't just the crash. It's the delay in getting help.</>
                ) : t('about_why_p1').includes("1.5 लाख से अधिक सड़क दुर्घटना में मौतें") ? (
                  <>भारत में हर साल <strong style={{ color: 'var(--text-primary)' }}>1.5 लाख से अधिक सड़क दुर्घटना में मौतें</strong> दर्ज होती हैं - हर 4 मिनट में एक। इसका मुख्य कारण सिर्फ दुर्घटना नहीं है। यह मदद मिलने में देरी है।</>
                ) : t('about_why_p1')}
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
                {t('about_why_p2').includes("RastaSaathi solves all three") ? (
                  <>Bystanders panic. Victims can't describe their location. Emergency services take too long to be notified. <strong style={{ color: 'var(--text-primary)' }}>RastaSaathi solves all three</strong> — with one tap.</>
                ) : t('about_why_p2').includes("रास्तासाथी इन तीनों का समाधान करता है") ? (
                  <>आसपास खड़े लोग घबरा जाते हैं। पीड़ित अपना स्थान नहीं बता पाते। आपातकालीन सेवाओं को सूचित करने में बहुत समय लगता है। <strong style={{ color: 'var(--text-primary)' }}>रास्तासाथी इन तीनों का समाधान करता है</strong> - एक टैप से।</>
                ) : t('about_why_p2')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── WHAT IS RASTASAATHI ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            <h2 style={{ marginBottom: '14px' }}>{t('about_what_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
              {t('about_what_desc')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <FeatureCard
              icon={<MapPin size={22} />}
              color="#ef4444"
              title={t('about_feat_gps_title')}
              desc={t('about_feat_gps_desc')}
            />
            <FeatureCard
              icon={<Navigation size={22} />}
              color="#f59e0b"
              title={t('about_feat_route_title')}
              desc={t('about_feat_route_desc')}
            />
            <FeatureCard
              icon={<Phone size={22} />}
              color="#10b981"
              title={t('about_feat_whatsapp_title')}
              desc={t('about_feat_whatsapp_desc')}
            />
            <FeatureCard
              icon={<Brain size={22} />}
              color="#3b82f6"
              title={t('about_feat_ai_title')}
              desc={t('about_feat_ai_desc')}
            />
            <FeatureCard
              icon={<Camera size={22} />}
              color="#8b5cf6"
              title={t('about_feat_scanner_title')}
              desc={t('about_feat_scanner_desc')}
            />
            <FeatureCard
              icon={<FileText size={22} />}
              color="#06b6d4"
              title={t('about_feat_pdf_title')}
              desc={t('about_feat_pdf_desc')}
            />
          </div>
        </motion.div>

        {/* ── HOW IT WORKS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
            <h2 style={{ marginBottom: '14px' }}>{t('about_how_title')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', maxWidth: '580px', margin: '0 auto' }}>
              {t('about_how_desc')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { step: '01', icon: <Radio size={20} />, title: t('step1_title'), desc: t('about_step1_desc'), color: '#ef4444' },
              { step: '02', icon: <Zap size={20} />, title: t('about_step2_title'), desc: t('about_step2_desc'), color: '#f59e0b' },
              { step: '03', icon: <Heart size={20} />, title: t('about_step3_title'), desc: t('about_step3_desc'), color: '#10b981' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex', gap: '24px', padding: 'clamp(20px, 4vw, 32px)',
                  borderLeft: `3px solid ${i === 2 ? item.color : 'var(--border-glass)'}`,
                  marginLeft: '26px', position: 'relative',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
                }}
              >
                <div style={{
                  position: 'absolute', left: '-27px', top: '50%', transform: 'translateY(-50%)',
                  width: '52px', height: '52px',
                  background: `rgba(${item.color === '#ef4444' ? '239,68,68' : item.color === '#f59e0b' ? '245,158,11' : '16,185,129'}, 0.1)`,
                  border: `2px solid ${item.color}`,
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, backgroundColor: 'var(--bg-primary)'
                }}>
                  {item.icon}
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, color: item.color, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>{t('severity_label')} {item.step}</div>
                  <h3 style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', marginBottom: '10px', color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── KEY STATS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {[
              { val: '< 2s', label: t('about_stat1_label'), sub: t('about_stat1_sub') },
              { val: '108', label: t('about_stat2_label'), sub: t('about_stat2_sub') },
              { val: '3-in-1', label: t('about_stat3_label'), sub: t('about_stat3_sub') },
              { val: '24/7', label: t('about_stat4_label'), sub: t('about_stat4_sub') },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{
                  padding: 'clamp(20px, 4vw, 28px)', border: '1px solid var(--border-glass)',
                  borderRadius: '16px', background: 'var(--bg-deep)', textAlign: 'center'
                }}
              >
                <div style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 900, color: '#ef4444', marginBottom: '6px' }}>{s.val}</div>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{s.label}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── WHO IS IT FOR ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          <div className="responsive-grid-2" style={{ alignItems: 'center', gap: 'clamp(24px, 5vw, 60px)' }}>
            <div>
              <h2 style={{ marginBottom: '16px' }}>{t('about_for_title')}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', marginBottom: '20px' }}>
                {t('about_for_p1').includes("every Indian on the road") ? (
                  <>RastaSaathi is designed for <strong style={{ color: 'var(--text-primary)' }}>every Indian on the road</strong> — whether you're a daily commuter, a highway traveller, or a concerned family member who wants their loved ones to be protected.</>
                ) : t('about_for_p1').includes("सड़क पर चलने वाले हर भारतीय के लिए") ? (
                  <>रास्तासाथी <strong style={{ color: 'var(--text-primary)' }}>सड़क पर चलने वाले हर भारतीय के लिए</strong> डिज़ाइन किया गया है - चाहे आप दैनिक यात्री हों, राजमार्ग यात्री हों, या कोई चिंतित परिवार के सदस्य हों जो अपने प्रियजनों को सुरक्षित रखना चाहते हैं।</>
                ) : t('about_for_p1')}
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
                {t('about_for_p2').includes("press SOS") ? (
                  <>You don't need to be tech-savvy. You don't need to know the address. You just need to press <strong style={{ color: '#ef4444' }}>SOS</strong>.</>
                ) : t('about_for_p2').includes("बस एसओएस दबाना है") ? (
                  <>आपको तकनीकी रूप से समझदार होने की आवश्यकता नहीं है। आपको पता जानने की आवश्यकता नहीं है। आपको <strong style={{ color: '#ef4444' }}>बस एसओएस दबाना है</strong>।</>
                ) : t('about_for_p2')}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: <Users size={18} />, label: t('about_for1') },
                { icon: <Heart size={18} />, label: t('about_for2') },
                { icon: <Shield size={18} />, label: t('about_for3') },
                { icon: <Wifi size={18} />, label: t('about_for4') },
                { icon: <Clock size={18} />, label: t('about_for5') },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', border: '1px solid var(--border-glass)', borderRadius: '12px', background: 'var(--bg-deep)' }}>
                  <div style={{ color: '#ef4444', flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── BUILT BY ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            padding: 'clamp(36px, 6vw, 60px) clamp(20px, 5vw, 60px)',
            background: 'linear-gradient(180deg, var(--brand-red-glow), transparent)',
            border: '1px solid var(--border-glass)',
            borderRadius: '24px'
          }}
        >
          <h2 style={{ marginBottom: '16px' }}>{t('about_built_title')}</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '680px', margin: '0 auto 28px', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
            {t('about_built_desc')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {['Sadiq', 'Vamshikrishna', 'Dhananjay'].map((name, i) => (
              <div key={i} style={{
                padding: '10px 22px',
                border: '1px solid var(--border-glass)',
                borderRadius: '100px',
                fontWeight: 800,
                fontSize: '0.9rem',
                background: 'var(--bg-deep)',
                color: 'var(--text-primary)'
              }}>
                {name}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, color, title, desc }) => (
  <motion.div
    whileHover={{ y: -6, borderColor: color }}
    style={{
      padding: 'clamp(20px, 4vw, 28px)',
      border: '1px solid var(--border-glass)',
      borderRadius: '18px',
      background: 'var(--bg-deep)',
      transition: 'border-color 0.3s ease',
      cursor: 'default'
    }}
  >
    <div style={{
      width: '46px', height: '46px',
      background: `${color}18`,
      borderRadius: '14px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: color, marginBottom: '16px'
    }}>
      {icon}
    </div>
    <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', marginBottom: '10px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{desc}</p>
  </motion.div>
);

export default About;
