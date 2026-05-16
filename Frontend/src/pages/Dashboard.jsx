import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, Navigation, MessageCircle, Send, MapPin, Shield, Zap, AlertTriangle, Radio, Hospital, Users, Loader2 } from 'lucide-react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Logo from '../components/Logo';
import { useTheme } from '../context/ThemeContext';

// Professional Scale Marker
const Marker = ({ text, type }) => (
  <div style={{
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    pointerEvents: 'none',
    zIndex: type === 'victim' ? 100 : 50
  }}>
    <motion.div 
      initial={{ scale: 0 }} 
      animate={{ scale: 1 }} 
      style={{ 
        color: 'white', 
        background: type === 'victim' ? '#ef4444' : '#3b82f6', 
        padding: '6px 12px', borderRadius: '12px', display: 'inline-flex', 
        alignItems: 'center', gap: '6px', fontWeight: '800', fontSize: '11px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1.5px solid white',
        whiteSpace: 'nowrap'
      }}
    >
      {type === 'victim' ? <Radio size={14} className="pulse-sos" /> : <Hospital size={14} />} 
      {text}
    </motion.div>
    <div style={{ 
      width: '8px', height: '8px', background: type === 'victim' ? '#ef4444' : '#3b82f6', 
      borderRadius: '50%', border: '1.5px solid white', margin: '-4px auto 0' 
    }}></div>
  </div>
);

import { useLanguage } from '../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatBotMessage = (text) => {
  if (!text) return text;
  
  try {
    // Try to parse if it's a JSON string (for the structured fallback)
    let data = text;
    if (typeof text === 'string' && (text.trim().startsWith('{') || text.trim().startsWith('['))) {
      try {
        data = JSON.parse(text);
      } catch (e) {}
    }

    if (typeof data === 'object' && data !== null && (data.steps || data.warnings)) {
      const parts = [];
      if (data.steps) {
        parts.push(<div key="steps" style={{ marginBottom: '16px' }}>
          <div style={{ color: '#10b981', fontWeight: '800', fontSize: '0.7rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>📋 Execution Steps</div>
          {data.steps.map((step, i) => <div key={i} style={{ marginBottom: '8px', fontSize: '0.9rem', lineHeight: '1.4' }}>{step}</div>)}
        </div>);
      }
      if (data.warnings) {
        parts.push(<div key="warnings" style={{ marginBottom: '16px' }}>
          <div style={{ color: '#f59e0b', fontWeight: '800', fontSize: '0.7rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>⚠️ Critical Warnings</div>
          {data.warnings.map((w, i) => <div key={i} style={{ marginBottom: '4px', fontSize: '0.9rem', color: '#fbbf24' }}>• {w}</div>)}
        </div>);
      }
      if (data.whenToEscalate) {
        parts.push(<div key="escalate">
          <div style={{ color: '#ef4444', fontWeight: '800', fontSize: '0.7rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>🚨 When to Call 108</div>
          {data.whenToEscalate.map((e, i) => <div key={i} style={{ marginBottom: '4px', fontSize: '0.9rem', color: '#fca5a5' }}>• {e}</div>)}
        </div>);
      }
      return parts;
    }
  } catch (e) {}

  // Handle Markdown-style text from AI
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    // Headers
    if (line.startsWith('### ')) return <h3 key={idx} style={{ fontSize: '1.1rem', fontWeight: '900', color: '#3b82f6', marginTop: '16px', marginBottom: '8px' }}>{line.replace('### ', '')}</h3>;
    if (line.startsWith('## ')) return <h2 key={idx} style={{ fontSize: '1.3rem', fontWeight: '900', color: '#3b82f6', marginTop: '20px', marginBottom: '10px' }}>{line.replace('## ', '')}</h2>;
    
    // Bold text
    let content = line;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIdx = 0;
    let match;
    while ((match = boldRegex.exec(line)) !== null) {
      parts.push(line.substring(lastIdx, match.index));
      parts.push(<strong key={match.index} style={{ color: '#fff', fontWeight: '800' }}>{match[1]}</strong>);
      lastIdx = match.index + match[0].length;
    }
    parts.push(line.substring(lastIdx));

    // Bullet points
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      return <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '4px', paddingLeft: '8px' }}>
        <span style={{ color: '#3b82f6' }}>•</span>
        <span style={{ fontSize: '0.95rem' }}>{parts.length > 1 ? parts : line.trim().substring(2)}</span>
      </div>;
    }

    return <p key={idx} style={{ fontSize: '0.95rem', margin: '4px 0', lineHeight: '1.5', minHeight: '1em' }}>{parts.length > 1 ? parts : line}</p>;
  });
};

const Dashboard = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [sosActive, setSosActive] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: t('medic_welcome') }
  ]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Map State
  const [mapCenter, setMapCenter] = useState({ lat: 17.3850, lng: 78.4867 });
  const [victimLocation, setVictimLocation] = useState(null);
  const [hospitalLocation, setHospitalLocation] = useState(null);
  const [selectedHospitalName, setSelectedHospitalName] = useState('');
  const [policeStations, setPoliceStations] = useState([]);

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const triggerSOS = async () => {
    setSosActive(true);
    setApiLoading(true);
    setMessages(prev => [...prev, { role: 'bot', text: t('initiating_protocol') }]);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const loc = { lat: latitude, lng: longitude };
      setVictimLocation(loc);
      setMapCenter(loc);

      setMessages(prev => [...prev, { role: 'bot', text: `${t('gps_acquired')} [${latitude.toFixed(4)}, ${longitude.toFixed(4)}]\n${t('sync_national')}` }]);

      try {
        const token = localStorage.getItem('token');
        console.log('Dispatching SOS to:', `${API_BASE_URL}/sos/trigger`);
        const sosRes = await axios.post(`${API_BASE_URL}/sos/trigger`, {
          lat: latitude,
          lng: longitude,
          injuryType: 'Traffic collision trauma'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { hospitalSelection, policeSelection, aiGuidance } = sosRes.data.data;
        const nearest = hospitalSelection?.[0]?.hospital;

        if (nearest) {
          const hLoc = { lat: nearest.location.coordinates[1], lng: nearest.location.coordinates[0] };
          setHospitalLocation(hLoc);
          setSelectedHospitalName(nearest.name);
          setPoliceStations(policeSelection || []);
          setMapCenter({ lat: (latitude + hLoc.lat) / 2, lng: (longitude + hLoc.lng) / 2 });
          
          let botMessage = `${t('sos_success')}\n\n${t('contacts_notified')}\n${t('nearest_hospital')} ${nearest.name}`;
          
          if (policeSelection && policeSelection.length > 0) {
            botMessage += `\n${t('nearest_police')} ${policeSelection[0].name}`;
          }
          
          botMessage += `\n${t('eta')} ${hospitalSelection[0].etaSeconds ? Math.round(hospitalSelection[0].etaSeconds / 60) + ' min' : t('calculating')}`;

          setMessages(prev => [...prev, { 
            role: 'bot', 
            text: botMessage
          }]);
        } else {
          setMessages(prev => [...prev, { role: 'bot', text: t('no_hospitals') }]);
        }

        if (aiGuidance) {
          setSessionId(aiGuidance.sessionId);
          setMessages(prev => [...prev, { role: 'bot', text: `${t('ai_activated')}\n${aiGuidance.guidance?.answer || 'Stay calm. Help is on the way.'}` }]);
        }
      } catch (err) {
        console.error('SOS Error:', err);
        const errMsg = err.response?.data?.error?.message || 'Network grid unreachable.';
        setMessages(prev => [...prev, { role: 'bot', text: `${t('critical_error')} ${errMsg}` }]);
      } finally {
        setApiLoading(false);
      }
    }, (err) => {
      setApiLoading(false);
      setMessages(prev => [...prev, { role: 'bot', text: t('geo_denied') }]);
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoadingMsg(true);

    try {
      const token = localStorage.getItem('token');
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        const initRes = await axios.post(`${API_BASE_URL}/firstaid/guide`, {
          injuryType: 'General inquiry', severityLevel: 'MEDIUM', language: 'en'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        currentSessionId = initRes.data?.data?.sessionId;
        setSessionId(currentSessionId);
      }

      const res = await axios.post(`${API_BASE_URL}/firstaid/followup`, {
        sessionId: currentSessionId, question: userMsg
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(prev => [...prev, { role: 'bot', text: res.data.data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'AI medic connection lost.' }]);
    } finally {
      setLoadingMsg(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingBottom: '40px' }}>
      <div className="dashboard-grid">
        <style>{`
          .dashboard-grid { display: grid; grid-template-columns: 1fr 420px; gap: 30px; }
          @media (max-width: 1100px) { .dashboard-grid { grid-template-columns: 1fr; } }
          .pulse-sos { animation: pulse-red 2s infinite; }
          @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
          
          .chat-bubble {
            max-width: 85%;
            padding: 16px 20px;
            border-radius: 18px;
            font-size: 0.95rem;
            line-height: 1.5;
            position: relative;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          .bot-bubble {
            background: var(--bg-deep);
            border: 1px solid var(--border-glass);
            border-bottom-left-radius: 4px;
            color: var(--text-primary);
          }
          .user-bubble {
            background: var(--brand-red);
            border-bottom-right-radius: 4px;
            color: white;
            align-self: flex-end;
          }
        `}</style>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', minHeight: '550px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {!sosActive ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                 <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: '40px' }}>
                  <div style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '2px', fontSize: '0.7rem', marginBottom: '12px' }}>{t('secure_terminal')}</div>
                  <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', fontWeight: '900' }}>{t('ready_dispatch')}</h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '450px', margin: '0 auto' }}>
                    {t('trigger_sub')}
                  </p>
                </motion.div>

                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={triggerSOS} 
                  style={{ 
                    width: '160px', height: '160px', borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', 
                    border: '10px solid rgba(239,68,68,0.2)', color: 'white', 
                    cursor: 'pointer', boxShadow: '0 0 50px rgba(239,68,68,0.5)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Logo size={22} light />
                  <span style={{ fontSize: '1.6rem', fontWeight: '900', marginTop: '4px' }}>SOS</span>
                </motion.button>
              </div>
            ) : (
              <div style={{ flex: 1, position: 'relative' }}>
                <GoogleMapReact 
                  bootstrapURLKeys={{ key: API_KEY }} 
                  center={mapCenter} 
                  defaultZoom={14} 
                  options={{ 
                    styles: theme === 'dark' ? [
                      { "elementType": "geometry", "stylers": [{ "color": "#0f172a" }] },
                      { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
                      { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
                      { "featureType": "transit", "stylers": [{ "visibility": "off" }] },
                      { "elementType": "labels.text.fill", "stylers": [{ "color": "#4b5563" }] },
                      { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }
                    ] : [], 
                    disableDefaultUI: true 
                  }}
                >
                  {victimLocation && <Marker lat={victimLocation.lat} lng={victimLocation.lng} text="EMERGENCY SITE" type="victim" />}
                  {hospitalLocation && <Marker lat={hospitalLocation.lat} lng={hospitalLocation.lng} text={selectedHospitalName} type="hospital" />}
                  {policeStations.map((p, idx) => (
                    <Marker key={idx} lat={p.location.coordinates[1]} lng={p.location.coordinates[0]} text={p.name} type="police" />
                  ))}
                </GoogleMapReact>

                <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
                   <div style={{ padding: '10px 20px', background: '#ef4444', color: 'white', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Radio size={16} className="pulse-sos" /> {t('sos_active')}
                   </div>
                   <div style={{ padding: '10px 20px', background: 'rgba(15, 23, 42, 0.9)', color: 'white', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '800' }}>{t('geospatial_grid')}</div>
                </div>

                <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px' }}>
                  <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-primary)', opacity: 0.95 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ width: '48px', height: '48px', background: 'var(--brand-red-glow)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {apiLoading ? <Loader2 className="animate-spin" color="#ef4444" /> : <Activity size={24} color="#ef4444" />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('system_status')}</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-primary)' }}>{apiLoading ? t('sync_grid') : t('dispatched_alerts')}</div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('nearest_police') || 'Nearest Police'}</div>
                          <div style={{ fontSize: '1rem', fontWeight: '900', color: '#3b82f6' }}>{policeStations[0]?.name || 'Locating...'}</div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('target_center')}</div>
                          <div style={{ fontSize: '1rem', fontWeight: '900', color: '#10b981' }}>{selectedHospitalName || (apiLoading ? t('calculating') : 'Manual Mode')}</div>
                        </div>
                        
                        {hospitalLocation && victimLocation && (
                          <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const url = `https://www.google.com/maps/dir/?api=1&origin=${victimLocation.lat},${victimLocation.lng}&destination=${hospitalLocation.lat},${hospitalLocation.lng}&travelmode=driving`;
                              window.open(url, '_blank');
                            }}
                            style={{ 
                              padding: '12px 20px', 
                              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                              color: 'white', 
                              borderRadius: '12px', 
                              border: 'none',
                              fontWeight: '900', 
                              fontSize: '0.8rem', 
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginLeft: '10px'
                            }}
                          >
                            <Navigation size={16} />
                            {t('navigate')}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel sidebar-chat" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px', marginBottom: '20px' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap color="#10b981" fill="#10b981" size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900' }}>{t('ai_medic')}</h3>
          </div>
          
          <div ref={chatContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                    gap: '4px'
                  }}>
                    {m.role === 'bot' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', marginLeft: '4px' }}>
                        <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>AI MEDIC CORE</span>
                      </div>
                    )}
                    <div className={`chat-bubble ${m.role === 'bot' ? 'bot-bubble' : 'user-bubble'}`}>
                      {m.role === 'bot' ? <div className="markdown-body">{formatBotMessage(m.text)}</div> : m.text}
                    </div>
                  </div>
                ))}
                {loadingMsg && (
                  <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '12px', width: 'fit-content' }}>
                    <Loader2 className="animate-spin" size={14} color="#3b82f6" />
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>AI ANALYSIS IN PROGRESS...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <input type="text" className="form-input" placeholder={t('emergency_guidance')} style={{ background: 'rgba(0,0,0,0.4)', flex: 1, padding: '14px 18px', fontSize: '0.95rem' }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
            <button onClick={sendMessage} className="premium-button" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={20} /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
