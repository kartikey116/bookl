import mongoose from 'mongoose';

const PromoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  discount: {
    type: Number, 
    required: true,
    min: 0.01,
    max: 1.0,
  },
  isFlat: {
    type: Boolean,
    default: false, 
  },
  expiresAt: {
    type: Date,
    default: null, 
  },
});

export default mongoose.model('PromoCode', PromoCodeSchema);
