import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import queueRoutes from './routes/queue.routes'
import customerRoutes from './routes/customer.routes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/queues', queueRoutes)
app.use('/api/customers', customerRoutes)

export default app
