# RastaSaathi: AI-Driven Emergency Response Ecosystem 🚑

**RastaSaathi** is a high-precision, premium emergency response platform engineered to optimize the **"Golden Hour"**—the critical window where rapid medical and tactical intervention has the highest impact on survival. Developed for the **IIT Madras Road Safety Hackathon 2026**, our system integrates advanced geospatial intelligence, local spatial indexing, robust failover frameworks, and automated multi-channel dispatches to save lives at the speed of light.

---

## 🚨 Problems Faced by the People

Every year, millions of lives are lost on roads due to critical delays and friction points in emergency response grids. The key challenges faced by citizens include:

*   **The Golden Hour Delay**: Victims of severe road trauma often fail to receive medical intervention during the critical first hour, which drastically reduces survival rates.
*   **Geospatial Misrouting**: Standard map services only rank facilities by simple distance. They fail to evaluate real-time travel times (ETAs) or verify if the destination facility has specialized ICU or trauma capabilities.
*   **Communication Silos**: Responders, police stations, hospitals, and the victim's emergency contacts operate in isolated silos, leading to coordination lags.
*   **API & Network Vulnerabilities**: Complete reliance on external, single-point remote APIs (for routing or AI) poses a massive risk of system blackouts during live emergencies.
*   **First-Aid Language Barriers**: Victims and bystanders often lack immediate, step-by-step first-aid guidance delivered in their native languages while waiting for responders to arrive on site.

---

## 🛠️ Features We Implemented

### 🚨 1. Emergency Road SOS & Location Tracking
At the core of the platform is a pulse-animated, premium circular SOS button on the dashboard. 
*   **Countdown Lock**: Built-in 5-second countdown with an instantaneous cancel trigger to prevent accidental alerts.
*   **Precision Location Probe**: Immediately captures the victim's exact GPS coordinates upon trigger activation.
*   **Custom Incident Notes**: Allows users to input specific emergency descriptors (e.g., trapped passengers, severe bleeding) directly before firing the dispatch.

### 🗺️ 2. Dynamic Hospital & Police Proximity Routing
Once the SOS is triggered, the system resolves coordinates in real time:
*   **ICU Proximity Sorting**: Identifies and reserves the closest hospital equipped with specialized ICU trauma capabilities using a physical Haversine proximity engine.
*   **Decoupled Police & Ambulance Databases**: Implements a local MongoDB database with `2dsphere` spatial indexing for instant offline routing to local police stations and ambulance hubs (e.g., Chaitanyapuri Precinct, Dilsukhnagar Ambulance).
*   **Resilient Fallbacks**: Integrated mock fallback layers step in automatically to provide reliable routing if Google Places or database clusters encounter network lag.

### 🧠 3. Interactive AI Medic Chatbot
Provides real-time, step-by-step first-aid instructions directly inside the dashboard chatbot sidebar while the ambulance is in transit.
*   **Intelligent Medical Advisory**: Leverages the AI core to parse incident context and output instructions containing execution steps, warnings, and escalation guidelines.
*   **Localization Support**: Communicates natively in the language selected in the user's profile (English, Hindi, Telugu, Tamil).

### 📄 4. High-Fidelity PDF Incident Reports
Ensures transparency and official record-keeping by generating premium, print-ready A4 PDF emergency receipts directly from the client-side dashboard.
*   **Page Margin Masking**: Employs mathematically precise top and bottom white margin masks to ensure text boundaries never bleed across page breaks.
*   **Conversational Transcript Logs**: Prints the complete, chronological chat history of the user-to-AI-Medic dialogue inside the document to serve as an audit-ready receipt for medical or legal verification.

### 💬 5. Multi-Channel Contact Alerts
Concurrently notifies the victim's emergency contact list (up to 5 pre-configured numbers) to build a supportive local emergency network.
*   **Automated Dispatches**: Transmits personalized Twilio SMS and WhatsApp templates.
*   **Live Route Syncing**: Messages automatically bundle the victim's name, custom notes, live coordinates, and a one-click Google Maps driving link directing contacts from their location to the reserved hospital.

---

## 💻 Technical Stack & AI Integration

The RastaSaathi platform is built using a highly resilient, modern engineering stack:

### Core Frameworks
*   **Frontend**: Built with **React.js** (Vite), leveraging **Framer Motion** for premium interactive animations, **Lucide React** for modern iconography, and **Google Map React** for real-time spatial rendering.
*   **Backend**: Powered by **Node.js** and **Express**, using **Mongoose** for data modeling and **Winston** for production-grade logging.
*   **Database**: **MongoDB Atlas** utilizing `2dsphere` geographic indexing for high-precision, coordinate-based spatial queries.

### API Integrations & Communication Grid
*   **Google Gemini API**: Powered by the **Gemini 1.5 Flash** model to drive the interactive AI Medic chatbot, generating fast and optimized diagnostic responses.
*   **Google Maps Platform**: Integrates the **Distance Matrix API** to compute mathematically precise driving routes and ETAs.
*   **Twilio API**: Leverages the Twilio SMS and WhatsApp Business APIs to broadcast dynamic, automated emergency notifications.
*   **Client-Side Map Interceptor**: Frontend `MutationObserver` suppresses Google Maps billing warnings to preserve a clean demo view.

---

## 👥 The Engineering Team
*   **Dr. Lakshmi**
*   **Sadiq**
*   **Krishna**
*   **Chakravarthi**
*   **Hasini**

---

## 🚀 Deployment Guide

### 1. Clone the Infrastructure
```bash
git clone https://github.com/skmdsadiq1607/RastaSaathiProject.git
cd RastaSaathiProject
```

### 2. Backend Setup
```bash
cd Backend
npm install
# Configure your .env file with your API Keys & MongoDB URI
```

### 3. Seed Geospatial Assets
```bash
# Seeds the database with pre-configured trauma centers, local police precincts, and ambulance hubs
npm run seed:hospitals
node scripts/seedPolice.js
node scripts/seedAmbulances.js
node scripts/seedIncidents.js
```

### 4. Run Servers
```bash
# Start Backend (Port 3000 by default)
npm start

# Start Frontend (Port 5173 by default)
cd ../Frontend
npm install
npm run dev
```

---

> [!IMPORTANT]
> This project is a submission for the **IIT Madras Road Safety Hackathon 2026**. It represents a highly scalable, production-ready solution to India's road safety and trauma response crisis.

*Engineered for life. Empowering the Golden Hour. 🚑*
