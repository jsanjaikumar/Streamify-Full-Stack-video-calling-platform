import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'STEAM_API_KEY', 'STEAM_API_SECRET', 'JWT_SECRET_KEY', 'PORT'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`   - ${envVar}`));
  console.error('Please check your .env file in the backend directory.');
  process.exit(1);
}

export const connectDB = async () => {
  try {
    console.log("✅ Environment variables loaded successfully");
    console.log("Mongo URI:", process.env.MONGO_URI?.substring(0, 20) + "...");
    console.log("Stream Key:", process.env.STEAM_API_KEY?.substring(0, 10) + "...");
    console.log("Stream Secret:", process.env.STEAM_API_SECRET?.substring(0, 10) + "...");
    console.log("Port:", process.env.PORT);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    process.exit(1); // 1 means failure
  }
};
