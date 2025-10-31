import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
    min: 0, 
    default: 10, 
  },
});

const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    slots: [SlotSchema], 
  },
  {
    timestamps: true, 
  }
);
export default mongoose.model('Experience', ExperienceSchema);

