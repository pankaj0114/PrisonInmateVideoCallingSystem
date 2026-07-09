const express = require('express');
const router = express.Router();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);
const Call = require('../models/Call');

router.post('/api/start-call', async (req, res) => {
  const { roomName, phone, type, prisonerId } = req.body;

  try {
    const room = await client.video.rooms.create({
      uniqueName: roomName,
      type: 'group',
      recordParticipantsOnConnect: true,
    });

    const message = await client.messages.create({
      body: `Join the ${type} call: https://relaxed-longma-050349.netlify.app/index.html?roomName=${room.uniqueName}&type=${type}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone.startsWith('+') ? phone : `+91${phone}`,
    });

    const call = new Call({
      prisonerId,
      familyPhone: phone,
      roomName: room.uniqueName,
      type,
      smsSid: message.sid,
      roomSid: room.sid,
    });
    await call.save();

    // Auto-close after 15 minutes
    setTimeout(
      async () => {
        await client.video.rooms(roomName).update({ status: 'completed' });
        console.log(`✅ Room ${roomName} closed after 15 minutes`);
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
