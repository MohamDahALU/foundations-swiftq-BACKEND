// src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Host from '../models/Host'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body
    const existing = await Host.findOne({ email })
    if (existing) {
      res.status(400).json({ message: 'Email already exists' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newHost = new Host({ fullName, email, password: hashedPassword })
    await newHost.save()

    const token = jwt.sign({ id: newHost._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    res.status(201).json({
      token,
      host: {
        fullName: newHost.fullName,
        email: newHost.email,
        id: newHost._id,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const host = await Host.findOne({ email })
    if (!host) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const isMatch = await bcrypt.compare(password, host.password)
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const token = jwt.sign({ id: host._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    res.status(200).json({ token })
  } catch {
    res.status(500).json({ message: 'Internal server error' })
  }
}
