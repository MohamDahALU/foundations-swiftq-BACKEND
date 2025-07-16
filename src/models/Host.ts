import mongoose from 'mongoose'

const hostSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const Host = mongoose.model('Host', hostSchema)
export default Host
