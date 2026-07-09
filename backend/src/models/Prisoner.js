// models/Prisoner.js
const mongoose = require('mongoose');

const prisonerSchema = new mongoose.Schema(
  {
    prisonerId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    photoUrl: String,
    fatherName: String,
    motherName: String,
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    age: Number,
    dob: Date,

    // New ID Proof fields
    idProofType: {
      type: String,
      enum: ['Aadhaar Card', 'Passport', 'Voter ID Card'],
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (this.idProofType === 'Aadhaar Card') {
            return /^\d{12}$/.test(value); // Aadhaar must be 12 digits
          }
          if (this.idProofType === 'Passport') {
            return /^[A-Za-z0-9]{8}$/.test(value); // Passport must be 8 alphanumeric
          }
          if (this.idProofType === 'Voter ID Card') {
            return /^[A-Za-z0-9]{10}$/.test(value); // Voter ID must be 10 alphanumeric
          }
          return false;
        },
        message: (props) =>
          `${props.value} is not valid for the selected ID proof type`,
      },
    },

    religion: String,
    nationality: String,
    state: String,
    district: String,
    address: String,

    // ✅ New Prison Card Number field
    prisonCardNumber: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          return /^\d{16}$/.test(value); // must be exactly 16 digits
        },
        message: (props) =>
          `${props.value} is not a valid 16-digit Prison Card Number`,
      },
    },

    // ✅ Admission date now required
    admissionDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date(); // must be today or earlier
        },
        message: 'Admission date cannot be in the future',
      },
    },
    releaseDate: Date,
    emergencyContacts: [{ name: String, phone: String }],
    rfidprisonCardNumber: { type: String, unique: true, sparse: true },
    balance: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'released'], default: 'active' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Prisoner', prisonerSchema);
