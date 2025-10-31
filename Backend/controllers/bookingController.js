import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import Booking from '../models/Booking.js';
import { asyncHandler } from '../middleware/ErrorHandler.js';

const createBooking = asyncHandler(async (req, res, next) => {
  const { experienceId, slotId, name, email, promoCode } = req.body;

  // 1. Basic validation
  if (!experienceId || !slotId || !name || !email) {
    res.status(400);
    throw new Error('Please provide all required fields: experience, slot, name, and email.');
  }

  // 2. Start a MongoDB session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 3. Find the experience and the specific slot
    const experience = await Experience.findById(experienceId).session(session);
    if (!experience) {
      res.status(404);
      throw new Error('Experience not found');
    }

    const slot = experience.slots.id(slotId); // Find sub-document by its _id
    if (!slot) {
      res.status(404);
      throw new Error('Slot not found');
    }

    // 4. Check availability
    if (slot.available <= 0) {
      res.status(400);
      throw new Error('This slot is sold out.');
    }

    // 5. Decrement availability and save the experience
    // We do this *within* the transaction
    slot.available -= 1;
    await experience.save({ session }); // Pass the session

    // 6. Create the new booking
    // The `Booking.create` method expects an array when using a session
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
      { session } // Pass the session
    );

    // 7. If all steps succeeded, commit the transaction
    await session.commitTransaction();

    // 8. Send success response
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
    // 9. If any step failed, abort the transaction
    await session.abortTransaction();
    
    // Pass the error to our global error handler
    // It will handle duplicate key errors (double-booking) automatically
    next(error);

  } finally {
    // 10. Always end the session
    session.endSession();
  }
});

export default createBooking;