import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Heart, Activity, Map, Phone, AlertTriangle } from 'lucide-react';

const Guide = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container"
      style={{ paddingTop: '60px', paddingBottom: '100px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '20px' }}>
          Emergency <span style={{ color: '#ef4444' }}>Protocol Guide</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          In an emergency, every second counts. Follow these protocols while help is on the way.
        </p>
      </div>

      {/* Immediate Steps */}
      <div className="glass-panel" style={{ padding: '60px', marginBottom: '60px', borderLeft: '8px solid #ef4444' }}>
        <h2 style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <AlertTriangle color="#ef4444" size={32} /> Immediate Action (The First 60 Seconds)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          <Step num="1" title="Ensure Safety" desc="Stop your vehicle safely and turn on hazard lights. Check for oncoming traffic." />
          <Step num="2" title="Trigger SOS" desc="Open RastaSaathi and tap the SOS button to alert emergency services and family." />
          <Step num="3" title="Assess Victim" desc="Check if the person is conscious and breathing. Do not move them unless there is fire." />
          <Step num="4" title="Use AI Medic" desc="Keep the AI Medic chat open for specific first-aid instructions based on injuries." />
        </div>
      </div>

      {/* Setup Demo Alerts */}
      <div className="glass-panel" style={{ padding: '60px', marginBottom: '60px', borderLeft: '8px solid #10b981' }}>
        <h2 style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Phone color="#10b981" size={32} /> Setup Demo Alerts (Crucial for Judges)
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
          To receive real-time SOS alerts on your phone during the demonstration, follow these 3 steps:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '10px' }}>1. Save Number</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Save <b>+1 415 523 8886</b> to your contacts as "RastaSaathi Alerts".</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '10px' }}>2. Send Join Code</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Send the WhatsApp message <b>join <span style={{color:'#10b981'}}>glass-simple</span></b> to that number.</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '10px' }}>3. Add Your Phone</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>In the App, go to <b>Profile</b> and add your phone number with country code.</div>
          </div>
        </div>
      </div>

      {/* First Aid Cards */}
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>First-Aid Quick Reference</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <AidCard 
          icon={<Activity color="#ef4444" />} 
          title="Heavy Bleeding" 
          steps={[
            "Apply firm, direct pressure with a clean cloth.",
            "Do not remove the cloth even if it's soaked.",
            "Elevate the wound above heart level if possible."
          ]} 
        />
        <AidCard 
          icon={<ShieldAlert color="#3b82f6" />} 
          title="Bone Fractures" 
          steps={[
            "Do not try to realign the bone.",
            "Immobilize the limb using a splint or rolled clothes.",
            "Apply cold packs to reduce swelling."
          ]} 
        />
        <AidCard 
          icon={<Heart color="#10b981" />} 
          title="CPR (Not Breathing)" 
          steps={[
            "Place hands in the center of the chest.",
            "Push hard and fast (100-120 compressions/min).",
            "Allow the chest to recoil between pushes."
          ]} 
        />
      </div>
    </motion.div>
  );
};

const Step = ({ num, title, desc }) => (
  <div>
    <div style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(239, 68, 68, 0.1)', marginBottom: '-30px' }}>{num}</div>
    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'white' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{desc}</p>
  </div>
);

const AidCard = ({ icon, title, steps }) => (
  <div className="glass-panel" style={{ padding: '40px' }}>
    <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.03)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{title}</h3>
    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {steps.map((step, i) => <li key={i}>{step}</li>)}
    </ul>
  </div>
);

export default Guide;
