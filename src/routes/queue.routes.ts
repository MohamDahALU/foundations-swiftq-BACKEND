import express from 'express'
const router = express.Router()

// Import your middleware and controllers
import { verifyToken } from '../middleware/auth.middleware'
import {
  createQueue,
  viewHostQueue,
  getQueueDetails,
  deactivateQueue,
  getQueueAnalytics,
} from '../controllers/queue.controller'

// Type the routes properly
router.post('/create', verifyToken as any, createQueue)
router.get('/host', verifyToken as any, viewHostQueue)
router.get('/:queueId/details', verifyToken as any, getQueueDetails)
router.patch('/:queueId/deactivate', verifyToken as any, deactivateQueue)
router.get('/:queueId/analytics', verifyToken as any, getQueueAnalytics)

export default router
