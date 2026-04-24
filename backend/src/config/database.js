import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  console.log("URI:", process.env.MONGODB_URI);
  try {
    await mongoose.connect("mongodb+srv://user123:user%401234@cluster0.ryzyom9.mongodb.net/algorithmDB")
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}