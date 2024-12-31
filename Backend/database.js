import mongoose from 'mongoose'

export const connectDB = async () => {
    const dbConnectionString = process.env.NODE_ENV === 'production' ? process.env.PROD_DB_STRING : process.env.DEV_DB_STRING

    try {
      const conn = await mongoose.connect(dbConnectionString);
      console.log(`MongoDB connected`);
    } catch (error) {
      console.log("MongoDB connection error:", error);
    }
};
