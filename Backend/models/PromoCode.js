import mongoose from 'mongoose';

const PromoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  discount: {
    type: Number, // Represents the percentage (e.g., 0.1 for 10%)
    required: true,
    min: 0.01,
    max: 1.0,
  },
  isFlat: {
    // We will stick to percentage discounts for this project as per my first response
    // But this schema supports flat discounts if needed
    type: Boolean,
    default: false, 
  },
  expiresAt: {
    type: Date,
    default: null, // Can be set to make codes expire
  },
});

export default mongoose.model('PromoCode', PromoCodeSchema);
