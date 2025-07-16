declare global {
  namespace Express {
    interface Request {
      hostId?: string
    }
  }
}

export {}
