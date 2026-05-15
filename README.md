# RastaSaathi: AI-Driven Emergency Response Ecosystem 🚑

![RastaSaathi Header](https://raw.githubusercontent.com/skmdsadiq1607/RastaSaathiProject/main/Frontend/public/logo.png)

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Maps](https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)](https://developers.google.com/maps)

**RastaSaathi** is a high-precision emergency response platform engineered to optimize the **"Golden Hour"**—the critical window where medical intervention has the highest impact on survival. Developed for the **IIT Madras Road Safety Hackathon 2026**, our system integrates advanced geospatial intelligence, AI-driven triage, and automated multi-channel communication to save lives at the speed of light.

---

## 🏗️ Technical Architecture & Innovation

### 1. High-Precision Resource Discovery
Unlike standard map searches, RastaSaathi utilizes a **Physical Haversine Proximity Algorithm** combined with Google’s **Distance Matrix API**. This ensures that victims are routed to the *literally* closest medical facility (ICU-capable) and Law Enforcement precinct (Police Station) with sub-meter accuracy.

### 2. Multi-Model AI Medic (Failover Brain)
Our AI First-Aid guidance is built on a **Failover Architecture** using 11 rotating API keys across three frontier models:
- **OpenAI GPT-4o** (Primary)
- **Anthropic Claude 3.5 Sonnet** (Failover Layer 1)
- **Google Gemini 1.5 Flash** (Failover Layer 2)
This ensures 100% uptime for medical guidance, even during global API outages or rate-limiting scenarios.

### 3. Automated Emergency Grid (WhatsApp/SMS)
Upon triggering an SOS, the system automatically dispatches **Personalized Emergency Alerts** to pre-configured contacts.
- **Dynamic Identification**: Messages include the victim's name for immediate identification.
- **Live Routing**: Includes a one-click Google Maps link directing the contact from the accident site to the selected hospital.

### 4. Smart Triage & Resource Allocation
Our backend implements a weighted scoring engine that evaluates:
- **Distance & Travel Time (ETA)**
- **Facility Specialization** (Trauma Center vs. General Clinic)
- **Real-time Geospatial Indexing** via MongoDB 2dsphere.

---

## 🛠️ Feature Matrix

| Feature | Status | Technology |
| :--- | :--- | :--- |
| **SOS Trigger & GPS Probe** | 🟢 Production | Geolocation API + MongoDB Geospatial |
| **Hospital & Police Discovery** | 🟢 Production | Google Places + Haversine Sorting |
| **AI First-Aid Assistant** | 🟢 Production | OpenAI / Claude / Gemini Failover |
| **WhatsApp/SMS Alerting** | 🟡 Implemented | Twilio + WhatsApp Business API |
| **Multi-Lingual UI (4+ Langs)** | 🟢 Production | Context API + Localization Engine |
| **Emergency Helpline Grid** | 🟢 Production | Interactive Telephony Integration |

---

## 🚀 Deployment & Local Setup

### System Prerequisites
- Node.js (v18+) & MongoDB
- Google Cloud Project (Maps & Distance Matrix enabled)
- API Keys for OpenAI/Claude/Gemini

### Installation Sequence

1. **Clone the Infrastructure**
   ```bash
   git clone https://github.com/skmdsadiq1607/RastaSaathiProject.git
   cd RastaSaathiProject
   ```

2. **Core Backend Configuration**
   ```bash
   cd Backend
   npm install
   # Configure .env with MONGODB_URI and CLAUDE_API_KEYS/OPENAI_API_KEY
   npm start
   ```

3. **Frontend Terminal Interface**
   ```bash
   cd Frontend
   npm install
   # Configure .env with VITE_GOOGLE_MAPS_API_KEY
   npm run dev
   ```

---

## 👥 The Engineering Team
- **Dr. Lakshmi** (Project Lead & Visionary)
- **Sadiq** (Full-Stack Engineer & AI Integration)
- **Krishna** (Geospatial Architect)
- **Chakravarthi** (System Designer)
- **Hasini** (Frontend Specialist)

---

> [!IMPORTANT]
> This project is a submission for the **IIT Madras Road Safety Hackathon 2026**. It represents a scalable, production-ready solution to India's road safety crisis.

*Engineered for life. Empowering the Golden Hour. 🚑*
