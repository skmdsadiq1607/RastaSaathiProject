import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    home: "Home",
    about: "About",
    guide: "Guide",
    contact: "Contact",
    dashboard: "Dashboard",
    login: "Login",
    hero_title: "Seconds Save Lives.",
    hero_sub: "RastaSaathi orchestrates AI, geospatial data, and real-time alerts to bridge the gap between accident and life-saving care.",
    view_guide: "View Emergency Guide",
    vision: "Our Vision",
    medic_title: "RASTASAATHI MEDIC",
    setup_alerts: "Setup Demo Alerts",
    first_aid_title: "First-Aid Quick Reference",
    immediate_action: "Immediate Action",
    call_108: "CALL 108 NOW"
  },
  hi: {
    home: "होम",
    about: "हमारे बारे में",
    guide: "मार्गदर्शिका",
    contact: "संपर्क",
    dashboard: "डैशबोर्ड",
    login: "लॉगिन",
    hero_title: "सेकंड जान बचाते हैं।",
    hero_sub: "रास्तासाथी दुर्घटना और जीवन रक्षक देखभाल के बीच की दूरी को पाटने के लिए एआई और रीयल-टाइम अलर्ट का उपयोग करता है।",
    view_guide: "आपातकालीन मार्गदर्शिका देखें",
    vision: "हमारा दृष्टिकोण",
    medic_title: "रास्तासाथी मेडिक",
    setup_alerts: "डेमो अलर्ट सेटअप करें",
    first_aid_title: "प्राथमिक चिकित्सा संदर्भ",
    immediate_action: "तत्काल कार्रवाई",
    call_108: "अभी 108 पर कॉल करें"
  },
  te: {
    home: "హోమ్",
    about: "గురించి",
    guide: "మార్గదర్శి",
    contact: "సంప్రదించండి",
    dashboard: "డ్యాష్‌బోర్డ్",
    login: "లాగిన్",
    hero_title: "క్షణాలు ప్రాణాలను కాపాడతాయి.",
    hero_sub: "రాస్తాసాథి ప్రమాదం మరియు ప్రాణ రక్షణ మధ్య దూరాన్ని తగ్గించడానికి AI మరియు రియల్-టైమ్ అలర్ట్‌లను ఉపయోగిస్తుంది.",
    view_guide: "అత్యవసర మార్గదర్శిని చూడండి",
    vision: "మా విజన్",
    medic_title: "రాస్తాసాథి మెడిక్",
    setup_alerts: "డెమో అలర్ట్‌ల సెటప్",
    first_aid_title: "ప్రథమ చికిత్స సూచనలు",
    immediate_action: "తక్షణ చర్య",
    call_108: "ఇప్పుడే 108కి కాల్ చేయండి"
  },
  ta: {
    home: "முகப்பு",
    about: "பற்றி",
    guide: "வழிகாட்டி",
    contact: "தொடர்பு",
    dashboard: "டாஷ்போர்டு",
    login: "உள்நுழை",
    hero_title: "நொடிகள் உயிரைக் காக்கும்.",
    hero_sub: "விபத்து மற்றும் உயிர் காக்கும் சிகிச்சைக்கு இடையிலான இடைவெளியைக் குறைக்க ராஸ்தாசாதி AI மற்றும் நிகழ்நேர எச்சரிக்கைகளைப் பயன்படுத்துகிறது.",
    view_guide: "அவசர வழிகாட்டியைப் பார்க்கவும்",
    vision: "எங்கள் பார்வை",
    medic_title: "ராஸ்தாசாதி மெடிக்",
    setup_alerts: "டெமோ விழிப்பூட்டல்களை அமைக்கவும்",
    first_aid_title: "முதலுதவி குறிப்பு",
    immediate_action: "உடனடி நடவடிக்கை",
    call_108: "இப்போதே 108 ஐ அழைக்கவும்"
  },
  ur: {
    home: "ہوم",
    about: "بارے میں",
    guide: "گائیڈ",
    contact: "رابطہ",
    dashboard: "ڈیش بورڈ",
    login: "لاگ ان",
    hero_title: "سیکنڈ جان بچاتے ہیں۔",
    hero_sub: "راستہ ساتھی حادثے اور زندگی بچانے والی دیکھ بھال کے درمیان فرق کو ختم کرنے کے لیے AI اور ریئل ٹائم الرٹس کا استعمال کرتا ہے۔",
    view_guide: "ہنگامی گائیڈ دیکھیں",
    vision: "ہمارا وژن",
    medic_title: "راستہ ساتھی میڈک",
    setup_alerts: "ڈیمو الرٹس سیٹ اپ کریں",
    first_aid_title: "ابتدائی طبی امداد کا حوالہ",
    immediate_action: "فوری کارروائی",
    call_108: "ابھی 108 پر کال کریں"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
