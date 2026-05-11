import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Globe, Save, Plus, Trash2, Shield, Heart } from 'lucide-react';
import axios from 'axios';
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
      style={{ paddingTop: '60px', paddingBottom: '100px', maxWidth: '900px' }}
    >
      <div className="glass-panel" style={{ padding: '50px', background: 'rgba(2, 6, 23, 0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '50px', flexWrap: 'wrap' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={40} color="#3b82f6" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>{t('profile')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage your identity and emergency response grid.</p>
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
              <User size={16} /> Full Name
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Your full name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: '900', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Globe size={16} /> Language Priority
            </label>
            <select 
              className="form-input" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ appearance: 'none', background: 'rgba(0,0,0,0.3)' }}
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
              <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={24} color="#ef4444" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900' }}>Emergency Contacts</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Recipients of your automated SOS alerts.</p>
              </div>
            </div>
            <button onClick={addContact} className="btn btn-glass" style={{ padding: '12px 24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Plus size={18} /> Add New
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
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px', gap: '20px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Contact Name" 
                    value={contact.name} 
                    onChange={(e) => updateContact(idx, 'name', e.target.value)}
                    style={{ background: 'rgba(0,0,0,0.2)' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Phone (e.g. +91...)" 
                    value={contact.phone} 
                    onChange={(e) => updateContact(idx, 'phone', e.target.value)}
                    style={{ background: 'rgba(0,0,0,0.2)' }}
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
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px', border: '2px dashed var(--border-glass)', borderRadius: '24px', background: 'rgba(255,255,255,0.01)' }}>
                <AlertTriangle size={32} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p style={{ fontWeight: '600' }}>No emergency contacts detected.</p>
                <p style={{ fontSize: '0.85rem' }}>Add at least one contact to enable WhatsApp SOS alerts.</p>
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
          {loading ? 'SYNCHRONIZING...' : <><Save size={24} /> SAVE GRID CHANGES</>}
        </button>
      </div>
    </motion.div>
  );
};

export default Profile;
