// models/Wallet.js
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    walletId: { type: String, unique: true, required: true },
    prisonerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prisoner',
      required: true,
    },
    balance: { type: Number, default: 0 },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Wallet', walletSchema);
