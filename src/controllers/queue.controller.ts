import { Request, Response } from 'express'
import Queue from '../models/Queue'
import { generateQueueId } from '../utils/generateQueueId'

export const createQueue = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { queueName, hostName } = req.body
    const hostId = req.body.hostId

    const queueId = generateQueueId(hostName)

    const newQueue = new Queue({
      queueName,
      hostId,
      hostName,
      queueId,
    })

    await newQueue.save()
    res.status(201).json({ message: 'Queue created', queue: newQueue })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}

// Returns all queues created by the host
export const viewHostQueue = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hostId = req.params.hostId
    if (!hostId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const queues = await Queue.find({ hostId, isActive: true }) // only active queues
    res.status(200).json({ queues })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getQueueAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { queueId } = req.params
    const queue = await Queue.findOne({ queueId })
    if (!queue) {
      res.status(404).json({ error: 'Queue not found' })
      return
    }

    const total = queue.customers.length
    const served = queue.customers.filter((c) => c.status === 'served').length
    const waiting = queue.customers.filter((c) => c.status === 'waiting').length

    res.status(200).json({ total, served, waiting })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getQueueDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { queueId } = req.params
    const hostId = req.params.hostId
    if (!hostId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    // Ensure the queue belongs to the logged-in host
    const queue = await Queue.findOne({ queueId, hostId, isActive: true })

    if (!queue) {
      res.status(404).json({ error: 'Queue not found' })
      return
    }

    res.status(200).json({ queue })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}

export const deactivateQueue = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { queueId } = req.params
    const hostId = req.params.hostId
    if (!hostId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const queue = await Queue.findOneAndUpdate(
      { queueId, hostId, isActive: true },
      { isActive: false },
      { new: true }
    )

    if (!queue) {
      res.status(404).json({ error: 'Queue not found or already inactive' })
      return
    }

    res.status(200).json({ message: 'Queue deactivated successfully', queue })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}
