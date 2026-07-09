const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

// POST /api/send-sms
router.post('/send-sms', async (req, res) => {
  const { phone, sessionId } = req.body;

  try {
    // Build call link automatically with sessionId + uid
    const callLink = `https://yourapp.com/call/${sessionId}?uid=${phone}`;

    await client.messages.create({
      body: `You have a new prison call. Join here: ${callLink}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`, // 👈 prepend +91 for Indian numbers
    });

    res.json({ message: 'SMS sent successfully', callLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
