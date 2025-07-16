import express from 'express'
import { joinQueue } from '../controllers/customer.controller'

const router = express.Router()

router.post('/join/:queueId', joinQueue)

export default router
