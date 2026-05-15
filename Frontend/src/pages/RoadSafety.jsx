import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Car, Footprints, Heart, CheckCircle2, AlertCircle, ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const RoadSafety = () => {
  const { t } = useLanguage();
  const sections = [
    {
      id: 'general',
      title: 'General Tips',
      icon: <Shield className="text-blue-400" size={24} />,
      items: [
        "Obey all traffic signals, boards and signs.",
        "Adhere to permitted speed limits",
        "Do Not Drink and Drive",
        "Always carry your drivers license and other important documents (RC, Insurance, PUC).",
        "Wear seat belts always while in a moving vehicle.",
        "Do not use your cell phones while driving. Park on the left for urgent calls.",
        "Use the Indicator or hand signals while changing lanes.",
        "Stay alert and considerate to senior citizens, handicapped and children.",
        "Avoid sudden braking and harsh acceleration.",
        "Never use the clutch as a footrest while driving.",
        "Use Pay and Park islands and avoid parking on the road.",
        "Do not overload your vehicles with luggage or passengers."
      ]
    },
    {
      id: 'pedestrians',
      title: 'For Pedestrians',
      icon: <Footprints className="text-emerald-400" size={24} />,
      items: [
        "Stop at the curb before entering a street.",
        "Cross only at marked crosswalks. Look left-right-left first.",
        "Always walk on the sidewalk.",
        "Walk facing the traffic if there is no sidewalk.",
        "Watch for turning vehicles prior to crossing.",
        "Turn off headphones while crossing to stay aware.",
        "Be extremely careful during gusty weather conditions.",
        "Be aware of each lane on multi-lane roads.",
        "Help the physically challenged and elderly to cross.",
        "Do not run while crossing.",
        "Hold children's hands while crossing.",
        "Do not permit children to play on the streets."
      ]
    },
    {
      id: 'drivers',
      title: 'For Motor Vehicle Drivers',
      icon: <Car className="text-red-400" size={24} />,
      items: [
        "Always obey Road safety rules and regulations.",
        "Look for traffic signs before crossing signals.",
        "Drive within speed limits (max 30 kmph in busy areas).",
        "Keep vehicle fit to avoid breakdowns and hazards.",
        "Stop or slow down for pedestrians at zebra crossings.",
        "Always wear seat belts while driving.",
        "Avoid rash or negligent driving.",
        "Do not drink and drive.",
        "Avoid using mobile phones while driving.",
        "Turn brake lights ON before stopping to avoid rear collisions."
      ]
    },
    {
      id: 'children',
      title: 'For Children',
      icon: <Users className="text-purple-400" size={24} />,
      description: "Children should be taught the safety code and should not be allowed on the road alone unless they understand the measures.",
      items: [
        "Always walk on the footpath only.",
        "Do not be impatient. Do not run or rush.",
        "Cross only at Zebra crossings, subways, or foot over-bridges.",
        "Cross only on clear green signals or officer directions.",
        "Beware of blind spots between parked vehicles.",
        "Cross wide roads in two stages using central islands.",
        "Wait for all lanes to be clear on one-way streets.",
        "Never cross at corners or curves.",
        "Do not run across the road."
      ]
    },
    {
      id: 'parents',
      title: 'For Parents',
      icon: <Heart className="text-pink-400" size={24} />,
      items: [
        "Ensure child transport modes are safe.",
        "Report school bus violations to authorities.",
        "Participate in PTA meetings regarding safety.",
        "Teach children basic road rules and crossing skills.",
        "Do not allow minor children to drive.",
        "Meticulously follow traffic rules to set an example.",
        "Instill a law-abiding attitude in your children."
      ]
    }
  ];

  const emergencyContacts = [
    { name: "Police", number: "100", type: "primary" },
    { name: "Fire", number: "101", type: "primary" },
    { name: "Ambulance", number: "102, 108", type: "primary" },
    { name: "Women Helpline", number: "181", type: "secondary" },
    { name: "Child Line", number: "1098", type: "secondary" },
    { name: "Traffic Help", number: "1073", type: "secondary" },
    { name: "MeeSeva Center", number: "1100", type: "info" },
    { name: "Crime Stopper", number: "1090", type: "info" },
    { name: "Blood Bank", number: "040-24745243", type: "medical" },
    { name: "Electricity Complaint", number: "1912", type: "info" },
    { name: "Osmania General Hospital", number: "040-23538846", type: "medical" },
    { name: "Gandhi Hospital", number: "040-27505566", type: "medical" },
    { name: "Government Chest Hospital", number: "040-23814421", type: "medical" },
    { name: "Government ENT Hospital", number: "040-24740245", type: "medical" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container" 
      style={{ paddingBottom: '60px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px' }}>
          Safety Guidelines & <span style={{ color: '#ef4444' }}>Emergency Contacts</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          {t('impact_sub')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel"
            style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ 
              position: 'absolute', top: '-10px', right: '-10px', 
              opacity: 0.05, transform: 'scale(4)' 
            }}>
              {section.icon}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <div style={{ 
                width: '50px', height: '50px', borderRadius: '14px', 
                background: 'rgba(255,255,255,0.05)', display: 'flex', 
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {section.icon}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{t(section.id + '_safety') || section.title}</h2>
            </div>

            {section.description && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px', fontStyle: 'italic', paddingLeft: '10px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                {section.description}
              </p>
            )}

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
              {section.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'rgba(255,255,255,0.3)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>
            Emergency <span className="text-gradient">Helplines</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Click any contact to initiate a call immediately.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {emergencyContacts.map((contact, i) => (
            <motion.a
              key={i}
              href={`tel:${contact.number.split(',')[0].trim()}`}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="glass-panel"
              style={{ 
                padding: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '20px', 
                textDecoration: 'none',
                border: contact.type === 'primary' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255,255,255,0.08)',
                background: contact.type === 'primary' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255,255,255,0.03)'
              }}
            >
              <div style={{ 
                width: '45px', height: '45px', borderRadius: '12px', 
                background: contact.type === 'primary' ? '#ef4444' : 'rgba(255,255,255,0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', flexShrink: 0
              }}>
                <Phone size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{contact.name}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: contact.type === 'primary' ? '#ef4444' : 'white' }}>{contact.number}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="glass-panel"
        style={{ 
          marginTop: '60px', padding: '40px', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(239, 68, 68, 0.05) 100%)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '100px', color: '#ef4444', fontWeight: '800', fontSize: '0.8rem', marginBottom: '20px' }}>
          <AlertCircle size={16} /> {t('official_protocol')}
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '15px' }}>{t('hero_title')}</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 30px' }}>
          {t('golden_minute_sub')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '16px 40px', fontSize: '1.1rem' }}
            onClick={() => window.location.href='/dashboard'}
          >
            {t('dashboard')} <ArrowRight size={20} style={{ marginLeft: '10px' }} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RoadSafety;
