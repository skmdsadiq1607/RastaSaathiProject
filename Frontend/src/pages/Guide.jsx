import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Heart, Activity, Map, Phone, AlertTriangle, Stethoscope, MessageSquare, ShieldCheck } from 'lucide-react';

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
          <Step num="4" title="Consult Medic" desc="Use the floating RastaSaathi Medic for specific first-aid instructions based on the injury." />
        </div>
      </div>

      {/* RastaSaathi Medic Section */}
      <div className="glass-panel" style={{ padding: '60px', marginBottom: '60px', borderLeft: '8px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Stethoscope color="#3b82f6" size={32} /> RastaSaathi Medic Assistant
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '25px' }}>
              Our interactive medical responder is built for high-speed assistance. In a crisis, you don't need to type long descriptions—just pick your situation from our smart database.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: '#3b82f6', fontWeight: '800' }}>✓</div>
                <div style={{ fontSize: '0.95rem' }}><b>50+ Protocols:</b> Comprehensive guide for every accident scenario.</div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: '#3b82f6', fontWeight: '800' }}>✓</div>
                <div style={{ fontSize: '0.95rem' }}><b>Quick Dropdown Selection:</b> Zero typing needed for the fastest info.</div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: '#3b82f6', fontWeight: '800' }}>✓</div>
                <div style={{ fontSize: '0.95rem' }}><b>Multi-Language:</b> Available in Hindi, Telugu, Tamil, Urdu, and English.</div>
              </div>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', flex: '0.4', minWidth: '250px' }}>
             <div className="sos-pulse" style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
               <MessageSquare color="white" size={32} />
             </div>
             <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Click the floating stethoscope icon on any page to launch the Medic.</div>
          </div>
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
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Send the WhatsApp message <b>join <span style={{color:'#10b981'}}>do-hit</span></b> to that number.</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '10px' }}>3. Add Your Phone</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>In the App, go to <b>Profile</b> and add your phone number with country code.</div>
          </div>
        </div>


      {/* The Golden Minute Narrative */}
      <div style={{ margin: '120px 0', textAlign: 'left' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '24px' }}>
              The <span style={{ color: '#ef4444' }}>Golden Minute</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '24px' }}>
              Statistics show that the actions taken within the first 60 seconds of a road accident can increase the chance of survival by over 40%. This is the "Golden Minute." 
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              RastaSaathi is designed to occupy this minute. By automating the data capture, hospital selection, and first-aid delivery, we ensure that you are never acting alone. You are backed by the fastest medical response technology available today.
            </p>
          </motion.div>

          <div className="glass-panel" style={{ padding: '50px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck color="#ef4444" size={24} /> Verified Protocols
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Every instruction provided by RastaSaathi is cross-referenced with international trauma care standards and validated by our medical advisory team.
            </div>
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
