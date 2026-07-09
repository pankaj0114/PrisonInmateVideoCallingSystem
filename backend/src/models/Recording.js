// models/Recording.js
const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema(
  {
    recordingId: { type: String, unique: true, required: true },
    callId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Call',
      required: true,
    },
    prisonerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prisoner',
      required: true,
    },
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FamilyMember',
      required: true,
    },
    fileUrl: { type: String, required: true }, // stored in AWS S3 / Cloudinary
    metadata: {
      size: Number,
      format: String,
      duration: Number,
    },
    retentionPolicy: {
      type: String,
      enum: ['30_days', '90_days', '1_year'],
      default: '90_days',
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Recording', recordingSchema);
