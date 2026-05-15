# RastaSaathi - Saving Lives Every Second 🚑

![RastaSaathi Header](https://raw.githubusercontent.com/skmdsadiq1607/RastaSaathiProject/main/Frontend/public/logo.png)

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Maps](https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)](https://developers.google.com/maps)

**RastaSaathi** is a state-of-the-art emergency response platform designed to optimize the "Golden Hour" in medical emergencies. By leveraging AI, real-time geospatial data, and multi-channel communication, RastaSaathi bridges the gap between accident victims and life-saving medical care.

---

## 🛠️ Implementation Status (Honest Assessment)

### 🟢 Fully Functional
- **Intelligent SOS Loop**: Captures GPS, calculates severity, and finds the best hospital using real-time Google Maps data (Distance Matrix & Places).
- **AI Medic (LLM Integration)**: Real-time first-aid guidance powered by OpenAI, Claude, or Gemini with an automated fallback/retry mechanism.
- **Multi-Lingual Engine**: Complete localization for EN, HI, TE, TA, and UR across the UI and AI responses.
- **Smart Hospital Scoring**: A proprietary algorithm that weights hospitals based on distance, ICU availability, and trauma capabilities.
- **User System**: JWT-based authentication, profile management, and emergency contact storage.

### 🟡 Functional (Requires API Keys)
- **Multi-Channel Alerts**: WhatsApp (via Twilio), SMS, and FCM Push notifications. The logic is fully implemented, but delivery requires valid service credentials.
- **Responder Dispatch**: Backend logic for finding the 5 nearest responders based on last known GPS coordinates.

### 🔵 Concepts & Future Work
- **Blockchain Transparency**: Currently implemented as a structured MongoDB audit log of AI decisions (designed for future blockchain integration).
- **Real-time Fleet Tracking**: Dashboard shows static locations; real-time movement requires active responders with GPS-enabled mobile sessions.
- **Educational Hub**: Informational pages for road safety guidelines (Static content).

---

## 🏗️ Core Architecture

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Framer Motion, TailwindCSS/Vanilla CSS |
| **Backend** | Node.js, Express, Socket.io, Redis |
| **Database** | MongoDB (Mongoose), Local Hospital Seeding |
| **AI/LLM** | Anthropic Claude / Google Gemini |
| **Geospatial** | Google Maps Platform (Places, Distance Matrix, Geolocation) |
| **Communication** | WhatsApp API, Twilio, FCM |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Google Maps API Key
- Anthropic/Gemini API Key

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/skmdsadiq1607/RastaSaathiProject.git
   cd RastaSaathiProject
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   # Create .env based on .env.example
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   # Create .env with VITE_API_BASE_URL and VITE_GOOGLE_MAPS_API_KEY
   npm run dev
   ```

---

## 👥 Team
- **Dr. Lakshmi**
- **Sadiq**
- **Krishna**
- **Chakravarthi**
- **Hasini**

---
*Developed for a safer tomorrow. 🚑*
