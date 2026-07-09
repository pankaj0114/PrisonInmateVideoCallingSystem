// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    transactionId: { type: String, unique: true, required: true },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true,
    },
    type: {
      type: String,
      enum: ['recharge', 'deduction', 'refund'],
      required: true,
    },
    amount: { type: Number, required: true },
    balanceBefore: Number,
    balanceAfter: Number,
    receiptUrl: String, // PDF receipt generated
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Transaction', transactionSchema);
