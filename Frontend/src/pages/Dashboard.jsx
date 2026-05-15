import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, Navigation, MessageCircle, Send, MapPin, Shield, Zap, AlertTriangle, Radio, Hospital, Users, Loader2, FileText, Wrench } from 'lucide-react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Logo from '../components/Logo';

// Professional Scale Marker
const Marker = ({ text, type }) => {
  const getColors = () => {
    switch (type) {
      case 'victim': return { bg: '#ef4444', icon: <Radio size={14} className="pulse-sos" /> };
      case 'police': return { bg: '#3b82f6', icon: <Shield size={14} /> };
      case 'rescue': return { bg: '#f59e0b', icon: <Wrench size={14} /> };
      default: return { bg: '#10b981', icon: <Hospital size={14} /> };
    }
  };
  
  const colors = getColors();

  return (
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
          background: colors.bg, 
          padding: '6px 12px', borderRadius: '12px', display: 'inline-flex', 
          alignItems: 'center', gap: '6px', fontWeight: '800', fontSize: '11px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1.5px solid white',
          whiteSpace: 'nowrap'
        }}
      >
        {colors.icon} 
        {text}
      </motion.div>
      <div style={{ 
        width: '8px', height: '8px', background: colors.bg, 
        borderRadius: '50%', border: '1.5px solid white', margin: '-4px auto 0' 
      }}></div>
    </div>
  );
};

import { useLanguage } from '../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const { t } = useLanguage();
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
  const [rescueServices, setRescueServices] = useState([]);
  const [reportUrl, setReportUrl] = useState(null);
  const [activeFilters, setActiveFilters] = useState(['hospital', 'police', 'rescue']);

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

          const { hospitalSelection, policeSelection, rescueSelection, aiGuidance } = sosRes.data.data;
          const nearest = hospitalSelection?.[0]?.hospital;

          if (nearest) {
            const hLoc = { lat: nearest.location.coordinates[1], lng: nearest.location.coordinates[0] };
            setHospitalLocation(hLoc);
            setSelectedHospitalName(nearest.name);
            setPoliceStations(policeSelection || []);
            setRescueServices(rescueSelection || []);
            setMapCenter({ lat: (latitude + hLoc.lat) / 2, lng: (longitude + hLoc.lng) / 2 });
            
            setMessages(prev => [...prev, { 
              role: 'bot', 
              text: `${t('sos_success')}\n\n${t('contacts_notified')}\n${t('nearest_hospital')} ${nearest.name}\n${t('eta')} ${hospitalSelection[0].etaSeconds ? Math.round(hospitalSelection[0].etaSeconds / 60) + ' min' : t('calculating')}` 
            }]);
          } else {
            setMessages(prev => [...prev, { role: 'bot', text: t('no_hospitals') }]);
          }

          if (aiGuidance) {
            setSessionId(aiGuidance.sessionId);
            setMessages(prev => [...prev, { role: 'bot', text: `${t('ai_activated')}\n${aiGuidance.guidance?.answer || 'Stay calm. Help is on the way.'}` }]);
          }

          if (sosRes.data.data.report) {
            setReportUrl(sosRes.data.data.report.publicUrl);
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
          .dashboard-grid { display: grid; grid-template-columns: 1fr 400px; gap: 30px; }
          @media (max-width: 1100px) { .dashboard-grid { grid-template-columns: 1fr; } }
          .pulse-sos { animation: pulse-red 2s infinite; }
          @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        `}</style>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', minHeight: '550px', position: 'relative', display: 'flex', flexDirection: 'column', background: '#020617' }}>
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
                    styles: [
                      { "elementType": "geometry", "stylers": [{ "color": "#0f172a" }] },
                      { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
                      { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
                      { "featureType": "transit", "stylers": [{ "visibility": "off" }] },
                      { "elementType": "labels.text.fill", "stylers": [{ "color": "#4b5563" }] },
                      { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }
                    ], 
                    disableDefaultUI: true 
                  }}
                >
                  {victimLocation && <Marker lat={victimLocation.lat} lng={victimLocation.lng} text="EMERGENCY SITE" type="victim" />}
                  {hospitalLocation && activeFilters.includes('hospital') && <Marker lat={hospitalLocation.lat} lng={hospitalLocation.lng} text={selectedHospitalName} type="hospital" />}
                  {activeFilters.includes('police') && policeStations.map((p, i) => (
                    <Marker key={i} lat={p.location.coordinates[1]} lng={p.location.coordinates[0]} text={p.name} type="police" />
                  ))}
                  {activeFilters.includes('rescue') && rescueServices.map((r, i) => (
                    <Marker key={i} lat={r.location.coordinates[1]} lng={r.location.coordinates[0]} text={r.name} type="rescue" />
                  ))}
                </GoogleMapReact>

                <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                   <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ padding: '10px 20px', background: '#ef4444', color: 'white', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Radio size={16} className="pulse-sos" /> {t('sos_active')}
                    </div>
                    <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.9)', borderRadius: '100px', padding: '5px', gap: '5px' }}>
                      {[
                        { id: 'hospital', icon: <Hospital size={14} />, label: 'Hospitals' },
                        { id: 'police', icon: <Shield size={14} />, label: 'Police' },
                        { id: 'rescue', icon: <Wrench size={14} />, label: 'Towing' }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setActiveFilters(prev => prev.includes(f.id) ? prev.filter(x => x !== f.id) : [...prev, f.id])}
                          style={{
                            border: 'none', background: activeFilters.includes(f.id) ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: activeFilters.includes(f.id) ? 'white' : 'rgba(255,255,255,0.4)',
                            padding: '5px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '6px'
                          }}
                        >
                          {f.icon} {f.label}
                        </button>
                      ))}
                    </div>
                   </div>
                   <div style={{ padding: '10px 20px', background: 'rgba(15, 23, 42, 0.9)', color: 'white', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '800' }}>{t('geospatial_grid')}</div>
                </div>

                <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px' }}>
                  <div className="glass-panel" style={{ padding: '24px', background: 'rgba(2, 6, 23, 0.95)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {apiLoading ? <Loader2 className="animate-spin" color="#ef4444" /> : <Activity size={24} color="#ef4444" />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('system_status')}</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>{apiLoading ? t('sync_grid') : t('dispatched_alerts')}</div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('target_center')}</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#3b82f6' }}>{selectedHospitalName || (apiLoading ? t('calculating') : 'Manual Mode')}</div>
                        {reportUrl && (
                          <a 
                            href={`${API_BASE_URL.replace('/api', '')}${reportUrl}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                              fontSize: '0.7rem', color: '#10b981', textDecoration: 'none', 
                              display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '800' 
                            }}
                          >
                            <FileText size={12} /> DOWNLOAD REPORT
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '20px', pt: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '15px' }}>
                      {policeStations.length > 0 && (
                        <button className="btn btn-glass" style={{ flex: 1, fontSize: '0.75rem', gap: '8px' }}>
                          <Shield size={14} color="#3b82f6" /> {t('call_police') || 'Call Police'}
                        </button>
                      )}
                      {rescueServices.length > 0 && (
                        <button className="btn btn-glass" style={{ flex: 1, fontSize: '0.75rem', gap: '8px' }}>
                          <Wrench size={14} color="#f59e0b" /> {t('call_towing') || 'Call Towing'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel sidebar-chat" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '600px', background: 'rgba(2, 6, 23, 0.6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px', marginBottom: '20px' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap color="#10b981" fill="#10b981" size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900' }}>{t('ai_medic')}</h3>
          </div>
          
          <div 
            ref={chatContainerRef}
            style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '8px' }}
          >
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} style={{ background: msg.role === 'user' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '16px', borderRadius: '18px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
                  <p style={{ fontSize: '1rem', whiteSpace: 'pre-line', lineHeight: '1.5' }}>{msg.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
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
