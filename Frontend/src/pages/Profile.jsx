import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Globe, Save, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
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
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
      style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px' }}
    >
      <div className="glass-panel" style={{ padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '15px', borderRadius: '50%' }}>
            <User size={40} color="#3b82f6" />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem' }}>Personal Profile</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your emergency information and contacts</p>
          </div>
        </div>

        {message.text && (
          <div style={{ 
            background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
            color: message.type === 'success' ? '#10b981' : '#ef4444', 
            padding: '12px', borderRadius: '8px', marginBottom: '30px', 
            border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
            textAlign: 'center'
          }}>
            {message.text}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} /> Full Name
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={16} /> Preferred Language
            </label>
            <select 
              className="form-input" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ appearance: 'none' }}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="ta">Tamil</option>
              <option value="kn">Kannada</option>
            </select>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={20} color="#ef4444" /> Emergency Contacts
            </h2>
            <button onClick={addContact} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={16} /> Add Contact
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {contacts.map((contact, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}
              >
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Contact Name" 
                  value={contact.name} 
                  onChange={(e) => updateContact(idx, 'name', e.target.value)}
                />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Phone Number (with +91)" 
                  value={contact.phone} 
                  onChange={(e) => updateContact(idx, 'phone', e.target.value)}
                />
                <button 
                  onClick={() => removeContact(idx)} 
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
            {contacts.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px', border: '1px dashed var(--border-glass)', borderRadius: '12px' }}>
                No emergency contacts added yet. Please add at least one for the SOS feature.
              </p>
            )}
          </div>
        </div>

        <button 
          onClick={handleSave} 
          disabled={loading}
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '40px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          {loading ? 'Saving...' : <><Save size={20} /> Save Profile Changes</>}
        </button>
      </div>
    </motion.div>
  );
};

export default Profile;
