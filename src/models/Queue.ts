import mongoose from 'mongoose'
import { ICustomer } from './Customer'

const customerSchema = new mongoose.Schema<ICustomer>({
  name: { type: String },
  status: {
    type: String,
    enum: ['waiting', 'served', 'skipped'],
    default: 'waiting',
  },
  joinedAt: { type: Date, default: Date.now },
})

const queueSchema = new mongoose.Schema({
  hostId: { type: String, required: true },
  hostName: { type: String, required: true },
  queueName: { type: String, required: true },
  queueId: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  requireCustomerName: { type: Boolean, default: false },
  waitTimes: [{ type: Number }],
  createdAt: { type: Date, default: Date.now },
  customers: [customerSchema],
})

const Queue = mongoose.model('Queue', queueSchema)
export default Queue
