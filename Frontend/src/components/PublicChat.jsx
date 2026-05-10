import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, LifeBuoy } from 'lucide-react';

const KNOWLEDGE_BASE = {
  bleeding: "Apply firm, direct pressure with a clean cloth. Do not remove the cloth. Elevate the wound.",
  burn: "Run cool (not cold) water over the burn for 10-20 minutes. Do not use ice or butter. Cover loosely.",
  choking: "Perform the Heimlich maneuver: Stand behind them, wrap arms around waist, and give quick upward thrusts.",
  fracture: "Immobilize the area. Do not try to realign the bone. Apply a cold pack to reduce swelling.",
  fainting: "Lay the person on their back and elevate their legs about 12 inches. Loosen tight clothing.",
  snake: "Keep the person still and calm. Keep the bite area below heart level. Do not use a tourniquet.",
  poison: "Identify the substance if possible. Do not induce vomiting unless told by a professional. Call emergency services.",
  seizure: "Clear the area of hard or sharp objects. Do not restrain the person. Turn them onto their side after it ends.",
  default: "I understand this is an emergency. Please type 'Bleeding', 'Burn', 'Choking', 'Snake bite', or 'Fracture' for specific steps, or tap the SOS button for immediate help."
};

const PublicChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Emergency? Type your situation (e.g., 'bleeding', 'burn') for instant first-aid.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.toLowerCase();
    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput('');

    // Logic for Keyword Matching
    setTimeout(() => {
      let response = KNOWLEDGE_BASE.default;
      for (const key in KNOWLEDGE_BASE) {
        if (userMsg.includes(key)) {
          response = KNOWLEDGE_BASE[key];
          break;
        }
      }
      setMessages(prev => [...prev, { text: response, isBot: true }]);
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
            style={{ width: '350px', height: '450px', marginBottom: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(239, 68, 68, 0.3)' }}
          >
            {/* Header */}
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LifeBuoy size={20} color="#ef4444" />
                <span style={{ fontWeight: '700' }}>Instant Aid</span>
              </div>
              <X size={20} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ 
                  alignSelf: m.isBot ? 'flex-start' : 'flex-end',
                  background: m.isBot ? 'rgba(255,255,255,0.05)' : '#ef4444',
                  padding: '12px 16px',
                  borderRadius: m.isBot ? '0 15px 15px 15px' : '15px 0 15px 15px',
                  maxWidth: '85%',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  {m.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type 'bleeding', 'snake'..."
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', padding: '10px', color: 'white', fontSize: '0.9rem' }}
              />
              <button onClick={handleSend} style={{ background: '#ef4444', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={18} color="white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          background: '#ef4444', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
          margin: '0 auto'
        }}
      >
        {isOpen ? <X color="white" /> : <MessageSquare color="white" />}
      </motion.div>
    </div>
  );
};

export default PublicChat;
