import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experience',
      required: true,
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [
        /^\S+@\S+\.\S+$/,
        'Please provide a valid email address',
      ],
    },
    promoCode: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ slotId: 1, email: 1 }, { unique: true });

export default mongoose.model('Booking', BookingSchema);
