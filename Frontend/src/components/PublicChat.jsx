import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ShieldAlert } from 'lucide-react';
import EMERGENCIES from '../data/emergencies.json';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

const PublicChat = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: t('medic_welcome'), isBot: true, data: null }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
          text: `${t('protocol_for')} ${matched.title}:`, 
          isBot: true, 
          data: matched 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: t('medic_fallback_msg'), 
          isBot: true, 
          data: null 
        }]);
      }
    }, 500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ 
              width: 'min(380px, 90vw)', 
              height: 'min(550px, 70vh)', 
              marginBottom: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden', 
              background: 'white',
              borderRadius: '24px',
              border: '1px solid rgba(0,0,0,0.1)', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'absolute',
              bottom: '80px',
              right: '0',
              zIndex: 1000
            }}
          >
            {/* Header */}
            <div style={{ background: '#f8fafc', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', color: '#1e293b' }}>Rasta</span><span style={{ fontWeight: '800', color: '#ef4444' }}>Saathi</span>
                <span style={{ fontWeight: '800', color: '#64748b', marginLeft: '5px' }}>Medic</span>
              </div>
              <X size={20} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', color: '#64748b' }} />
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', background: 'white' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.isBot ? 'flex-start' : 'flex-end', maxWidth: '90%' }}>
                  <div style={{ 
                    background: m.isBot ? '#f1f5f9' : '#ef4444',
                    color: m.isBot ? '#1e293b' : 'white',
                    padding: '12px 16px',
                    borderRadius: m.isBot ? '0 15px 15px 15px' : '15px 0 15px 15px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    fontWeight: '500',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                  }}>
                    {m.text}
                  </div>
                  
                  {m.data && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      style={{ marginTop: '10px', background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <ShieldAlert size={16} color={m.data.severity === 'Critical' ? '#ef4444' : '#f59e0b'} />
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: m.data.severity === 'Critical' ? '#ef4444' : '#f59e0b', textTransform: 'uppercase' }}>
                          {t(m.data.severity.toLowerCase() + '_severity')} {t('severity_label')}
                        </span>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#059669', marginBottom: '5px' }}>✅ {t('first_aid_label')}:</div>
                        {m.data.firstAid.map((step, si) => (
                          <div key={si} style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '3px', fontWeight: '500' }}>• {step}</div>
                        ))}
                      </div>

                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#dc2626', marginBottom: '5px' }}>🚫 {t('avoid_label')}:</div>
                        {m.data.avoid.map((step, si) => (
                          <div key={si} style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '3px', fontWeight: '500' }}>• {step}</div>
                        ))}
                      </div>

                      <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <a href="tel:108" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: '800', fontSize: '1rem' }}>📞 {t('call_108')}</a>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input & Dropdown */}
            <div style={{ padding: '15px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <select 
                onChange={(e) => {
                  if(e.target.value) {
                    setInput(e.target.value);
                    setTimeout(() => handleSend(e.target.value), 100);
                  }
                }}
                style={{ width: '100%', background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px', color: '#1e293b', fontSize: '0.85rem', cursor: 'pointer', outline: 'none' }}
              >
                <option value="">{t('select_emergency')}</option>
                {EMERGENCIES.map(e => (
                  <option key={e.id} value={e.title}>{e.title}</option>
                ))}
              </select>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('describe_situation')}
                  style={{ flex: 1, background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px', color: '#1e293b', fontSize: '0.9rem', outline: 'none' }}
                />
                <button onClick={() => handleSend()} style={{ background: '#ef4444', border: 'none', borderRadius: '8px', padding: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(239,68,68,0.2)' }}>
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
