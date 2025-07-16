import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ msg: 'No token provided' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    // Type assertion to add hostId property
    ;(req as any).hostId = decoded.id
    next()
  } catch (error) {
    console.error('JWT error:', error)
    res.status(403).json({ msg: 'Invalid or expired token' })
  }
}
