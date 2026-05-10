import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Activity, Navigation, MessageCircle, Send, MapPin } from 'lucide-react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text, type }) => (
  <motion.div 
    initial={{ scale: 0 }} 
    animate={{ scale: 1 }} 
    style={{ 
      color: 'white', background: type === 'victim' ? '#ef4444' : '#3b82f6', 
      padding: '8px 12px', borderRadius: '20px', display: 'inline-flex', 
      alignItems: 'center', gap: '5px', fontWeight: '700', fontSize: '12px',
      boxShadow: '0 0 15px rgba(0,0,0,0.5)', border: '2px solid white',
      transform: 'translate(-50%, -100%)', position: 'absolute'
    }}
  >
    <MapPin size={14} /> {text}
  </motion.div>
);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [sosActive, setSosActive] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello, I am the RastaSaathi AI Medic. How can I assist you with first-aid instructions while help arrives?' }
  ]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const chatEndRef = useRef(null);

  // Map State
  const [mapCenter, setMapCenter] = useState({ lat: 17.3850, lng: 78.4867 }); // Default Hyderabad
  const [victimLocation, setVictimLocation] = useState(null);
  const [hospitalLocation, setHospitalLocation] = useState(null);
  const [selectedHospitalName, setSelectedHospitalName] = useState('');

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('roadsos_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const triggerSOS = async () => {
    setSosActive(true);
    setMessages(prev => [...prev, { role: 'bot', text: 'EMERGENCY DETECTED: Detecting your location and finding the nearest trauma center...' }]);

    // 1. Get Location
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const loc = { lat: latitude, lng: longitude };
      setVictimLocation(loc);
      setMapCenter(loc);

      try {
        const token = localStorage.getItem('roadsos_token');
        
        // 2. Unified SOS Trigger (Handles Hospital, AI, and WhatsApp Alerts)
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
          const hLoc = { 
            lat: nearest.location.coordinates[1], 
            lng: nearest.location.coordinates[0] 
          };
          setHospitalLocation(hLoc);
          setSelectedHospitalName(nearest.name);
          setMapCenter({
            lat: (latitude + hLoc.lat) / 2,
            lng: (longitude + hLoc.lng) / 2
          });
        }

        if (aiGuidance) {
          setSessionId(aiGuidance.sessionId);
          setMessages(prev => [...prev, { role: 'bot', text: `Hospital Found: ${nearest?.name || 'Nearest Center'}. \n\n${aiGuidance.guidance?.answer || 'Follow the instructions below.'}` }]);
        }
      } catch (err) {
        console.error('SOS Logic Error:', err);
      }
    }, (err) => {
      console.error('Geolocation Error:', err);
      setMessages(prev => [...prev, { role: 'bot', text: 'Could not detect your location. Please ensure GPS is enabled.' }]);
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoadingMsg(true);

    try {
      const token = localStorage.getItem('roadsos_token');
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
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting.' }]);
    } finally {
      setLoadingMsg(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
      style={{ paddingTop: '20px', paddingBottom: '40px' }}
    >
      <div className="dashboard-grid">
        <style>{`
          .dashboard-grid {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 20px;
          }
          @media (max-width: 1024px) {
            .dashboard-grid {
              grid-template-columns: 1fr;
            }
            .sidebar-chat {
              height: 500px !important;
            }
          }
        `}</style>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', position: 'relative', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
            {!sosActive ? (
              <div style={{ padding: '40px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ marginBottom: '16px' }}>Emergency Dashboard</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '400px' }}>
                  Tap the button below in case of an accident. We will instantly find the nearest hospital and dispatch alerts.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerSOS}
                  style={{
                    width: '180px', height: '180px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    border: '8px solid rgba(239, 68, 68, 0.3)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 50px rgba(239, 68, 68, 0.5)'
                  }}
                >
                  <ShieldAlert size={50} style={{ marginBottom: '8px' }} />
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800' }}>SOS</span>
                </motion.button>
              </div>
            ) : (
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ height: '100%', width: '100%', background: '#1e293b' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    center={mapCenter}
                    defaultZoom={13}
                    options={{
                      styles: [
                        { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
                        { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
                        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
                        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] }
                      ]
                    }}
                  >
                    {victimLocation && <Marker lat={victimLocation.lat} lng={victimLocation.lng} text="YOU" type="victim" />}
                    {hospitalLocation && <Marker lat={hospitalLocation.lat} lng={hospitalLocation.lng} text={selectedHospitalName} type="hospital" />}
                  </GoogleMapReact>
                </div>

                {/* Overlaid Status Card */}
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }}
                    className="glass-panel" 
                    style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(2, 6, 23, 0.9)' }}
                  >
                    <div style={{ animation: 'pulse-ring 2s infinite', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', padding: '10px' }}>
                      <Activity size={32} color="#ef4444" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="text-gradient-red" style={{ fontWeight: '800', fontSize: '1.2rem' }}>SOS ACTIVE</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Dispatching WhatsApp Alerts...</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Nearest Hospital</div>
                      <div style={{ fontWeight: '600', color: '#3b82f6' }}>{selectedHospitalName || 'Searching...'}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar / AI Chatbot */}
        <div className="glass-panel sidebar-chat" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px', marginBottom: '16px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '50%' }}>
              <MessageCircle color="#10b981" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>AI Medic Assistant</h3>
              <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
                Online
              </div>
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '8px' }}>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  background: msg.role === 'user' ? 'rgba(59, 130, 246, 0.2)' : (msg.text.includes('EMERGENCY') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)'), 
                  border: msg.role === 'user' ? '1px solid rgba(59, 130, 246, 0.3)' : (msg.text.includes('EMERGENCY') ? '1px solid rgba(239, 68, 68, 0.2)' : 'none'),
                  padding: '12px 16px', 
                  borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0', 
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', 
                  maxWidth: '85%' 
                }}
              >
                <p style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{msg.text}</p>
              </motion.div>
            ))}
            {loadingMsg && (
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '12px 12px 12px 0', alignSelf: 'flex-start' }}>
                <span style={{ animation: 'pulse-ring 1.5s infinite', display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Ask for first aid..." 
              style={{ background: 'rgba(0,0,0,0.3)', flex: 1 }} 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} disabled={loadingMsg} className="btn btn-primary" style={{ padding: '0 16px', opacity: loadingMsg ? 0.7 : 1 }}>
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
