const Prisoner = require('../models/Prisoner');

exports.loginPrisoner = async (req, res) => {
  try {
    const { prisonCardNumber, admissionDate } = req.body;

    if (!prisonCardNumber || !admissionDate) {
      return res
        .status(400)
        .json({ message: 'Card number and admission date are required' });
    }

    const parsedDate = new Date(admissionDate);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: 'Invalid admission date format' });
    }

    const prisoner = await Prisoner.findOne({
      prisonCardNumber,
      admissionDate: parsedDate,
    });

    if (!prisoner) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      prisoner: {
        prisonerId: prisoner.prisonerId,
        name: prisoner.name,
        photoUrl: prisoner.photoUrl,
        idProofType: prisoner.idProofType,
        idNumber: prisoner.idNumber,
        prisonCardNumber: prisoner.prisonCardNumber,
        admissionDate: prisoner.admissionDate,
        balance: prisoner.balance,
        emergencyContacts: prisoner.emergencyContacts,
      },
    });
  } catch (err) {
    console.error(err); // log the error in backend console
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
