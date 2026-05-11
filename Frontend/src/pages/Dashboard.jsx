import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, Navigation, MessageCircle, Send, MapPin, Shield, Zap, AlertTriangle, Radio, Hospital, Users, Loader2 } from 'lucide-react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Logo from '../components/Logo';

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [sosActive, setSosActive] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'RastaSaathi AI Medic activated. I am monitoring your grid. Trigger SOS for immediate medical coordination.' }
  ]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Map State
  const [mapCenter, setMapCenter] = useState({ lat: 17.3850, lng: 78.4867 });
  const [victimLocation, setVictimLocation] = useState(null);
  const [hospitalLocation, setHospitalLocation] = useState(null);
  const [selectedHospitalName, setSelectedHospitalName] = useState('');

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const triggerSOS = async () => {
    setSosActive(true);
    setApiLoading(true);
    setMessages(prev => [...prev, { role: 'bot', text: 'INITIATING EMERGENCY PROTOCOL: Acquiring GPS telemetry...' }]);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const loc = { lat: latitude, lng: longitude };
      setVictimLocation(loc);
      setMapCenter(loc);

      setMessages(prev => [...prev, { role: 'bot', text: `📍 GPS COORDINATES ACQUIRED: [${latitude.toFixed(4)}, ${longitude.toFixed(4)}]\nSynchronizing with national medical grid...` }]);

      try {
        const token = localStorage.getItem('token');
        const sosRes = await axios.post(`${API_BASE_URL}/sos/trigger`, {
          lat: latitude,
          lng: longitude,
          injuryType: 'Traffic collision trauma'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { hospitalSelection, aiGuidance } = sosRes.data.data;
        const nearest = hospitalSelection?.[0]?.hospital;

        if (nearest) {
          const hLoc = { lat: nearest.location.coordinates[1], lng: nearest.location.coordinates[0] };
          setHospitalLocation(hLoc);
          setSelectedHospitalName(nearest.name);
          setMapCenter({ lat: (latitude + hLoc.lat) / 2, lng: (longitude + hLoc.lng) / 2 });
          
          setMessages(prev => [...prev, { 
            role: 'bot', 
            text: `✅ SOS DISPATCHED SUCCESSFULLY!\n\n📲 WhatsApp alerts sent to emergency contacts.\n🏥 NEAREST HOSPITAL: ${nearest.name}\n⏳ ETA: ${hospitalSelection[0].etaSeconds ? Math.round(hospitalSelection[0].etaSeconds / 60) + ' min' : 'Calculating...'}` 
          }]);
        } else {
          setMessages(prev => [...prev, { role: 'bot', text: '⚠️ ALERT: SOS triggered, but no hospitals found in immediate range. Alerts have still been sent to responders.' }]);
        }

        if (aiGuidance) {
          setSessionId(aiGuidance.sessionId);
          setMessages(prev => [...prev, { role: 'bot', text: `👨‍⚕️ AI GUIDANCE ACTIVATED:\n${aiGuidance.guidance?.answer || 'Stay calm. Help is on the way.'}` }]);
        }
      } catch (err) {
        console.error('SOS Error:', err);
        const errMsg = err.response?.data?.error?.message || 'Network grid unreachable.';
        setMessages(prev => [...prev, { role: 'bot', text: `❌ CRITICAL ERROR: ${errMsg}\nPlease call 108/112 immediately.` }]);
      } finally {
        setApiLoading(false);
      }
    }, (err) => {
      setApiLoading(false);
      setMessages(prev => [...prev, { role: 'bot', text: '❌ GEOLOCATION DENIED: RastaSaathi requires GPS to route to the nearest hospital. Please enable location services.' }]);
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
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
                  <div style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '2px', fontSize: '0.7rem', marginBottom: '12px' }}>SECURE EMERGENCY TERMINAL</div>
                  <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', fontWeight: '900' }}>Ready for Dispatch.</h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '450px', margin: '0 auto' }}>
                    Trigger the SOS for instant geospatial triage and emergency alerts.
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
                  {hospitalLocation && <Marker lat={hospitalLocation.lat} lng={hospitalLocation.lng} text={selectedHospitalName} type="hospital" />}
                </GoogleMapReact>

                <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
                   <div style={{ padding: '10px 20px', background: '#ef4444', color: 'white', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Radio size={16} className="pulse-sos" /> SOS ACTIVE
                   </div>
                   <div style={{ padding: '10px 20px', background: 'rgba(15, 23, 42, 0.9)', color: 'white', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '800' }}>Geospatial Grid</div>
                </div>

                <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px' }}>
                  <div className="glass-panel" style={{ padding: '24px', background: 'rgba(2, 6, 23, 0.95)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {apiLoading ? <Loader2 className="animate-spin" color="#ef4444" /> : <Activity size={24} color="#ef4444" />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>System Status</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>{apiLoading ? 'Synchronizing Grid...' : 'Dispatched Alerts.'}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Target Center</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#3b82f6' }}>{selectedHospitalName || (apiLoading ? 'Calculating...' : 'Manual Mode')}</div>
                      </div>
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
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900' }}>AI Medic</h3>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '8px' }}>
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
            <input type="text" className="form-input" placeholder="Emergency guidance..." style={{ background: 'rgba(0,0,0,0.4)', flex: 1, padding: '14px 18px', fontSize: '0.95rem' }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
            <button onClick={sendMessage} className="premium-button" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={20} /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
