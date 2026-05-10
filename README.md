# RastaSaathi 🚑

**RastaSaathi** is a state-of-the-art emergency response platform designed for the **IIT Madras Road Safety Hackathon 2026**. It leverages Artificial Intelligence, Geospatial Mapping, and Instant Messaging to eliminate delays in road accident response.

## 🚀 Key Features

- **Instant SOS:** One-tap emergency trigger that alerts contacts via WhatsApp with live location data.
- **AI Triage Brain:** Powered by Claude 3.5 & Gemini 1.5. Predicts severity and provides interactive first-aid instructions.
- **Smart Hospital Routing:** Geospatially maps **337+ hospitals** in Hyderabad to find the nearest facility equipped for specific trauma levels.
- **Interactive Map:** Live Google Maps HUD showing victim location and hospital destination.
- **Premium UI:** Modern Glassmorphism design built with React, Framer Motion, and Lucide.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Framer Motion, Axios, Google Maps SDK.
- **Backend:** Node.js, Express, MongoDB Atlas.
- **AI:** Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Flash (with automatic rotation/fallback).
- **Communication:** Twilio WhatsApp API.
- **Authentication:** Google OAuth 2.0.

## ⚙️ Setup & Installation

### Backend
1. `cd Backend`
2. `npm install`
3. Create a `.env` file with your `MONGODB_URI`, `GOOGLE_MAPS_API_KEY`, `TWILIO_AUTH_TOKEN`, and AI keys.
4. Run `npm run seed:hospitals` to populate the 337 hospital database.
5. Run `npm run dev` to start the server.

### Frontend
1. `cd Frontend`
2. `npm install`
3. Create a `.env` file with `VITE_GOOGLE_MAPS_API_KEY` and `VITE_API_BASE_URL`.
4. Run `npm run dev` to start the web app.

## 🏆 Hackathon Credits
Built with ❤️ for the **IIT Madras Road Safety Hackathon 2026**.
