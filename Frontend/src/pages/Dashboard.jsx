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
const Marker = ({ text, type, style }) => {
  let bgColor = '#3b82f6';
  let IconComponent = <Hospital size={14} />;

  if (type === 'victim') {
    bgColor = '#ef4444';
    IconComponent = <Radio size={14} className="pulse-sos" />;
  } else if (type === 'ambulance') {
    bgColor = '#f59e0b';
    IconComponent = <Activity size={14} />;
  } else if (type === 'police') {
    bgColor = '#2563eb'; // Deep Blue / Royal Blue for Police
    IconComponent = <Shield size={14} />;
  } else if (type === 'hospital') {
    bgColor = '#10b981'; // Green for Hospital
    IconComponent = <Hospital size={14} />;
  }

  return (
    <div style={{
      ...style,
      position: 'absolute',
      transform: 'translate(-50%, -100%)',
      pointerEvents: 'none',
      zIndex: type === 'victim' ? 100 : type === 'police' ? 60 : 50
    }}>
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        style={{ 
          color: 'white', 
          background: bgColor, 
          padding: '6px 12px', borderRadius: '12px', display: 'inline-flex', 
          alignItems: 'center', gap: '6px', fontWeight: '800', fontSize: '11px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1.5px solid white',
          whiteSpace: 'nowrap'
        }}
      >
        {IconComponent} 
        {text}
      </motion.div>
      <div style={{ 
        width: '8px', height: '8px', background: bgColor, 
        borderRadius: '50%', border: '1.5px solid white', margin: '-4px auto 0' 
      }}></div>
    </div>
  );
};

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


const getDistanceAndEta = (locA, locB) => {
  if (!locA || !locB) return null;
  const lat1 = locA.lat;
  const lon1 = locA.lng;
  const lat2 = locB.lat;
  const lon2 = locB.lng;

  const R = 6371; // radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // in km
  
  // Estimate driving time at 30 km/h (2 minutes per km) + 1 min base delay
  const etaMinutes = Math.max(1, Math.round(distance * 2 + 1));
  return {
    distanceStr: `${distance.toFixed(1)} km`,
    etaStr: `${etaMinutes} min`
  };
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
  const [customEmergencyMessage, setCustomEmergencyMessage] = useState('');
  
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
      const pageHeight = 297; // A4 standard height in mm
      const marginTop = 15; // Top margin in mm
      const marginBottom = 15; // Bottom margin in mm
      const printableHeight = pageHeight - marginTop - marginBottom; // 267 mm
      
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let pageIndex = 0;

      while (heightLeft > 0) {
        if (pageIndex > 0) {
          pdf.addPage();
        }
        
        const drawY = marginTop - (pageIndex * printableHeight);
        pdf.addImage(imgData, 'JPEG', 0, drawY, imgWidth, imgHeight);
        
        // Draw white masks to maintain clean margins and prevent bleed-through
        pdf.setFillColor(255, 255, 255);
        pdf.setDrawColor(255, 255, 255); // Force draw/stroke color to white to hide any outlines!
        // Top margin mask
        pdf.rect(0, 0, imgWidth, marginTop, 'F');
        // Bottom margin mask
        pdf.rect(0, pageHeight - marginBottom, imgWidth, marginBottom, 'F');
        
        heightLeft -= printableHeight;
        pageIndex++;
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
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);
  const [policeStations, setPoliceStations] = useState([]);
  const [selectedHospitalName, setSelectedHospitalName] = useState('');
  const [selectedAmbulanceName, setSelectedAmbulanceName] = useState('');

  const mapContainerRef = useRef(null);
  const googleMapRef = useRef(null);
  const googleMarkersRef = useRef([]);
  const directionsRendererRef = useRef(null);

  const getMarkerIconSvg = (type) => {
    if (type === 'victim') {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M19 5a10 10 0 0 1 0 14M7.8 16.2a6 6 0 0 1 0-8.4M5 19A10 10 0 0 1 5 5"/></svg>`;
    } else if (type === 'ambulance') {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
    } else if (type === 'police') {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/></svg>`;
    } else if (type === 'hospital') {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12M6 12h12M18 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2z"/></svg>`;
    }
    return '';
  };

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const mapInitRef = useRef(false);

  // Load and initialize Google Maps dynamically
  useEffect(() => {
    if (!mapContainerRef.current) {
      console.log("[Google Map] Container element not mounted yet.");
      return;
    }

    const initMap = () => {
      if (mapInitRef.current) {
        console.log("[Google Map] Already initialized. Skipping duplicate init.");
        return;
      }
      mapInitRef.current = true;
      console.log("[Google Map] Initializing new Google Map instance at center:", mapCenter);
      const isDark = theme === 'dark';
      
      const darkStyles = [
        { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
        { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#cbd5e1" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0f172a" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#334155" }] },
        { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1e293b" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#020617" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
      ];

      const mapOptions = {
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        zoom: 14,
        disableDefaultUI: true,
        styles: isDark ? darkStyles : [],
      };

      try {
        const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);
        googleMapRef.current = map;
        console.log("[Google Map] Map object created successfully:", map);

        // Directions render setup to draw premium route overlays
        directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
          map: map,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#ef4444",
            strokeOpacity: 0.85,
            strokeWeight: 4
          }
        });
        console.log("[Google Map] Directions renderer initialized.");
      } catch (err) {
        console.error("[Google Map] Error creating Map instance:", err);
      }
    };

    if (window.google && window.google.maps) {
      console.log("[Google Map] Google Maps API already loaded in window. Initializing map.");
      initMap();
    } else {
      console.log("[Google Map] Google Maps API not present on window. Creating script tag...");
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("[Google Map] Script loaded successfully. Calling initMap.");
        initMap();
      };
      script.onerror = (err) => {
        console.error("[Google Map] Script failed to load:", err);
      };
      document.head.appendChild(script);
    }
  }, [theme]);

  // Update Markers & Directions
  useEffect(() => {
    const map = googleMapRef.current;
    if (!map || !window.google || !window.google.maps) return;

    // Define CustomOverlay class if it doesn't exist
    if (!window.CustomOverlay) {
      window.CustomOverlay = class extends window.google.maps.OverlayView {
        constructor(position, element, map) {
          super();
          this.position = position;
          this.element = element;
          this.element.style.position = 'absolute';
          this.element.style.transform = 'translate(-50%, -50%)';
          this.setMap(map);
        }
        onAdd() {
          const pane = this.getPanes().overlayMouseTarget;
          pane.appendChild(this.element);
        }
        draw() {
          const projection = this.getProjection();
          if (!projection) return;
          const point = projection.fromLatLngToDivPixel(new window.google.maps.LatLng(this.position.lat, this.position.lng));
          if (point) {
            this.element.style.left = point.x + 'px';
            this.element.style.top = point.y + 'px';
          }
        }
        onRemove() {
          if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
        }
      };
    }

    // Clear old overlays
    googleMarkersRef.current.forEach(overlay => overlay.setMap(null));
    googleMarkersRef.current = [];

    const bounds = new window.google.maps.LatLngBounds();

    const addGoogleMarker = (lat, lng, title, type) => {
      const position = { lat, lng };
      
      const div = document.createElement('div');
      div.className = `leaflet-custom-marker type-${type}`;
      div.innerHTML = `
        <div class="marker-glowing-pulse"></div>
        <div class="marker-icon-circle">
          ${getMarkerIconSvg(type)}
        </div>
        <div class="marker-label">${title}</div>
      `;
      
      const overlay = new window.CustomOverlay(position, div, map);
      googleMarkersRef.current.push(overlay);
      bounds.extend(position);
    };

    if (victimLocation) {
      addGoogleMarker(victimLocation.lat, victimLocation.lng, "EMERGENCY SITE", "victim");
    }
    if (hospitalLocation) {
      addGoogleMarker(hospitalLocation.lat, hospitalLocation.lng, selectedHospitalName, "hospital");
    }
    if (ambulanceLocation) {
      addGoogleMarker(ambulanceLocation.lat, ambulanceLocation.lng, selectedAmbulanceName, "ambulance");
    }
    policeStations.slice(0, 1).forEach(p => {
      if (p.location && p.location.coordinates) {
        addGoogleMarker(p.location.coordinates[1], p.location.coordinates[0], p.name, "police");
      }
    });

    // Draw route path to Hospital
    if (victimLocation && hospitalLocation && directionsRendererRef.current) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route({
        origin: { lat: victimLocation.lat, lng: victimLocation.lng },
        destination: { lat: hospitalLocation.lat, lng: hospitalLocation.lng },
        travelMode: window.google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRendererRef.current.setDirections(result);
        }
      });
    }

    // Auto fit map bounds
    if (victimLocation) {
      map.fitBounds(bounds);
      
      // Pad map center slightly down to clear HUD overlap
      const listener = window.google.maps.event.addListener(map, "idle", () => {
        map.panBy(0, 80);
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [victimLocation, hospitalLocation, ambulanceLocation, policeStations, selectedHospitalName, selectedAmbulanceName]);
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
          injuryType: 'Traffic collision trauma',
          message: customEmergencyMessage
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { hospitalSelection, policeSelection, aiGuidance, incident } = sosRes.data.data;
        if (incident && incident.ticketNumber) {
          setTicketNumber(sosRes.data.data.incident?.ticketNumber || '');
        }
        const hs = sosRes.data.data.hospitalSelection;
        if (hs && hs.length > 0) {
          setHospitalLocation({ lat: hs[0].hospital.location.coordinates[1], lng: hs[0].hospital.location.coordinates[0] });
          setSelectedHospitalName(hs[0].hospital.name);
        }
        const as = sosRes.data.data.ambulanceSelection;
        if (as && as.ambulance) {
          setAmbulanceLocation({ lat: as.ambulance.location.coordinates[1], lng: as.ambulance.location.coordinates[0] });
          setSelectedAmbulanceName(as.ambulance.name);
        }
        setPoliceStations(sosRes.data.data.policeSelection || []);
        
        const nearest = hospitalSelection?.[0]?.hospital;
        if (nearest) {
          const hLoc = { lat: nearest.location.coordinates[1], lng: nearest.location.coordinates[0] };
          setMapCenter({ lat: (latitude + hLoc.lat) / 2, lng: (longitude + hLoc.lng) / 2 });
          
          let botMessage = `${t('sos_success')}\n\n${t('contacts_notified')}\n${t('nearest_hospital')} ${nearest.name}`;
          
          if (policeSelection && policeSelection.length > 0) {
            botMessage += `\n🚓 ${t('nearest_police')} ${policeSelection[0].name}`;
          }
          if (as && as.ambulance) {
            botMessage += `\n🚑 Ambulance: ${as.ambulance.name}`;
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

  const policeCoordinates = policeStations[0]?.location?.coordinates;
  const policeLoc = policeCoordinates ? { lat: policeCoordinates[1], lng: policeCoordinates[0] } : null;

  const policeDistEta = getDistanceAndEta(victimLocation, policeLoc);
  const hospitalDistEta = getDistanceAndEta(victimLocation, hospitalLocation);
  const ambulanceDistEta = getDistanceAndEta(victimLocation, ambulanceLocation);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ maxWidth: '1600px', width: '95%', paddingBottom: '40px' }}>
      <div className="dashboard-grid">
        <style>{`
          .dashboard-grid { display: grid; grid-template-columns: 1fr 480px; gap: 30px; }
          @media (max-width: 1100px) { .dashboard-grid { grid-template-columns: 1fr; } }
          .pulse-sos { animation: pulse-red 2s infinite; }
          @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

          /* High-Tech Custom Leaflet Markers */
          .leaflet-custom-marker {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
          }
          .marker-icon-circle {
            position: absolute;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.45);
            border: 2px solid white;
            z-index: 2;
            transform: translate(-50%, -50%);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .type-victim .marker-icon-circle { background: #ef4444; border-color: #fca5a5; }
          .type-ambulance .marker-icon-circle { background: #f59e0b; border-color: #fde68a; }
          .type-police .marker-icon-circle { background: #2563eb; border-color: #bfdbfe; }
          .type-hospital .marker-icon-circle { background: #10b981; border-color: #a7f3d0; }

          .marker-glowing-pulse {
            position: absolute;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            z-index: 1;
            opacity: 0;
            transform: translate(-50%, -50%);
            animation: marker-pulse 2s infinite;
          }
          .type-victim .marker-glowing-pulse { background: rgba(239, 68, 68, 0.5); }
          .type-ambulance .marker-glowing-pulse { background: rgba(245, 158, 11, 0.5); }
          .type-police .marker-glowing-pulse { background: rgba(37, 99, 235, 0.5); }
          .type-hospital .marker-glowing-pulse { background: rgba(16, 185, 129, 0.5); }

          @keyframes marker-pulse {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
          }

          .marker-label {
            position: absolute;
            top: 24px;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            color: white;
            padding: 5px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 800;
            white-space: nowrap;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 3;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: all 0.3s ease;
          }
          
          .leaflet-custom-marker:hover .marker-icon-circle {
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          }
          .leaflet-custom-marker:hover .marker-label {
            background: rgba(15, 23, 42, 1);
            max-width: 300px;
            border-color: rgba(255,255,255,0.25);
            box-shadow: 0 6px 20px rgba(0,0,0,0.5);
          }
          
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

          /* Mobile Phone Screens Optimization */
          @media (max-width: 600px) {
            .glass-panel-hud {
              padding: 12px 16px !important;
            }
            .info-grid-hud {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 12px 16px !important;
              margin-bottom: 12px !important;
            }
            .hud-column {
              border-left: none !important;
              padding-left: 0 !important;
            }
            .info-grid-hud-item-title {
              font-size: 0.5rem !important;
              letter-spacing: 0.5px !important;
            }
            .info-grid-hud-item-value {
              font-size: 0.75rem !important;
              white-space: nowrap !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
            }
            .info-grid-hud-item-sub {
              font-size: 0.65rem !important;
              margin-top: 2px !important;
            }
            .actions-row-hud {
              flex-direction: column !important;
              gap: 8px !important;
            }
            .actions-row-hud > button {
              max-width: 100% !important;
              width: 100% !important;
              padding: 10px 14px !important;
              font-size: 0.75rem !important;
            }
          }
        `}</style>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', minHeight: '750px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {!sosActive ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                 <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: '40px' }}>
                  <div style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '2px', fontSize: '0.7rem', marginBottom: '12px' }}>{t('secure_terminal')}</div>
                  <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', fontWeight: '900' }}>{t('ready_dispatch')}</h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '450px', margin: '0 auto', marginBottom: '24px' }}>
                    {t('trigger_sub')}
                  </p>
                  
                  <div style={{ margin: '20px auto 0', maxWidth: '380px', width: '100%', textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      📝 Custom Emergency Note / Message (Optional)
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g., Severe leg bleeding, passenger trapped..."
                      value={customEmergencyMessage}
                      onChange={(e) => setCustomEmergencyMessage(e.target.value)}
                      style={{ 
                        width: '100%', 
                        background: 'var(--bg-deep)', 
                        border: '1px solid var(--border-glass)',
                        borderRadius: '12px',
                        padding: '14px 18px',
                        fontSize: '0.95rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-glass)'}
                    />
                  </div>
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
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)'
                    }} 
                    whileTap={{ 
                      scale: 0.95,
                      boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)'
                    }} 
                    onClick={triggerSOS} 
                    style={{ 
                      width: '160px', height: '160px', borderRadius: '50%', 
                      background: '#ef4444', 
                      border: 'none', color: '#ffffff', 
                      cursor: 'pointer', 
                      boxShadow: '0 0 25px rgba(239, 68, 68, 0.35)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                      padding: 0,
                      outline: 'none'
                    }}
                  >
                    <Logo size={22} light />
                    <span style={{ fontSize: '1.6rem', fontWeight: '900', marginTop: '4px', color: '#ffffff' }}>SOS</span>
                  </motion.button>
                )}
              </div>
            ) : (
              <div style={{ flex: 1, position: 'relative', height: '750px', minHeight: '350px' }}>
                <div 
                  ref={mapContainerRef} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '12px',
                    zIndex: 1 
                  }} 
                />

                <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none', zIndex: 1000 }}>
                   <div style={{ padding: '10px 20px', background: '#ef4444', color: 'white', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Radio size={16} className="pulse-sos" /> {t('sos_active')}
                   </div>
                   <div style={{ padding: '10px 20px', background: 'rgba(15, 23, 42, 0.9)', color: 'white', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '800' }}>{t('geospatial_grid')}</div>
                </div>

                <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px', zIndex: 1000 }}>
                  <div className="glass-panel glass-panel-hud" style={{ padding: '20px 24px', background: 'rgba(15, 23, 42, 0.82)', border: '1px solid var(--border-glass)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)' }}>
                    {/* Top Row: Information Grid */}
                    <div className="info-grid-hud" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '20px', alignItems: 'center', marginBottom: hospitalLocation && victimLocation ? '16px' : '0' }}>
                      {/* Column 1: System Status */}
                      <div className="hud-column" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--brand-red-glow)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {apiLoading ? <Loader2 className="animate-spin" color="#ef4444" size={20} /> : <Activity size={20} color="#ef4444" />}
                        </div>
                        <div>
                          <div className="info-grid-hud-item-title" style={{ color: 'var(--text-secondary)', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('system_status')}</div>
                          <div className="info-grid-hud-item-value" style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{apiLoading ? t('sync_grid') : t('dispatched_alerts')}</div>
                        </div>
                      </div>

                      {/* Column 2: Nearest Police */}
                      <div className="hud-column" style={{ borderLeft: '1px solid var(--border-glass)', paddingLeft: '20px' }}>
                        <div className="info-grid-hud-item-title" style={{ color: 'var(--text-secondary)', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('nearest_police') || 'Nearest Police'}</div>
                        <div className="info-grid-hud-item-value" style={{ fontSize: '0.9rem', fontWeight: '800', color: '#3b82f6', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                          {policeStations[0]?.name || 'Locating...'}
                        </div>
                        {policeDistEta && (
                          <div className="info-grid-hud-item-sub" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '700', marginTop: '4px', display: 'flex', gap: '8px' }}>
                            <span>📍 {policeDistEta.distanceStr}</span>
                            <span>⏱️ {policeDistEta.etaStr}</span>
                          </div>
                        )}
                      </div>

                      {/* Column 3: Target Trauma Center */}
                      <div className="hud-column" style={{ borderLeft: '1px solid var(--border-glass)', paddingLeft: '20px' }}>
                        <div className="info-grid-hud-item-title" style={{ color: 'var(--text-secondary)', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('target_center')}</div>
                        <div className="info-grid-hud-item-value" style={{ fontSize: '0.9rem', fontWeight: '800', color: '#10b981', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                          {selectedHospitalName || (apiLoading ? t('calculating') : 'Manual Mode')}
                        </div>
                        {hospitalDistEta && (
                          <div className="info-grid-hud-item-sub" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '700', marginTop: '4px', display: 'flex', gap: '8px' }}>
                            <span>📍 {hospitalDistEta.distanceStr}</span>
                            <span>⏱️ {hospitalDistEta.etaStr}</span>
                          </div>
                        )}
                      </div>

                      {/* Column 4: Assigned Ambulance */}
                      <div className="hud-column" style={{ borderLeft: '1px solid var(--border-glass)', paddingLeft: '20px' }}>
                        <div className="info-grid-hud-item-title" style={{ color: 'var(--text-secondary)', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Assigned Ambulance</div>
                        <div className="info-grid-hud-item-value" style={{ fontSize: '0.9rem', fontWeight: '800', color: '#f59e0b', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                          {selectedAmbulanceName || (apiLoading ? t('calculating') : 'PENDING DISPATCH')}
                        </div>
                        {ambulanceDistEta && (
                          <div className="info-grid-hud-item-sub" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '700', marginTop: '4px', display: 'flex', gap: '8px' }}>
                            <span>📍 {ambulanceDistEta.distanceStr}</span>
                            <span>⏱️ {ambulanceDistEta.etaStr}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Separator Line */}
                    {hospitalLocation && victimLocation && (
                      <div style={{ height: '1px', background: 'var(--border-glass)', marginBottom: '16px' }}></div>
                    )}

                    {/* Bottom Row: Actions */}
                    {hospitalLocation && victimLocation && (
                      <div className="actions-row-hud" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
                          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&origin=${victimLocation.lat},${victimLocation.lng}&destination=${hospitalLocation.lat},${hospitalLocation.lng}&travelmode=driving`;
                            window.open(url, '_blank');
                          }}
                          style={{ 
                            flex: 1,
                            maxWidth: '180px',
                            padding: '12px 20px', 
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
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
                          Hospital Route
                        </motion.button>

                        <motion.button 
                          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const pLoc = policeStations[0]?.location?.coordinates;
                            if (pLoc) {
                              const url = `https://www.google.com/maps/dir/?api=1&origin=${victimLocation.lat},${victimLocation.lng}&destination=${pLoc[1]},${pLoc[0]}&travelmode=driving`;
                              window.open(url, '_blank');
                            }
                          }}
                          style={{ 
                            flex: 1,
                            maxWidth: '180px',
                            padding: '12px 20px', 
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', 
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
                          Police Route
                        </motion.button>

                        <motion.button 
                          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (ambulanceLocation) {
                              const url = `https://www.google.com/maps/dir/?api=1&origin=${victimLocation.lat},${victimLocation.lng}&destination=${ambulanceLocation.lat},${ambulanceLocation.lng}&travelmode=driving`;
                              window.open(url, '_blank');
                            }
                          }}
                          style={{ 
                            flex: 1,
                            maxWidth: '180px',
                            padding: '12px 20px', 
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
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
                          Ambulance Route
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel sidebar-chat" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '750px' }}>
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
                  <span style={{ color: '#64748b' }}>Assigned Ambulance:</span>
                  <span style={{ fontWeight: '800', color: '#f59e0b', fontSize: '0.95rem' }}>{selectedAmbulanceName || 'PENDING DISPATCH'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ color: '#64748b' }}>Assigned Police Precinct:</span>
                  <span style={{ fontWeight: '800', color: '#2563eb', fontSize: '0.95rem' }}>{policeStations[0]?.name || 'PENDING DISPATCH'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '4px' }}>
                  <span style={{ color: '#64748b' }}>Response ETA:</span>
                  <span style={{ fontWeight: '700', color: '#d97706' }}>
                    {ambulanceLocation ? 'Dispatched' : 'Calculating...'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Section: Custom Emergency Message */}
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontWeight: '900' }}>👤 VICTIM'S EMERGENCY NOTE / MESSAGE</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#0f172a', fontWeight: '700', background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #2563eb', whiteSpace: 'pre-wrap' }}>
              {customEmergencyMessage || "No custom message entered. Automated GPS Dispatch Protocol executed."}
            </div>
          </div>

          {/* Section: Medical Guidance */}
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontWeight: '900' }}>🧠 AI MEDIC ADVISORY & CHAT LOGS</h3>
            
            <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#334155', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.slice(1).map((m, idx) => {
                let text = m.text;
                if (m.role === 'bot' && typeof text === 'string' && text.trim().startsWith('{')) {
                  try {
                    const data = JSON.parse(text);
                    text = (data.steps || []).join('\n');
                  } catch (e) {}
                }
                
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      padding: '14px 18px', 
                      borderRadius: '10px', 
                      border: '1px solid #e2e8f0', 
                      background: m.role === 'user' ? '#f1f5f9' : '#ffffff',
                      borderLeft: m.role === 'user' ? '4px solid #64748b' : '4px solid #ef4444',
                      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ 
                      color: m.role === 'user' ? '#64748b' : '#ef4444', 
                      fontWeight: '800', 
                      fontSize: '0.65rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px', 
                      marginBottom: '4px' 
                    }}>
                      {m.role === 'user' ? '👤 Victim Inquiry' : '🚑 AI Medic Advisor'}
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', color: '#0f172a', fontWeight: '600' }}>{text}</div>
                  </div>
                );
              })}
              {messages.slice(1).length === 0 && (
                <div style={{ fontStyle: 'italic', color: '#64748b' }}>No emergency advisor logs generated yet. Please refer to standard Golden Hour procedures.</div>
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
