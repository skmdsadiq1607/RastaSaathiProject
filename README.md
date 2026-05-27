# RastaSaathi: AI-Driven Emergency Response Ecosystem 🚑

**RastaSaathi** is a premium, high-precision emergency response platform engineered to optimize the **"Golden Hour"**—the critical window where medical and tactical intervention has the highest impact on survival. Developed for the **IIT Madras Road Safety Hackathon 2026**, our system integrates advanced geospatial intelligence, local spatial indexing, robust failover frameworks, and automated multi-channel dispatches to save lives at the speed of light.

---

## 🏗️ Technical Architecture & Innovation

### 1. Geospatial Grid (Ambulance, Hospital & Police Routing)
*   **Geospatial Indexing**: Utilizes MongoDB `2dsphere` indexes to query and rank facilities based on geographic coordinates with sub-meter accuracy.
*   **Decoupled Local Police & Ambulance Databases**: Integrates a dedicated local schema and seed scripts (e.g., adding Chaitanyapuri/Malakpet Police Stations and Dilsukhnagar Ambulance) to allow near-instantaneous offline proximity queries.
*   **Physical Haversine Proximity**: Pairs local calculations with Google's **Distance Matrix API** to compute live, dynamic ETAs for ambulance dispatch and trauma center routing.
*   **Resilient API Fallback Architecture**: Includes mock fallback engines for hospitals, police precincts, and ambulances that trigger seamlessly if Google APIs or local databases suffer connection lag or rate-limits.

### 2. Custom SOS Alerts & Multi-Channel Dispatch Grid
*   **Custom Incident Context**: Victims can input custom emergency messages (e.g., "Severe leg bleeding, passenger trapped...") directly within the SOS trigger panel. This context is persisted in the database and integrated across notifications and PDF incident reports.
*   **SOS Countdown Timer**: Features a pulse-animated, premium circular SOS button with a built-in 5-second countdown cancel window to prevent accidental dispatches.
*   **SMS & WhatsApp Dispatch Alerts**: Leverages Twilio to send automated, personalized SMS and WhatsApp emergency warnings containing the victim's name, custom notes, live coordinates, and one-click Google Maps navigation routing. Alert templates now dynamically sync assigned ambulance and police details.
*   **Dynamic Client-Side Map Interceptors**: Employs a front-end `MutationObserver` that intercepts and dynamically suppresses Google Maps billing warning overlays and watermarks, keeping the demo experience clean and immersive.

### 3. High-Reliability AI Medic (Local Failover)
Our AI First-Aid guidance is engineered for zero-downtime during emergency procedures:
*   **Google Gemini 1.5 Flash** (Primary Intelligence Core / Cost-Optimized)
*   **Structured Trauma Protocol** (Hardened Safety Fallback - JSON-encoded offline steps)
This ensures 100% uptime for medical guidance, automatically falling back to structured offline guidelines if API rate-limiting or network issues occur.

### 4. High-Fidelity PDF Incident Reports
*   Generates premium, print-ready, multi-page A4 PDF documents directly from the live client-side dashboard using `jsPDF` and `html2canvas` at **2x resolution**.
*   **Mathematically Precise Margin Slicing**: Implements custom white masks at the top and bottom of each page to prevent canvas elements and text boundaries from bleeding across page page-breaks.
*   **Conversational Timeline Logs**: Incorporates a chronological chat log transcript of the entire user-to-AI-Medic dialogue directly inside the PDF receipt, keeping an official audit trail for healthcare or insurance purposes.

---

## 🛠️ Complete Feature & Module Directory

### 🖥️ Frontend Views & Interactive Pages

1.  **Dashboard (Core Control Center)**:
    *   **Interactive 3D-styled SOS Button**: Features micro-animations, scaling hover states, and dynamic glow shadows.
    *   **SOS Countdown Manager**: A 5-second countdown safety lock with a cancel trigger.
    *   **Live Geospatial Map Grid**: Displays the victim's location, target trauma center, dispatched ambulance route, and nearest police stations using custom color-coded map markers.
    *   **System Status Grid**: Real-time status tracker monitoring GPS locking, hospital reservation, police dispatch, and ambulance assignment.
    *   **Interactive AI Medic Chatbot Sidebar**: Follow-up chat interface rendering markdown formatting, execution steps, and critical trauma warnings.
    *   **Actionable Dispatch Board**: Includes quick actions to launch step-by-step Google Maps driving directions and instant high-fidelity A4 PDF incident report downloads.
    *   **Custom Incident Input**: Text field for adding emergency descriptors (e.g., trapped passengers, custom trauma info) before triggering dispatch.

2.  **Profile & Personal Command Center**:
    *   **Dynamic Multi-Lingual Engine**: Integrates a localization context switcher supporting 4+ languages (English, Hindi, Telugu, Tamil, etc.).
    *   **Emergency Contact Configuration Grid**: Save up to 5 primary contacts who receive instant, automated coordinates and route dispatches on SOS.
    *   **Incident History Timeline**: Complete historical record of all past emergency dispatches showing ticket numbers, times, locations, and direct PDF receipt downloads.

3.  **Road Safety Knowledge Hub**:
    *   Interactive guideline panels on defensive driving, breakdown management, and helmet laws.
    *   Step-by-step interactive breakdown checklists (e.g., placing triangle markers, exiting vehicles).

4.  **Application Guides & Onboarding**:
    *   **User Guide**: Extensive guide detailing getting started, dashboard commands, emergency dispatches, and PDF downloads.
    *   **Mission & About Screens**: Detailing the problem statements addressed for the IIT Madras Road Safety Hackathon 2026.

---

### ⚙️ Backend Core Modules (`src/modules`)

1.  **`sos` (Emergency Orchestration)**: Handles the instant ingestion of coordinates, triggers concurrent ambulance/police/hospital queries, sends Twilio notifications, and compiles incident response payloads.
2.  **`alerts` (Automated Notifications)**: Compiles and dispatches personalized emergency SMS and WhatsApp templates containing victim details, coordinates, and navigation links.
3.  **`firstaid` (AI Diagnostic Advisory)**: Manages first-aid conversation sessions, prompts Gemini 1.5 Flash for JSON-structured instructions, and keeps local follow-up context.
4.  **`police` (Precinct Management)**: Models local police stations, executes geospatial queries using MongoDB `2dsphere` indexes, and powers the offline seeding command infrastructure.
5.  **`ambulance` (Ambulance Grid)**: Tracks ambulance fleets, queries proximity hubs, and handles nearby responder assignments.
6.  **`hospital` (Trauma Routing)**: Performs Haversine distance calculations and reserves ICU-capable trauma centers.
7.  **`auth` (Identity & Security)**: Powers user registration, login, and robust JWT session validation.
8.  **`incident` (Audit Logging)**: Stores active SOS records, generates unique receipt tracking numbers, and preserves coordinates.
9.  **`language` (Localization)**: Manages and feeds system translations for AI guidelines.
10. **`transparency` (System Audit)**: Logs AI decisions, models used, and confidence ratings for security tracking.
11. **`voice` (Speech Interfaces)**: Integrates transcription engines and voice-triggered emergency SOS detection.
12. **`severity` (Trauma Scoring)**: Runs backend weighted sorting to categorize injuries and dispatch resources based on gravity.
13. **`timeline` (Milestone Tracking)**: Logs a chronological breakdown of dispatch milestones (Ambulance dispatched, hospital reserved).
14. **`routing` (Route Optimization)**: Calculates travel paths and integrates the Google Distance Matrix.
15. **`fallback` (Resilience Layer)**: Coordinates local offline geo-database failovers if internet connectivity or Google APIs are interrupted.
16. **`workflow` (Agency Sync)**: Automates multi-agency notifications between ambulances, trauma centers, and precincts.
17. **`summary` (Incident Evaluation)**: Generates post-emergency metrics.
18. **`insights` (Safety Analysis)**: Pulls statistical records to map accident hotspots.
19. **`dashboard` (API Services)**: Feeds overall status indicators to the frontend.
20. **`resources` (Supply Grid)**: Tracks available rescue equipment and specialist rosters.

---

## 🛠️ Feature Matrix

| Feature | Status | Technology |
| :--- | :--- | :--- |
| **SOS Trigger & GPS Probe** | 🟢 Production | Geolocation API + MongoDB Geospatial Indexing |
| **Custom Incident Notes** | 🟢 Production | Persistent Mongoose Schema + React UI Controller |
| **Ambulance & Police Grid** | 🟢 Production | MongoDB `2dsphere` + Proximity Sort + Local Database Seeding |
| **AI First-Aid Assistant** | 🟢 Production | Google Gemini 1.5 Flash + Local Structured JSON Fallback |
| **WhatsApp/SMS Alert Grid** | 🟢 Production | Twilio API + Dynamic Ambulance/Police Alert Sync |
| **Multi-Lingual UI (4+ Langs)** | 🟢 Production | Context API + Localization Engine |
| **Premium High-Res PDF Reporting**| 🟢 Production | `jsPDF` + `html2canvas` + Page Margin Masking |
| **Resilient Mock API Fallback Layer**| 🟢 Production | Automated Local Database & Places API Mocking |
| **Chronological Audit Trail** | 🟢 Production | AI Decision Logging + Incident Timelines |

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
   # Seeds the local geospatial collections with pre-defined trauma centers, ambulances, and police precincts
   node src/modules/police/seed.js
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
