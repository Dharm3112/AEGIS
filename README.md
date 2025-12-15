# 🛡️ AEGIS (LifeLine) - Intelligent Disaster Response Platform

> **A Hyper-Local Crisis Management System connecting Victims, Volunteers, and NGOs in real-time.**

![Project Status](https://img.shields.io/badge/Status-Prototype-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-PERN%20%2B%20Python-orange?style=for-the-badge)

---

## 📖 Overview

**AEGIS** is a unified disaster response platform designed to bring order to chaos. During floods, fires, or earthquakes, communication breakdowns cost lives. AEGIS solves this by providing:

1.  **Victims:** An "Offline-First" Mobile App to send SOS signals with one tap.
2.  **NGOs:** A "Command Center" Web Dashboard to visualize crisis zones on a real-time heatmap.
3.  **AI Integration:** An intelligent Python microservice that analyzes distress messages and auto-prioritizes them (e.g., "Heart Attack" > "Need Water").

---

## 🏗️ Architecture

The project follows a **Microservices-inspired** architecture to ensure scalability and separation of concerns.

```mermaid
graph TD
    A["Mobile App (React Native)"] -->|"SOS + GPS"| B("Node.js Backend")
    C["Web Dashboard (React)"] <-->|"Real-time Socket"| B
    B <-->|"Store Data"| D[("PostgreSQL DB")]
    B <-->|"Analyze Text"| E["Python AI Service"]
````

### 💻 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Mobile App** | React Native (Expo) | Cross-platform (iOS/Android) for field operations. |
| **Web Dashboard** | React.js + Leaflet | Admin Command Center for visualizing data. |
| **Main Backend** | Node.js (Express) | API Gateway, Auth, and Business Logic. |
| **AI Service** | Python (FastAPI) | NLP Microservice for urgency detection. |
| **Database** | PostgreSQL | Relational database for persistent storage. |

-----

## ✨ Key Features

### 📱 Mobile App (Field Unit)

  * **One-Tap SOS:** Instantly captures GPS coordinates and sends a distress signal.
  * **Live Status:** Real-time feedback on ticket status (Open/In Progress).
  * **Offline Mode:** (Planned) Caches requests locally when network is down.

### 🖥️ Web Dashboard (Command Center)

  * **Live Crisis Map:** Interactive map rendering SOS clusters using `Leaflet`.
  * **AI Triage:** Color-coded tickets based on AI priority scores (Red = Critical, Yellow = Moderate).
  * **Real-Time Updates:** New SOS alerts appear instantly without refreshing the page.

### 🧠 AI Analysis

  * **Smart Parsing:** Detects keywords like "Fire", "Blood", "Trapped" to assign urgency scores (1-5).

-----

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

  * Node.js (v16+)
  * Python (v3.9+)
  * PostgreSQL
  * Expo Go App (on your phone)

### 1\. Database Setup

1.  Open **pgAdmin** or your SQL terminal.
2.  Create a database named `AEGIS`.
3.  Run the following SQL script to initialize the table:
    ```sql
    CREATE TABLE sos_requests (
        id SERIAL PRIMARY KEY,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        description TEXT,
        priority_score INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'OPEN',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

### 2\. AI Microservice (Python)

Navigate to the `ai-service` folder:

```bash
cd ai-service
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```

*The AI Service is now running on port 8000.*

### 3\. Main Backend (Node.js)

Open a new terminal and navigate to `backend-node`:

```bash
cd backend-node
npm install
node server.js
```

*The Server is now running on port 5000.*
*(Note: Ensure your database credentials in `server.js` are correct)*

### 4\. Web Dashboard

Open a new terminal and navigate to `web-client`:

```bash
cd web-client
npm install
npm run dev
```

*Click the localhost link to open the Command Center.*

### 5\. Mobile App

Open a new terminal and navigate to `mobile-app`:

```bash
cd mobile-app
npm install
npx expo start
```

*Scan the QR code with your phone (Android/iOS).*
*(Note: Ensure the API URL in `App.tsx` points to your PC's IP address, not localhost)*

-----

<!-- ## 📸 Screenshots

| Mobile SOS | Web Command Center |
| :---: | :---: |
| *(Add Screenshot Here)* | *(Add Screenshot Here)* |

-----
-->
## 🔮 Future Roadmap

  * [ ] **Authentication:** Add JWT Login for Volunteers and Admins.
  * [ ] **Geofencing:** Auto-alert volunteers within 5km of an incident.
  * [ ] **Chat System:** Live chat between Victims and Rescuers using Socket.io.
  * [ ] **Inventory Management:** Track food/water supplies at relief camps.

-----

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<p align="center">
  <b>Serenipy</b> • Created by <a href="https://github.com/Dharm3112"><b>Dharm Patel</b></a>
</p>

