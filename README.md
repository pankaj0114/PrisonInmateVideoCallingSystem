# Prison Inmate Video Calling Management System

A MERN‑stack application that enables secure **audio/video calls** between prisoners and their family members.  
The system integrates **Twilio Video API** for real‑time communication, **MongoDB Atlas** for data storage,  
Additionally, **Supabase Storage** is used for handling prisoner photo uploads, providing a Cloudinary‑like solution for storing and retrieving images securely.

## 🚀 Features

- Prisoner dashboard with profile details and call initiation.
- Family member management with SMS notifications.
- One‑click **audio/video call** creation via Twilio.
- Secure Twilio room creation with auto‑recording and timed closure.
- Call logs stored in MongoDB Atlas.
- Responsive UI with modern call controls (mute/unmute, camera toggle, disconnect).

---

## 🛡️ Admin Functionality

Prisoner Management → Add/edit/remove prisoner records, manage balances.

Family Member Management → Approve/block family members linked to prisoners.

Call Monitoring → View active calls, monitor duration, force‑end calls.

Reports & Logs → Generate/export call history reports.

## Security Controls → Configure call duration, recording policies.

## 📸 Supabase Functionality

Photo Uploads → Prisoner registration flow integrates Supabase Storage for uploading prisoner photos.

Public Buckets → Photos stored in a public bucket, accessible via direct URLs.

Cloudinary‑like Storage → Supabase acts as a free alternative to Cloudinary for image hosting.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), HTML/CSS, Netlify deployment
- **Backend**: Node.js, Express.js, Render deployment
- **Database**: MongoDB Atlas
- **Communication**: Twilio Video + Twilio SMS

---

## 📂 Project Structure

PrisonInmateVideoCallingSystem/\
│\
├── backend/ # Express server, Twilio integration, MongoDB models\
│ ├── routes/ # API routes (/api/start-call, /api/token, /api/admin)\
│ ├── models/ # Mongoose schemas (Prisoner, FamilyMember, Call, Admin)\
│ └── server.js # Main backend entry point\
│\
├── frontend/ # React app (PrisonerDashboard, Call page, Admin panel)\
│ ├── src/\
│ │ ├── components/ # Shared UI components\
│ │ ├── pages/ # PrisonerDashboard.jsx, CallPage.jsx, AdminDashboard.jsx\
│ │ └── services/ # API service layer (axios calls to backend,Supabaseclient)\
│ └── index.html # Twilio call page deployed on Netlify\
│\
├── admin/ # Admin module\
│ ├── AdminDashboard.jsx # React component for admin panel\
│ ├── AdminRoutes.js # Backend routes for admin actions\
│ └── AdminController.js # Logic for managing prisoners, calls, reports\
│\
└── README.md # Project documentation\
