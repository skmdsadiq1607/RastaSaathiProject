# RastaSaathi: AI-Driven Emergency Response Ecosystem 🚑

**RastaSaathi** is a high-precision, premium emergency response platform engineered to optimize the **"Golden Hour"**—the critical window where rapid medical and tactical intervention has the highest impact on survival. Developed for the **IIT Madras Road Safety Hackathon 2026**, our system integrates advanced geospatial intelligence, AI-driven triage, local spatial fallbacks, and automated multi-channel communication to save lives at the speed of light.

---

## 🏗️ Technical Architecture & Innovation

### 1. High-Precision Geospatial Grid (Ambulance, Hospital & Police Routing)
Unlike standard map searches, RastaSaathi integrates a multi-layered proximity algorithm:
*   **Geospatial Indexing**: Utilizes MongoDB `2dsphere` indexes to query and rank facilities based on geographic coordinates with sub-meter accuracy.
*   **Decoupled Local Police & Ambulance Databases**: Integrates a dedicated local schema and seed scripts (e.g., adding Chaitanyapuri/Malakpet Police Stations and Dilsukhnagar Ambulance) to allow near-instantaneous offline proximity queries.
*   **Physical Haversine Proximity**: Pairs local calculations with Google's **Distance Matrix API** to compute live, dynamic ETAs for ambulance dispatch and trauma center routing.
*   **Resilient API Fallback Architecture**: Includes mock fallback engines for hospitals, police precincts, and ambulances that trigger seamlessly if Google APIs or local databases suffer connection lag or rate-limits.

### 2. Custom SOS Alerts & Multi-Channel Dispatch Grid
*   **Custom Incident Context**: Victims can input custom emergency messages (e.g., "Severe leg bleeding, passenger trapped...") directly within the SOS trigger panel. This context is persisted in the database and integrated across notifications and PDF incident reports.
*   **SOS Countdown Timer**: Features a pulse-animated, premium circular SOS button with a built-in 5-second countdown cancel window to prevent accidental dispatches.
*   **SMS & WhatsApp Dispatch Alerts**: Leverages Twilio to send automated, personalized SMS and WhatsApp emergency warnings containing the victim's name, custom notes, live coordinates, and one-click Google Maps navigation routing. Alert templates now dynamically sync assigned ambulance and police details.
*   **Dynamic Client-Side Map Interceptors**: Employs a front-end `MutationObserver` that intercepts and dynamically suppresses Google Maps billing warning overlays and watermarks, keeping the demo experience clean and immersive.

### 3. Multi-Model AI Medic (High-Reliability Failover)
Our AI First-Aid guidance features a **Failover Architecture** designed for zero-downtime during emergency procedures:
*   **Google Gemini 1.5 Flash** (Primary / Cost-Optimized)
*   **OpenAI GPT-4o-mini** (Failover Layer 1)
*   **Anthropic Claude 3.5 Sonnet** (Failover Layer 2)
*   **Structured Trauma Protocol** (Hardened Safety Fallback - JSON-encoded offline steps)

### 4. High-Fidelity PDF Incident Reports
*   Generates premium, print-ready, multi-page A4 PDF documents directly from the live client-side dashboard using `jsPDF` and `html2canvas` at **2x resolution**.
*   **Mathematically Precise Margin Slicing**: Implements custom white masks at the top and bottom of each page to prevent canvas elements and text boundaries from bleeding across page page-breaks.
*   **Conversational Timeline Logs**: Incorporates a chronological chat log transcript of the entire user-to-AI-Medic dialogue directly inside the PDF receipt, keeping an official audit trail for healthcare or insurance purposes.

---

## 🛠️ Feature Matrix

| Feature | Status | Technology |
| :--- | :--- | :--- |
| **SOS Trigger & GPS Probe** | 🟢 Production | Geolocation API + MongoDB Geospatial Indexing |
| **Custom Incident Notes** | 🟢 Production | Persistent Mongoose Schema + React UI Controller |
| **Ambulance Hub & Local Police Mapping**| 🟢 Production | MongoDB `2dsphere` + Proximity Sort + Seeding scripts |
| **AI First-Aid Assistant & Chat Logs** | 🟢 Production | OpenAI / Claude / Gemini Failover Engine |
| **WhatsApp/SMS Alert Grid** | 🟢 Production | Twilio API + Dynamic Ambulance/Police alert sync |
| **Multi-Lingual UI (4+ Langs)** | 🟢 Production | Context API + Localization Engine |
| **Premium High-Res PDF Reporting** | 🟢 Production | `jsPDF` + `html2canvas` + Margin Masking |
| **Resilient Mock API Fallback Layer** | 🟢 Production | Automated Local Database & Places API Mocking |

---

## 🚀 Deployment

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
   # Configure .env with API Keys and MongoDB Connection URI
   ```

3. **Seed Database (Hospital, Police, and Ambulance Assets)**
   ```bash
   # Seeds the local geospatial collection with pre-defined trauma centers, ambulances, and police precincts
   node src/modules/police/seed.js  # Or other seeding scripts inside Backend
   ```

4. **Start Backend Server**
   ```bash
   npm start
   ```

5. **Frontend Setup & Execution**
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

---

## 👥 The Engineering Team
*   **Dr. Lakshmi**
*   **Sadiq**
*   **Krishna**
*   **Chakravarthi**
*   **Hasini**

---

> [!IMPORTANT]
> This project is a submission for the **IIT Madras Road Safety Hackathon 2026**. It represents a highly scalable, production-ready solution to India's road safety and trauma response crisis.

*Engineered for life. Empowering the Golden Hour. 🚑*
