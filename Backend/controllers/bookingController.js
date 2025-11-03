import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import Booking from '../models/Booking.js';
import { asyncHandler } from '../middleware/ErrorHandler.js';

const createBooking = asyncHandler(async (req, res, next) => {
  const { experienceId, slotId, name, email, promoCode } = req.body;

  if (!experienceId || !slotId || !name || !email) {
    res.status(400);
    throw new Error('Please provide all required fields: experience, slot, name, and email.');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const experience = await Experience.findById(experienceId).session(session);
    if (!experience) {
      res.status(404);
      throw new Error('Experience not found');
    }

    const slot = experience.slots.id(slotId); 
    if (!slot) {
      res.status(404);
      throw new Error('Slot not found');
    }

    if (slot.available <= 0) {
      res.status(400);
      throw new Error('This slot is sold out.');
    }

    slot.available -= 1;
    await experience.save({ session });

    const [booking] = await Booking.create(
      [
        {
          experience: experienceId,
          slotId,
          name,
          email,
          promoCode: promoCode || null,
        },
      ],
      { session } 
    );
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      bookingId: booking._id,
      message: 'Booking confirmed!',
      details: {
        name: booking.name,
        title: experience.title,
        date: new Date(slot.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        time: slot.time,
      },
    });

  } catch (error) {
    await session.abortTransaction();
    
    next(error);

  } finally {
    session.endSession();
  }
});

export default createBooking;