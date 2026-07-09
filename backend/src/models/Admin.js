// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    adminId: { type: String, unique: true, required: true }, // system-generated ID
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, enum: ['SuperAdmin', 'PrisonAdmin'], required: true },
    //prisonAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Prison' }, // link to prison
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    lastLogin: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // who added this admin
  },
  { timestamps: true },
);

module.exports = mongoose.model('Admin', adminSchema);
