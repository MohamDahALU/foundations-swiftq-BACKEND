import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ DB Connection Error:', err)
    process.exit(1)
  }
}

export default connectDB
