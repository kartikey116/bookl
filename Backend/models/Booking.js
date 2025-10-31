import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experience', // Links to the Experience model
      required: true,
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId, // This is the _id of the slot in the Experience.slots array
      required: true,
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

// Prevent double-booking for the same slot and email
BookingSchema.index({ slotId: 1, email: 1 }, { unique: true });

export default mongoose.model('Booking', BookingSchema);
