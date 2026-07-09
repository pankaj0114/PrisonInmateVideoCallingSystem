// controllers/adminController.js
const Admin = require('../models/Admin');
const Prisoner = require('../models/Prisoner');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// register admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      adminId: `ADM-${Date.now()}`,
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      createdBy: req.user?.id || null,
    });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//admin login

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, role: admin.role }, // include role
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    admin.lastLogin = new Date();
    await admin.save();

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// add new admin

exports.addNewAdmin = async (req, res) => {
  try {
    if (req.user.role !== 'SuperAdmin')
      return res.status(403).json({ message: 'Access denied' });

    const { name, email, phone, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      adminId: `ADM-${Date.now()}`,
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      createdBy: req.user.id,
    });
    await newAdmin.save();
    res.status(201).json({ message: 'New admin added', newAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//register prisoner

//const Prisoner = require('../models/Prisoner');

// Register Prisoner
exports.registerPrisoner = async (req, res) => {
  try {
    const prisoner = new Prisoner({
      prisonerId: `PR-${Date.now()}`,
      name: req.body.name,
      photoUrl: req.body.photoUrl,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      gender: req.body.gender,
      age: req.body.age,
      dob: req.body.dob,

      // ✅ updated fields
      idProofType: req.body.idProofType,
      idNumber: req.body.idNumber,

      religion: req.body.religion,
      nationality: req.body.nationality,
      state: req.body.state,
      district: req.body.district,
      address: req.body.address,
      prisonName: req.body.prisonName,
      admissionDate: new Date(req.body.admissionDate),
      prisonCardNumber: req.body.prisonCardNumber,
      emergencyContacts: req.body.emergencyContacts,
      rfidprisonCardNumber: req.body.rfidprisonCardNumber,
      balance: req.body.balance || 0,
      registeredBy: req.user.id,
    });

    await prisoner.save();
    res.status(201).json({
      message: 'Prisoner registered successfully',
      prisoner,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Prisoner Details
exports.getPrisonerDetails = async (req, res) => {
  try {
    const prisoner = await Prisoner.findById(req.params.id);
    if (!prisoner) {
      return res.status(404).json({ message: 'Prisoner not found' });
    }
    res.json(prisoner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Balance
exports.updateBalance = async (req, res) => {
  try {
    const { prisonCardNumber, balance } = req.body;
    const prisoner = await Prisoner.findOne({ prisonCardNumber });
    if (!prisoner) {
      return res.status(404).json({ message: 'Prisoner not found' });
    }

    prisoner.balance = balance;
    await prisoner.save();
    res.json({
      message: 'Balance updated',
      balance: prisoner.balance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
