import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus, Smartphone, Radio, Zap, Brain, Camera, FileText,
  AlertTriangle, CheckCircle, XCircle, ChevronDown, MapPin,
  Phone, MessageSquare, Shield, Info, ArrowRight
} from 'lucide-react';
import whatsappQr from '../assets/whatsapp-qr.png';

/* ─── Data ─── */
const SETUP_STEPS = [
  {
    num: '01',
    icon: <UserPlus size={22} />,
    color: '#3b82f6',
    title: 'Create an Account',
    desc: 'Sign up on RastaSaathi with your name, phone number, and emergency contacts. This takes less than 2 minutes.',
    tips: [
      'Use a real phone number — alerts are sent to your WhatsApp',
      'Add at least one emergency contact (family member or friend)',
      'Your data is stored securely and never shared with third parties',
    ],
  },
  {
    num: '02',
    icon: <MessageSquare size={22} />,
    color: '#10b981',
    title: 'Activate WhatsApp Alerts',
    isHighlight: true,
    desc: 'To receive and send WhatsApp SOS alerts, link your number to our WhatsApp service with one quick message.',
    tips: [
      'Send "join soft-peace" to +1 415 523 8886 on WhatsApp',
      'Or scan the QR code below to open the chat instantly',
      'You only need to do this once — alerts work forever after',
    ],
  },
  {
    num: '03',
    icon: <Smartphone size={22} />,
    color: '#8b5cf6',
    title: 'Open the Dashboard',
    desc: 'After logging in, go to the Dashboard. This is your emergency control centre — it shows your SOS button, AI assistant, map, and injury scanner.',
    tips: [
      'Bookmark the dashboard page on your phone browser for quick access',
      'Allow location permission when prompted — it\'s essential for SOS',
      'The dashboard works best in full-screen mobile browser mode',
    ],
  },
  {
    num: '04',
    icon: <Radio size={22} />,
    color: '#ef4444',
    title: 'Trigger SOS in an Emergency',
    desc: 'Press the red SOS button. Your GPS coordinates are captured automatically. The system finds the nearest hospital, ambulance and police station within seconds.',
    tips: [
      'A 5-second countdown gives you time to cancel if triggered by mistake',
      'Use "Manual Entry" if GPS is unavailable — type the nearest landmark',
      'Your emergency contacts get a WhatsApp message with your live location',
    ],
  },
  {
    num: '05',
    icon: <Brain size={22} />,
    color: '#f59e0b',
    title: 'Use the AI First Aid Chat',
    desc: 'While waiting for help, use the AI Chat Assistant tab to get step-by-step first aid guidance. Just describe the situation in simple words.',
    tips: [
      'Type things like "person is bleeding from the leg" or "victim is unconscious"',
      'The AI gives calm, clear instructions — no medical knowledge needed',
      'Ask follow-up questions — the AI remembers the conversation context',
    ],
  },
  {
    num: '06',
    icon: <Camera size={22} />,
    color: '#ec4899',
    title: 'Use AI Injury Scanner',
    desc: 'Switch to the AI Injury Scanner tab and upload a photo of the wound. The AI identifies the injury type and gives specific first aid steps for that wound.',
    tips: [
      'Take a clear, close-up photo of the injury in good lighting',
      'The scanner works for cuts, burns, fractures, bruises, and more',
      'Follow the "Critical Warnings" — they tell you what NOT to do',
    ],
  },
  {
    num: '07',
    icon: <FileText size={22} />,
    color: '#06b6d4',
    title: 'Download the Incident Report',
    desc: 'After the SOS is handled, download a full PDF incident report from the dashboard. It includes timestamp, location, severity score, hospitals found, and actions taken.',
    tips: [
      'Useful for insurance claims, police reports, or hospital admission records',
      'The PDF includes GPS coordinates and nearest facility details',
      'Report is generated automatically — just click "Download Report"',
    ],
  },
];

const FAQS = [
  {
    q: 'Does it work without internet?',
    a: 'The SOS button requires an internet connection to dispatch alerts and find nearby hospitals. However, you can use the "Manual Entry" mode to type your location if GPS fails. We are building an offline-capable version for future release.',
  },
  {
    q: 'What happens after I press SOS?',
    a: 'Your GPS is captured instantly. The system finds the nearest hospital, ambulance, and police station. Your emergency contacts receive a WhatsApp message with your coordinates. The AI assistant activates to guide you with first aid. A live map shows all responders.',
  },
  {
    q: 'Do I need to call anyone manually?',
    a: 'No. RastaSaathi handles the alert dispatch automatically. However, you can also call 108 (ambulance) or 100 (police) directly if needed. The dashboard shows route buttons for all three emergency services.',
  },
  {
    q: 'Why does my WhatsApp need to be linked?',
    a: 'WhatsApp alerts are sent through Twilio\'s WhatsApp gateway. To receive messages from this gateway, your number needs to be opted in once by sending "join soft-peace" to the sandbox number. It\'s a one-time step.',
  },
  {
    q: 'Is my location always being tracked?',
    a: 'No. Your location is only captured at the moment you press SOS. We do not continuously track your position. Location permission is required only so GPS can be read instantly when you need it.',
  },
  {
    q: 'What if I trigger SOS by accident?',
    a: 'A 5-second countdown appears before SOS is activated. You can cancel it within that window. If it goes through, you\'ll see a cancel option on the active SOS screen.',
  },
  {
    q: 'Does the AI replace a real doctor?',
    a: 'No. The AI provides immediate first aid guidance to help you stabilize the situation until professional help arrives. It should never replace calling 108 or getting the victim to a hospital. Always escalate to medical professionals.',
  },
];

const DO_DONTS = {
  do: [
    'Stay calm — press SOS once and let the system work',
    'Keep the victim still and warm while waiting for help',
    'Stay on the line with emergency services if they call back',
    'Use the AI chat for step-by-step first aid instructions',
    'Share your live location link with bystanders if needed',
    'Call 108 directly as a backup if signals are weak',
  ],
  dont: [
    'Do not move a victim who may have a spinal or neck injury',
    'Do not remove embedded objects from wounds',
    'Do not give food or water to an unconscious person',
    'Do not leave the victim alone unless absolutely necessary',
    'Do not press SOS multiple times — one trigger is enough',
    'Do not ignore the "When to Escalate" warnings from the AI scanner',
  ],
};

/* ─── Component ─── */
const Guide = () => {
  const [openFaq, setOpenFaq] = useState(null);

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
            User Guide
          </span>
          <h1 style={{ marginBottom: '18px', fontWeight: 900 }}>
            How to Use{' '}
            <span style={{ color: '#ef4444' }}>RastaSaathi</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '680px', margin: '0 auto' }}>
            A complete step-by-step guide — from setting up your account to triggering SOS, 
            using the AI assistant, and downloading your incident report.
          </p>
        </motion.div>

        {/* ── SETUP STEPS ── */}
        <div style={{ marginBottom: 'clamp(56px, 8vw, 100px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 52px)' }}>
            <h2 style={{ marginBottom: '12px' }}>Step-by-Step Setup & Usage</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '520px', margin: '0 auto' }}>
              Follow these steps in order to get fully set up and ready for an emergency.
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
                          REQUIRED
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
                            📱 Scan to Activate Instantly
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                            Scan this QR with your phone camera to open WhatsApp with the message pre-filled.
                          </div>
                          <a
                            href="https://wa.me/14155238886?text=join%20soft-peace"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              color: 'white', background: '#10b981',
                              padding: '8px 16px', borderRadius: '10px',
                              fontSize: '0.82rem', fontWeight: 800, textDecoration: 'none'
                            }}
                          >
                            Tap to Open WhatsApp <ArrowRight size={14} />
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
            <h2 style={{ marginBottom: '12px' }}>During an Emergency — Do's & Don'ts</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '520px', margin: '0 auto' }}>
              Staying calm and doing the right things can make a life-saving difference.
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
                <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 800, color: '#10b981' }}>Do This</h3>
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
                <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 800, color: '#ef4444' }}>Avoid This</h3>
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
            <h2 style={{ marginBottom: '12px' }}>Emergency Numbers to Know</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '480px', margin: '0 auto' }}>
              Keep these saved in your phone — use them alongside RastaSaathi.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {[
              { num: '108', label: 'Ambulance', sub: 'Medical emergency — free service', color: '#ef4444' },
              { num: '100', label: 'Police', sub: 'Law enforcement & accidents', color: '#3b82f6' },
              { num: '101', label: 'Fire Brigade', sub: 'Fire & rescue operations', color: '#f59e0b' },
              { num: '112', label: 'National Emergency', sub: 'All-in-one emergency number', color: '#10b981' },
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
            <h2 style={{ marginBottom: '12px' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: '480px', margin: '0 auto' }}>
              Common questions answered clearly.
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
