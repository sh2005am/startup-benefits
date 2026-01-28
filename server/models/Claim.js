import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved',
  },
  claimedAt: {
    type: Date,
    default: Date.now,
  },
});

// to make the user unable to claim the same deal twice
claimSchema.index({ user: 1, deal: 1 }, { unique: true });

export default mongoose.model('Claim', claimSchema);