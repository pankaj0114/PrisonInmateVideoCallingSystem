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

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/pankaj0114/PrisonInmateVideoCallingSystem.git
cd PrisonInmateVideoCallingSystem
```

### Backend setup

```bash
cd backend
npm install
```

Create a .env file (⚠️ never commit this to GitHub):

```bash
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_API_KEY_SID=your_api_key_sid
TWILIO_API_KEY_SECRET=your_api_key_secret
TWILIO_PHONE_NUMBER=+1XXXXXXXXXX
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/prisonDB
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

### 📞 Usage

Prisoner logs in to dashboard.

Selects a family member and clicks audio or video call.

Backend creates Twilio room, sends SMS with Netlify link.

Both prisoner and family member open the link → join the Twilio room.

Call auto‑records and closes after 15 minutes.

---

### 🔒 Security Notes

Secrets (.env) must never be committed to GitHub.

Use Render’s Environment Variables to store Twilio and MongoDB credentials.

GitHub push protection will block commits containing sensitive keys.

---

### 📌 Roadmap

Add call recording storage.

Generate and export call reports.

Role‑based authentication (Admin, Prisoner, Family).

Balance deduction per call.

---

### 👨‍💻 Author

Pankaj  
Location: Yamunanagar, HR, India\
Project: Prison Inmate Video Calling Management System

---

### 📸 Screenshots
## First Page
<img width="1903" height="937" alt="Screenshot 2026-07-09 164807" src="https://github.com/user-attachments/assets/94344bd9-c3a2-43cc-ae92-2d84c48f4ee8" />

## Admin Login Page 
<img width="1896" height="1023" alt="Screenshot 2026-07-09 165129" src="https://github.com/user-attachments/assets/72c9920b-3327-41c8-a037-5f1de21dc594" />
<img width="1375" height="984" alt="Screenshot 2026-07-09 165228" src="https://github.com/user-attachments/assets/98ec798f-ee1a-4ab9-9615-92bbd0ca816d" />

## Admin Dashboard
<img width="1900" height="917" alt="Screenshot 2026-07-09 165300" src="https://github.com/user-attachments/assets/3509545e-abae-4f14-9efd-ba0cb2069188" />

## Prisoner Registration
<img width="1820" height="909" alt="Screenshot 2026-07-09 165353" src="https://github.com/user-attachments/assets/195f6e8a-5bb8-4aad-95e2-7be6c28aae6d" />
<img width="1826" height="988" alt="Screenshot 2026-07-09 170316" src="https://github.com/user-attachments/assets/f0477610-4882-4b72-84dd-576fb870221b" />
<img width="1851" height="933" alt="Screenshot 2026-07-09 170243" src="https://github.com/user-attachments/assets/1d04d892-8dc0-4843-8e7a-729ab00cc2ef" />

## Print Details of Prisoner 
<img width="1865" height="938" alt="Screenshot 2026-07-09 170351" src="https://github.com/user-attachments/assets/a77bb16e-fcc5-4b54-b356-2a60028d58c7" />


## Prisoner Login Using Their Card Number And Admission date 
<img width="1837" height="986" alt="Screenshot 2026-07-09 170701" src="https://github.com/user-attachments/assets/3d38621e-2e58-4542-a6b2-876b6ff456ad" />

## Prisoner Dashboard
<img width="1885" height="905" alt="Screenshot 2026-07-09 170747" src="https://github.com/user-attachments/assets/78a7c6b2-8574-4d88-bd59-04456c0d6ffb" />

## Prisoner Intiate Call and SMS with Call Link sent to family member 
<img width="1080" height="2400" alt="Screenshot_2026-07-09-17-09-34-198_com android mms" src="https://github.com/user-attachments/assets/94f5392a-faa2-461a-9ca4-e996aeafac48" />

# Prisoner Join Call 
<img width="1898" height="946" alt="Screenshot 2026-07-09 171004" src="https://github.com/user-attachments/assets/53f1a1a4-2383-4516-a594-f0e11126b904" />

# Family member Join the Call through Call Link sent to SMS 
<img width="1080" height="2400" alt="Screenshot_2026-07-09-17-09-45-894_com android chrome" src="https://github.com/user-attachments/assets/2b357c7e-f7fe-44cf-8682-6911bc07b147" />



### 📞 Usage
Prisoner logs in to dashboard.

Selects a family member and clicks audio or video call.

Backend creates Twilio room, sends SMS with Netlify link.

Both prisoner and family member open the link → join the Twilio room.

Call auto‑records and closes after 15 minutes.

---

### 🔒 Security Notes
Secrets (.env) must never be committed to GitHub.

Use Render’s Environment Variables to store Twilio and MongoDB credentials.

GitHub push protection will block commits containing sensitive keys.

---

### 📌 Roadmap
Add call recording storage.

Generate and export call reports.

Role‑based authentication (Admin, Prisoner, Family).

Balance deduction per call.

---
### 👨‍💻 Author
Pankaj  
Location: Yamunanagar, HR, India\
Project: Prison Inmate Video Calling Management System




## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
