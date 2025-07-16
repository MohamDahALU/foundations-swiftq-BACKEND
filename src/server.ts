// src/server.ts
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import app from './app'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db' // ✅ import DB connection

const server = http.createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

export { io }

const PORT = process.env.PORT || 3000

// ✅ Call DB connection before starting the server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
