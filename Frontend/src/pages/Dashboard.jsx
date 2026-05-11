import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, Navigation, MessageCircle, Send, MapPin, Shield, Zap, AlertTriangle, Radio, Hospital, Users } from 'lucide-react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Logo from '../components/Logo';

const Marker = ({ text, type }) => (
  <motion.div 
    initial={{ scale: 0, y: 20 }} 
    animate={{ scale: 1, y: 0 }} 
    style={{ 
      color: 'white', 
      background: type === 'victim' ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
      padding: '10px 18px', borderRadius: '24px', display: 'inline-flex', 
      alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '13px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.2)',
      transform: 'translate(-50%, -100%)', position: 'absolute',
      whiteSpace: 'nowrap'
    }}
  >
    {type === 'victim' ? <Radio size={16} className="pulse-sos" /> : <Hospital size={16} />} 
    {text}
  </motion.div>
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
    setMessages(prev => [...prev, { role: 'bot', text: 'INITIATING SOS PROTOCOL: Establishing secure medical grid and detecting geospatial coordinates...' }]);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const loc = { lat: latitude, lng: longitude };
      setVictimLocation(loc);
      setMapCenter(loc);

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
        }

        if (aiGuidance) {
          setSessionId(aiGuidance.sessionId);
          setMessages(prev => [...prev, { role: 'bot', text: `HOSPITAL ASSIGNED: ${nearest?.name || 'Nearest Trauma Center'}.\n\nAI TRIAGE GUIDANCE:\n${aiGuidance.guidance?.answer || 'Follow standard first-aid protocols.'}` }]);
        }
      } catch (err) {
        console.error('SOS Error:', err);
      }
    }, (err) => {
      setMessages(prev => [...prev, { role: 'bot', text: 'CRITICAL ERROR: Geolocation denied. Please enable GPS for emergency routing.' }]);
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
          injuryType: 'General inquiry',
          severityLevel: 'MEDIUM',
          language: 'en'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        currentSessionId = initRes.data?.data?.sessionId;
        setSessionId(currentSessionId);
      }

      const res = await axios.post(`${API_BASE_URL}/firstaid/followup`, {
        sessionId: currentSessionId,
        question: userMsg
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(prev => [...prev, { role: 'bot', text: res.data.data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'RastaSaathi Grid Timeout. Retrying...' }]);
    } finally {
      setLoadingMsg(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ paddingTop: '100px', paddingBottom: '60px' }}
    >
      <div className="dashboard-grid">
        <style>{`
          .dashboard-grid { display: grid; grid-template-columns: 1fr 450px; gap: 40px; }
          @media (max-width: 1200px) { .dashboard-grid { grid-template-columns: 1fr; } }
          .sos-ring { position: absolute; border: 2px solid #ef4444; border-radius: 50%; opacity: 0; animation: sos-expand 3s infinite; }
          @keyframes sos-expand {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
          }
        `}</style>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', minHeight: '650px', position: 'relative', display: 'flex', flexDirection: 'column', background: 'rgba(2, 6, 23, 0.4)' }}>
            {!sosActive ? (
              <div style={{ padding: '80px 40px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: '40px' }}>
                  <div style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '16px' }}>SECURE EMERGENCY GRID</div>
                  <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Ready for Dispatch.</h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                    Your RastaSaathi terminal is active. Tap the SOS trigger to initialize millisecond-precision rescue coordination.
                  </p>
                </motion.div>

                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '300px', height: '300px' }}>
                  <div className="sos-ring" style={{ width: '100px', height: '100px', animationDelay: '0s' }}></div>
                  <div className="sos-ring" style={{ width: '100px', height: '100px', animationDelay: '1s' }}></div>
                  <div className="sos-ring" style={{ width: '100px', height: '100px', animationDelay: '2s' }}></div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerSOS}
                    style={{
                      width: '180px', height: '180px', 
                      borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
                      border: '10px solid rgba(239, 68, 68, 0.2)', color: 'white', display: 'flex', flexDirection: 'column', 
                      alignItems: 'center', justifyContent: 'center', cursor: 'pointer', 
                      boxShadow: '0 0 80px rgba(239, 68, 68, 0.6)', zIndex: 10
                    }}
                  >
                    <Logo size={24} />
                    <span style={{ fontSize: '1.8rem', fontWeight: '900', marginTop: '4px', letterSpacing: '2px' }}>SOS</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ height: '100%', width: '100%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    center={mapCenter}
                    defaultZoom={14}
                    options={{
                      styles: [
                        { "elementType": "geometry", "stylers": [{ "color": "#0f172a" }] },
                        { "elementType": "labels.text.fill", "stylers": [{ "color": "#94a3b8" }] },
                        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
                        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#020617" }] }
                      ],
                      disableDefaultUI: true
                    }}
                  >
                    {victimLocation && <Marker lat={victimLocation.lat} lng={victimLocation.lng} text="EMERGENCY SITE" type="victim" />}
                    {hospitalLocation && <Marker lat={hospitalLocation.lat} lng={hospitalLocation.lng} text={selectedHospitalName} type="hospital" />}
                  </GoogleMapReact>
                </div>

                {/* Overlaid UI */}
                <div style={{ position: 'absolute', top: '30px', left: '30px', right: '30px', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
                   <div className="glass-panel" style={{ padding: '12px 24px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '100px' }}>
                      <Radio size={18} className="pulse-sos" />
                      <span style={{ fontWeight: '900', fontSize: '0.8rem', letterSpacing: '1px' }}>SOS ACTIVE</span>
                   </div>
                   <div className="glass-panel" style={{ padding: '12px 24px', background: 'rgba(2, 6, 23, 0.8)', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '100px' }}>
                      <Navigation size={18} />
                      <span style={{ fontWeight: '800', fontSize: '0.8rem' }}>Geospatial Triage</span>
                   </div>
                </div>

                <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
                  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-panel" style={{ padding: '32px', background: 'rgba(2, 6, 23, 0.95)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                      <div style={{ width: '64px', height: '64px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Activity size={32} color="#ef4444" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Protocol Status</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: '900' }}>Hospital Alerted & Dispatching.</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Target Center</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#3b82f6' }}>{selectedHospitalName || 'Routing...'}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar AI Medic */}
        <div className="glass-panel sidebar-chat" style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '700px', background: 'rgba(2, 6, 23, 0.6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '24px', marginBottom: '24px' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap color="#10b981" fill="#10b981" size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '900' }}>AI Medic</h3>
              <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} className="pulse-sos"></div>
                Real-time Triage Active
              </div>
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '12px' }}>
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ 
                    background: msg.role === 'user' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.04)', 
                    border: msg.role === 'user' ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(255,255,255,0.08)',
                    padding: '20px', 
                    borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px', 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', 
                    maxWidth: '90%' 
                  }}
                >
                  <p style={{ fontSize: '1.05rem', whiteSpace: 'pre-line', lineHeight: '1.6', fontWeight: msg.role === 'user' ? '600' : '500' }}>{msg.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            {loadingMsg && (
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.04)', borderRadius: '24px 24px 24px 4px', alignSelf: 'flex-start', display: 'flex', gap: '8px' }}>
                <div className="pulse-sos" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
                <div className="pulse-sos" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animationDelay: '0.2s' }}></div>
                <div className="pulse-sos" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Describe injuries or situation..." 
              style={{ background: 'rgba(0,0,0,0.4)', flex: 1, borderRadius: '20px' }} 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} disabled={loadingMsg} className="premium-button" style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}>
              <Send size={24} />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
