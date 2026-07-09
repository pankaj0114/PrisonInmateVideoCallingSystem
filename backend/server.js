const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const dns = require('dns');
const twilio = require('twilio');
const Call = require('./src/models/Call');
const router = express.Router();

dns.setServers(['8.8.8.8', '1.1.1.1']);

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

// Import routes
const adminRoutes = require('./src/routes/adminRoutes');
const prisonerRoutes = require('./src/routes/prisonerRoutes');
const smsRoutes = require('./src/routes/sms');
const callRoutes = require('./src/routes/callRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(callRoutes);

//const callRoutes = require('./routes/callRoutes');

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/prisoner', prisonerRoutes);
app.use('/api', smsRoutes);

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log('✅ MongoDB Connection Established Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

/**
 * Twilio Call Creation + SMS Invite
 */

router.post('/api/start-call', async (req, res) => {
  const { roomName, phone, type, prisonerId } = req.body;

  try {
    // Create Twilio room with recording enabled
    const room = await client.video.rooms.create({
      uniqueName: roomName,
      type: 'group', // Twilio supports "group" or "go"
      recordParticipantsOnConnect: true, // ✅ auto-record
    });

    // Send SMS invite with your deployed Netlify link
    const message = await client.messages.create({
      body: `Join the ${type} call: https://relaxed-longma-050349.netlify.app/index.html?roomName=${room.uniqueName}&type=${type}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone.startsWith('+') ? phone : `+91${phone}`,
    });

    // Save call record in MongoDB
    const call = new Call({
      prisonerId,
      familyPhone: phone,
      roomName: room.uniqueName,
      type,
      smsSid: message.sid,
      roomSid: room.sid,
    });
    await call.save();

    // Auto-close room after 15 minutes
    setTimeout(
      async () => {
        try {
          await client.video.rooms(roomName).update({ status: 'completed' });
          console.log(`✅ Room ${roomName} closed after 15 minutes`);
        } catch (err) {
          console.error('❌ Failed to close room:', err.message);
        }
      },
      15 * 60 * 1000,
    );

    res.json({ roomName: room.uniqueName });
  } catch (error) {
    console.error('❌ Call creation failed:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
// Sample Route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start Server

//const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});

/*
app.listen(PORT, () => {
  console.log(`🚀 Server is listening dynamically on port ${PORT}`);
});*/
