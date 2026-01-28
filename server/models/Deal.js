import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  partnerName: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  // "Locked" vs "Public"
  accessLevel: {
    type: String,
    enum: ['public', 'restricted'],
    default: 'public',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Deal', dealSchema);