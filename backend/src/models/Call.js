const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  prisonerId: { type: String, required: true },
  familyPhone: { type: String, required: true },
  roomName: { type: String, required: true },
  type: { type: String, enum: ['audio', 'video'], required: true },
  createdAt: { type: Date, default: Date.now },
  smsSid: { type: String },
  roomSid: { type: String },
});

module.exports = mongoose.model('Call', callSchema);
