import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, Navigation, MessageCircle, Send, MapPin, Shield, Zap, AlertTriangle, Radio, Hospital, Users, Loader2, FileDown } from 'lucide-react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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
  const [ticketNumber, setTicketNumber] = useState('');
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [sosTimestamp, setSosTimestamp] = useState(null);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  
  // SOS countdown states (declared at top of component)
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(5);
  const [countdownTimer, setCountdownTimer] = useState(null);

  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Map State
  const [mapCenter, setMapCenter] = useState({ lat: 17.3850, lng: 78.4867 });

  const downloadSosReportPDF = async () => {
    try {
      const element = document.getElementById('sos-pdf-report');
      if (!element) return;

      setPdfGenerating(true);

      const canvas = await html2canvas(element, {
        scale: 2, // Double resolution for clean, premium print lines
        useCORS: true,
        backgroundColor: '#ffffff', // Professional white background for official print documents
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 standard width in mm
      const pageHeight = 295; // A4 standard height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Rasta-Saathi_SOS_Incident_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error('Failed to generate high-fidelity SOS report:', err);
    } finally {
      setPdfGenerating(false);
    }
  };
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
    return () => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
    };
  }, [countdownTimer]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const triggerSOS = () => {
    setCountdownActive(true);
    setCountdownSeconds(5);
    
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCountdownActive(false);
          // Execute the actual dispatch!
          executeSOS();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    
    setCountdownTimer(timer);
  };

  const cancelSOSCountdown = () => {
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }
    setCountdownTimer(null);
    setCountdownActive(false);
    setCountdownSeconds(5);
  };

  const executeSOS = async () => {
    setSosActive(true);
    setSosTimestamp(new Date());
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

        const { hospitalSelection, policeSelection, aiGuidance, incident } = sosRes.data.data;
        if (incident && incident.ticketNumber) {
          setTicketNumber(incident.ticketNumber);
        }
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

                {countdownActive ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <div className="pulse-sos" style={{ 
                      width: '180px', height: '180px', borderRadius: '50%', 
                      background: 'rgba(239, 68, 68, 0.1)', 
                      border: '6px solid #ef4444',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)',
                      marginBottom: '30px'
                    }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#ef4444', letterSpacing: '2px', textTransform: 'uppercase' }}>DISPATCHING IN</span>
                      <span style={{ fontSize: '4.5rem', fontWeight: '900', color: '#ef4444', lineHeight: '1' }}>{countdownSeconds}</span>
                    </div>

                    <button 
                      onClick={cancelSOSCountdown}
                      className="btn"
                      style={{ 
                        padding: '16px 40px', 
                        background: '#0f172a',
                        color: '#ffffff', 
                        border: '2px solid #ef4444',
                        borderRadius: '100px',
                        fontSize: '1rem',
                        fontWeight: '900',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(239,68,68,0.15)',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#ef4444';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#0f172a';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                    >
                      CANCEL DISPATCH
                    </button>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700', marginTop: '14px', letterSpacing: '0.5px' }}>
                      Tap to cancel the alarm within the window.
                    </p>
                  </motion.div>
                ) : (
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={triggerSOS} 
                    style={{ 
                      width: '160px', height: '160px', borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', 
                      border: '10px solid rgba(239,68,68,0.2)', color: '#ffffff', 
                      cursor: 'pointer', boxShadow: '0 0 50px rgba(239,68,68,0.5)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    <Logo size={22} light />
                    <span style={{ fontSize: '1.6rem', fontWeight: '900', marginTop: '4px', color: '#ffffff' }}>SOS</span>
                  </motion.button>
                )}
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
                  <div className="glass-panel" style={{ padding: '20px', background: 'var(--bg-primary)', opacity: 0.98, border: '1.5px solid var(--border-glass)' }}>
                    {/* Top Row: Information Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: '20px', alignItems: 'center', marginBottom: hospitalLocation && victimLocation ? '16px' : '0' }}>
                      {/* Column 1: System Status */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--brand-red-glow)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {apiLoading ? <Loader2 className="animate-spin" color="#ef4444" size={20} /> : <Activity size={20} color="#ef4444" />}
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('system_status')}</div>
                          <div style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{apiLoading ? t('sync_grid') : t('dispatched_alerts')}</div>
                        </div>
                      </div>

                      {/* Column 2: Nearest Police */}
                      <div style={{ borderLeft: '1px solid var(--border-glass)', paddingLeft: '20px' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('nearest_police') || 'Nearest Police'}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#3b82f6', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                          {policeStations[0]?.name || 'Locating...'}
                        </div>
                      </div>

                      {/* Column 3: Target Trauma Center */}
                      <div style={{ borderLeft: '1px solid var(--border-glass)', paddingLeft: '20px' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('target_center')}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#10b981', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                          {selectedHospitalName || (apiLoading ? t('calculating') : 'Manual Mode')}
                        </div>
                      </div>
                    </div>

                    {/* Separator Line */}
                    {hospitalLocation && victimLocation && (
                      <div style={{ height: '1px', background: 'var(--border-glass)', marginBottom: '16px' }}></div>
                    )}

                    {/* Bottom Row: Actions */}
                    {hospitalLocation && victimLocation && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <motion.button 
                          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={downloadSosReportPDF}
                          disabled={pdfGenerating}
                          style={{ 
                            flex: 1,
                            maxWidth: '240px',
                            padding: '12px 20px', 
                            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', 
                            color: 'white', 
                            borderRadius: '10px', 
                            border: 'none',
                            fontWeight: '900', 
                            fontSize: '0.85rem', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            opacity: pdfGenerating ? 0.7 : 1
                          }}
                        >
                          {pdfGenerating ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            <FileDown size={16} />
                          )}
                          {pdfGenerating ? 'Generating...' : 'Download Report'}
                        </motion.button>

                        <motion.button 
                          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&origin=${victimLocation.lat},${victimLocation.lng}&destination=${hospitalLocation.lat},${hospitalLocation.lng}&travelmode=driving`;
                            window.open(url, '_blank');
                          }}
                          style={{ 
                            flex: 1,
                            maxWidth: '240px',
                            padding: '12px 20px', 
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                            color: 'white', 
                            borderRadius: '10px', 
                            border: 'none',
                            fontWeight: '900', 
                            fontSize: '0.85rem', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <Navigation size={16} />
                          {t('navigate')}
                        </motion.button>
                      </div>
                    )}
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
                  <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--bg-deep)', border: '1px solid var(--border-glass)', borderRadius: '12px', width: 'fit-content' }}>
                    <Loader2 className="animate-spin" size={14} color="#3b82f6" />
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)' }}>AI ANALYSIS IN PROGRESS...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <input type="text" className="form-input" placeholder={t('emergency_guidance')} style={{ flex: 1, padding: '14px 18px', fontSize: '0.95rem' }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
            <button onClick={sendMessage} className="premium-button" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={20} /></button>
          </div>
        </div>
      </div>

      {/* Hidden PDF Report Template (rendered off-screen, but present in DOM so html2canvas can capture it) */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div id="sos-pdf-report" style={{
          width: '800px',
          padding: '40px',
          background: '#ffffff', // Clean white background for official print documents
          color: '#0f172a', // Premium dark slate text for absolute legibility
          fontFamily: "'Inter', sans-serif",
          boxSizing: 'border-box',
          border: '1.5px solid #cbd5e1',
          borderRadius: '8px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Rasta-Saathi Logo on Top Left */}
              <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'system-ui, sans-serif', fontSize: '28px', fontWeight: '900', letterSpacing: '-1.5px' }}>
                <span style={{ color: '#0f172a' }}>Rasta</span>
                <span style={{ color: '#ef4444', marginLeft: '1px' }}>Saathi</span>
              </div>
              <div style={{ width: '1px', height: '32px', background: '#e2e8f0' }}></div>
              <div>
                <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '2px', fontSize: '0.65rem', textTransform: 'uppercase' }}>EMERGENCY RESPONSE GRID</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>OFFICIAL INCIDENT REPORT</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#ef4444', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', display: 'inline-block' }}>
                GRID SYNCED
              </div>
              <div style={{ fontSize: '0.75rem', color: '#0f172a', marginTop: '8px', fontWeight: '800' }}>RECEIPT NO: {ticketNumber || 'RS-PENDING'}</div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '4px', fontWeight: '700' }}>INCIDENT ID: {sessionId || 'PENDING'}</div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '35px' }}>
            
            {/* Column 1: Victim & Location */}
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontWeight: '800' }}>👤 Victim & Site Details</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Victim Name:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{user.name || 'Anonymous Victim'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Identity Profile:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{user.phone || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>GPS Location:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{victimLocation ? `${victimLocation.lat.toFixed(6)}, ${victimLocation.lng.toFixed(6)}` : 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Active Language:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a', textTransform: 'uppercase' }}>{user.language || 'EN'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Report Date:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{sosTimestamp ? sosTimestamp.toLocaleString() : new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Emergency Dispatches */}
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontWeight: '800' }}>🚑 Tactical Dispatches</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ color: '#64748b' }}>Target Trauma Center:</span>
                  <span style={{ fontWeight: '800', color: '#16a34a', fontSize: '0.95rem' }}>{selectedHospitalName || 'PENDING DISPATCH'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ color: '#64748b' }}>Assigned Police Precinct:</span>
                  <span style={{ fontWeight: '800', color: '#2563eb', fontSize: '0.95rem' }}>{policeStations[0]?.name || 'PENDING DISPATCH'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '4px' }}>
                  <span style={{ color: '#64748b' }}>Hospital ETA:</span>
                  <span style={{ fontWeight: '700', color: '#d97706' }}>
                    {hospitalLocation ? 'Dispatched' : 'Calculating...'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Section: Medical Guidance */}
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontWeight: '900' }}>🧠 AI MEDIC CORE FIRST AID ADVISORY</h3>
            
            <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#334155' }}>
              {messages.filter(m => m.role === 'bot').slice(1).map((m, idx) => (
                <div key={idx} style={{ marginBottom: '16px', background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #ef4444' }}>
                  <div style={{ color: '#ef4444', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Advisory Step {idx + 1}</div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                </div>
              ))}
              {messages.filter(m => m.role === 'bot').slice(1).length === 0 && (
                <div style={{ fontStyle: 'italic', color: '#64748b' }}>No emergency chat messages generated yet. Please refer to standard Golden Hour procedures.</div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '20px', fontSize: '0.75rem', color: '#64748b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
              <span style={{ fontWeight: '700', letterSpacing: '1px', color: '#0f172a' }}>RASTA-SAATHI SECURE EMERGRID</span>
            </div>
            <div>
              <span>REPORT GENERATED AUTOMATICALLY BY SECURE GATEWAY</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
