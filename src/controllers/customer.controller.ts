import { Request, Response } from 'express'
import Queue from '../models/Queue'
import { io } from '../server'

export const joinQueue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { queueId } = req.params
    const { name } = req.body

    const queue = await Queue.findOne({ queueId })
    if (!queue) {
      res.status(404).json({ error: 'Queue not found' })
      return
    }

    const newCustomer = {
      name: name || undefined,
      status: 'waiting',
      joinedAt: new Date(),
    }

    queue.customers.push(newCustomer)
    await queue.save()

    const position = queue.customers.filter(
      (c) => c.status === 'waiting'
    ).length

    io.emit('customer-joined', { queueId, customer: newCustomer, position })

    res.status(201).json({
      message: 'Customer added to queue',
      customer: newCustomer,
      position,
      totalInQueue: queue.customers.length,
    })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}
