import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Globe, Save, Plus, Trash2, Shield, Heart, AlertTriangle, Download, Loader2 } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLanguage } from '../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [name, setName] = useState(user.name || '');
  const [language, setLanguage] = useState(user.language || 'en');
  const [contacts, setContacts] = useState(user.emergencyContacts || []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Incident History states
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [downloadingPdfId, setDownloadingPdfId] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    const fetchProfileAndHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fetchedUser = res.data.data;
        setUser(fetchedUser);
        setName(fetchedUser.name || '');
        setLanguage(fetchedUser.language || 'en');
        setContacts(fetchedUser.emergencyContacts || []);
        localStorage.setItem('user', JSON.stringify(fetchedUser));
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }

      // Fetch SOS Incident History
      try {
        const histRes = await axios.get(`${API_BASE_URL}/incident`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(histRes.data.data.incidents || []);
      } catch (err) {
        console.error("Failed to fetch incident history:", err);
      } finally {
        setHistoryLoading(false);
      }
    };
    
    fetchProfileAndHistory();
  }, []);

  const downloadHistoryReportPDF = async (incident) => {
    try {
      setDownloadingPdfId(incident._id);
      setSelectedIncident(incident);

      // Wait 300ms for the DOM to render the off-screen incident report template
      await new Promise((resolve) => setTimeout(resolve, 300));

      const element = document.getElementById('sos-history-pdf-report');
      if (!element) {
        console.error("PDF element not found");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 295;
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

      pdf.save(`Rasta-Saathi_SOS_Report_${incident.ticketNumber || incident._id}.pdf`);
    } catch (err) {
      console.error('Failed to generate high-fidelity SOS report:', err);
    } finally {
      setDownloadingPdfId(null);
      setSelectedIncident(null);
    }
  };

  const addContact = () => {
    setContacts([...contacts, { name: '', phone: '' }]);
  };

  const removeContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  const updateContact = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_BASE_URL}/auth/profile`, {
        name,
        language,
        emergencyContacts: contacts
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedUser = res.data.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to update profile. Please check your network.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
      style={{ paddingBottom: '100px', maxWidth: '900px' }}
    >
      <div className="glass-panel" style={{ padding: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '50px', flexWrap: 'wrap' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--brand-red-glow)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={40} color="var(--brand-red)" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>{t('profile')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{t('manage_grid')}</p>
          </div>
        </div>

        {message.text && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
              color: message.type === 'success' ? '#10b981' : '#ef4444', 
              padding: '16px 24px', borderRadius: '16px', marginBottom: '40px', 
              border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
              textAlign: 'center', fontWeight: '700'
            }}
          >
            {message.text}
          </motion.div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: '900', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <User size={16} /> {t('full_name')}
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder={t('full_name')}
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: '900', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Globe size={16} /> {t('lang_priority')}
            </label>
            <select 
              className="form-input" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ appearance: 'none' }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="ur">اردو (Urdu)</option>
            </select>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--brand-red-glow)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={24} color="var(--brand-red)" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900' }}>{t('emergency_contacts')}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t('recipients_sos')}</p>
              </div>
            </div>
            <button onClick={addContact} className="btn btn-glass" style={{ padding: '12px 24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Plus size={18} /> {t('add_new')}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {contacts.map((contact, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px', gap: '20px', padding: '24px', borderRadius: '20px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <input 
                    type="text" 
                    className="form-input" 
                    placeholder={t('full_name')} 
                    value={contact.name} 
                    onChange={(e) => updateContact(idx, 'name', e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Phone (e.g. +91...)" 
                    value={contact.phone} 
                    onChange={(e) => updateContact(idx, 'phone', e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => removeContact(idx)} 
                  style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
            {contacts.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px', border: '2px dashed var(--border-glass)', borderRadius: '24px' }}>
                <AlertTriangle size={32} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p style={{ fontWeight: '600' }}>{t('no_contacts')}</p>
                <p style={{ fontSize: '0.85rem' }}>{t('add_one_contact')}</p>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={handleSave} 
          disabled={loading}
          className="premium-button" 
          style={{ width: '100%', marginTop: '60px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '1.2rem' }}
        >
          {loading ? 'SYNCHRONIZING...' : <><Save size={24} /> {t('save_grid')}</>}
        </button>
      </div>

      {/* Emergency SOS History Card */}
      <div className="glass-panel" style={{ padding: '50px', marginTop: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--brand-red-glow)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={24} color="var(--brand-red)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900' }}>SOS Emergency History</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>View your past emergency dispatches and download PDF incident receipts.</p>
          </div>
        </div>

        {historyLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            <p style={{ fontWeight: '700' }}>Retrieving Emergency History...</p>
          </div>
        ) : history.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px', border: '2px dashed var(--border-glass)', borderRadius: '24px' }}>
            <AlertTriangle size={32} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p style={{ fontWeight: '600' }}>No Past SOS Records Found</p>
            <p style={{ fontSize: '0.85rem' }}>Your triggered emergency dispatches will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {history.map((inc) => (
              <div 
                key={inc._id}
                className="glass-panel" 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '24px', 
                  borderRadius: '20px',
                  border: '1px solid var(--border-glass)',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ background: 'var(--brand-red-glow)', color: 'var(--brand-red)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '900' }}>
                      {inc.ticketNumber || 'RS-UNKNOWN'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '700' }}>
                      {new Date(inc.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    🚑 {inc.selectedHospital?.name || 'Trauma Dispatch Synced'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    📍 GPS: {inc.location?.coordinates ? `${inc.location.coordinates[1].toFixed(4)}, ${inc.location.coordinates[0].toFixed(4)}` : 'N/A'}
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => downloadHistoryReportPDF(inc)}
                    disabled={downloadingPdfId !== null}
                    className="btn btn-primary"
                    style={{ 
                      padding: '10px 20px', 
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Download size={14} />
                    {downloadingPdfId === inc._id ? 'Generating...' : 'Download Report'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden off-screen PDF template */}
      {selectedIncident && (
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <div id="sos-history-pdf-report" style={{
            width: '800px',
            padding: '40px',
            background: '#ffffff',
            color: '#0f172a',
            fontFamily: "'Inter', sans-serif",
            boxSizing: 'border-box',
            border: '1.5px solid #cbd5e1',
            borderRadius: '8px'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'system-ui, sans-serif', fontSize: '28px', fontWeight: '900', letterSpacing: '-1.5px' }}>
                  <span style={{ color: '#0f172a' }}>Rasta</span>
                  <span style={{ color: '#ef4444', marginLeft: '1px' }}>Saathi</span>
                </div>
                <div style={{ width: '1px', height: '32px', background: '#e2e8f0' }}></div>
                <div>
                  <div style={{ color: '#ef4444', fontWeight: '800', letterSpacing: '2px', fontSize: '0.65rem', textTransform: 'uppercase' }}>EMERGENCY RESPONSE GRID</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>HISTORICAL INCIDENT REPORT</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#ef4444', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', display: 'inline-block' }}>
                  GRID ARCHIVE
                </div>
                <div style={{ fontSize: '0.75rem', color: '#0f172a', marginTop: '8px', fontWeight: '800' }}>RECEIPT NO: {selectedIncident.ticketNumber || 'RS-PENDING'}</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '4px', fontWeight: '700' }}>INCIDENT ID: {selectedIncident._id}</div>
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
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>{selectedIncident.createdByUser?.name || user.name || 'Anonymous Victim'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Identity Profile:</span>
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>{selectedIncident.createdByUser?.phone || user.phone || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>GPS Location:</span>
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>
                      {selectedIncident.location?.coordinates 
                        ? `${selectedIncident.location.coordinates[1].toFixed(6)}, ${selectedIncident.location.coordinates[0].toFixed(6)}` 
                        : 'N/A'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Active Language:</span>
                    <span style={{ fontWeight: '700', color: '#0f172a', textTransform: 'uppercase' }}>{selectedIncident.createdByUser?.language || user.language || 'EN'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Report Date:</span>
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>{new Date(selectedIncident.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Emergency Dispatches */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontWeight: '800' }}>🚑 Tactical Dispatches</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ color: '#64748b' }}>Target Trauma Center:</span>
                    <span style={{ fontWeight: '800', color: '#16a34a', fontSize: '0.95rem' }}>{selectedIncident.selectedHospital?.name || 'TRAUMA CENTER DISPATCHED'}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ color: '#64748b' }}>Assigned Police Precinct:</span>
                    <span style={{ fontWeight: '800', color: '#2563eb', fontSize: '0.95rem' }}>NEAREST COORDINATED DISTRICT</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '4px' }}>
                    <span style={{ color: '#64748b' }}>Status:</span>
                    <span style={{ fontWeight: '700', color: '#16a34a', textTransform: 'uppercase' }}>
                      {selectedIncident.status || 'CLOSED'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Section: Custom Emergency Message */}
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontWeight: '900' }}>👤 VICTIM'S EMERGENCY NOTE / MESSAGE</h3>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#0f172a', fontWeight: '700', background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #2563eb', whiteSpace: 'pre-wrap' }}>
                {selectedIncident.message || "No custom message entered. Automated GPS Dispatch Protocol executed."}
              </div>
            </div>

            {/* Section: Medical Guidance */}
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontWeight: '900' }}>🧠 AI MEDIC ADVISORY & CHAT LOGS</h3>
              
              <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#334155', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedIncident.firstAid?.messages?.map((m, idx) => {
                  let text = m.content;
                  if (m.role === 'assistant' && typeof text === 'string' && text.trim().startsWith('{')) {
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
                {(!selectedIncident.firstAid || !selectedIncident.firstAid.messages || selectedIncident.firstAid.messages.length === 0) && (
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
                <span>REPORT ARCHIVE GATEWAY SYNCHRONIZED</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
