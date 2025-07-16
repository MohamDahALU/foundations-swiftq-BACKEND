import express from 'express'
import {
  createQueue,
  getQueueAnalytics,
  viewHostQueue,
  getQueueDetails,
  deactivateQueue,
} from '../controllers/queue.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = express.Router()

router.post('/', verifyToken, createQueue)
router.get('/:queueId', verifyToken, getQueueDetails) // view one queue + customers
router.get('/host/view', verifyToken, viewHostQueue)
router.delete('/:queueId', verifyToken, deactivateQueue) // deactivate queue
router.get('/:queueId/analytics', verifyToken, getQueueAnalytics) // analytics

export default router
