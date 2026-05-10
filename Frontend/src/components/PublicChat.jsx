import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Stethoscope, ShieldAlert } from 'lucide-react';
import EMERGENCIES from '../data/emergencies.json';
import { useLanguage } from '../context/LanguageContext';

const PublicChat = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Emergency? Type your situation (e.g., 'bleeding', 'fracture') for instant first-aid.", isBot: true, data: null }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (overrideInput = null) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    const userMsg = textToSend.toLowerCase();
    const newMessages = [...messages, { text: textToSend, isBot: false, data: null }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let matched = EMERGENCIES.find(e => 
        e.title.toLowerCase().includes(userMsg) || 
        e.keywords.some(k => userMsg.includes(k))
      );

      if (matched) {
        setMessages(prev => [...prev, { 
          text: `Protocol for ${matched.title}:`, 
          isBot: true, 
          data: matched 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: "I understand this is an emergency. Please pick from the list or type words like 'Bleeding' or 'Burn'. Always call 108 immediately.", 
          isBot: true, 
          data: null 
        }]);
      }
    }, 500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-panel"
            style={{ width: '380px', height: '550px', marginBottom: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(239, 68, 68, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            {/* Header */}
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Stethoscope size={20} color="#ef4444" className="sos-pulse-small" />
                <span style={{ fontWeight: '700', letterSpacing: '1px' }}>{t('medic_title')}</span>
              </div>
              <X size={20} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.isBot ? 'flex-start' : 'flex-end', maxWidth: '90%' }}>
                  <div style={{ 
                    background: m.isBot ? 'rgba(255,255,255,0.05)' : '#ef4444',
                    padding: '12px 16px',
                    borderRadius: m.isBot ? '0 15px 15px 15px' : '15px 0 15px 15px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}>
                    {m.text}
                  </div>
                  
                  {m.data && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      style={{ marginTop: '10px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <ShieldAlert size={16} color={m.data.severity === 'Critical' ? '#ef4444' : '#f59e0b'} />
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: m.data.severity === 'Critical' ? '#ef4444' : '#f59e0b', textTransform: 'uppercase' }}>
                          {m.data.severity} SEVERITY
                        </span>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>✅ FIRST AID:</div>
                        {m.data.firstAid.map((step, si) => (
                          <div key={si} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3px' }}>• {step}</div>
                        ))}
                      </div>

                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ef4444', marginBottom: '5px' }}>❌ AVOID:</div>
                        {m.data.avoid.map((step, si) => (
                          <div key={si} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3px' }}>• {step}</div>
                        ))}
                      </div>

                      <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                        <a href="tel:108" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: '800', fontSize: '1rem' }}>📞 {t('call_108')}</a>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input & Dropdown */}
            <div style={{ padding: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <select 
                onChange={(e) => {
                  if(e.target.value) {
                    setInput(e.target.value);
                    setTimeout(() => handleSend(e.target.value), 100);
                  }
                }}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                <option value="">-- Select Emergency Type --</option>
                {EMERGENCIES.map(e => (
                  <option key={e.id} value={e.title} style={{ background: '#020617' }}>{e.title}</option>
                ))}
              </select>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Or describe situation..."
                  style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', padding: '12px', color: 'white', fontSize: '0.9rem' }}
                />
                <button onClick={() => handleSend()} style={{ background: '#ef4444', border: 'none', borderRadius: '8px', padding: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={18} color="white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '65px', 
          height: '65px', 
          borderRadius: '50%', 
          background: '#ef4444', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {isOpen ? <X color="white" /> : <MessageSquare color="white" />}
      </motion.div>
    </div>
  );
};

export default PublicChat;
