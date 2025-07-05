import mongoose from 'mongoose'

const hostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export const Host = mongoose.model('Host', hostSchema)
