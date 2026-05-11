import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Car, Footprints, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

const RoadSafety = () => {
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

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container" 
      style={{ paddingTop: '120px', paddingBottom: '60px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px' }}>
          Road Safety <span className="text-gradient">Guidelines</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Essential protocols and safety measures to protect yourself and others on the road. 
          Compliance saves lives.
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{section.title}</h2>
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
          <AlertCircle size={16} /> EMERGENCY ALERT
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '15px' }}>Every Second Counts.</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 30px' }}>
          Follow these guidelines to minimize risks. In case of any incident, RastaSaathi AI is always ready to coordinate your rescue.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button className="premium-button" onClick={() => window.location.href='/dashboard'}>Go to Dashboard</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RoadSafety;
