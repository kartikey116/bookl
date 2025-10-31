import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI;
    const connect = await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(`Error connecting to MongoDB:${error.message}`);
  }
};