import 'express-serve-static-core'
import 'express-session'

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number
  }
}

declare module 'express-session' {
  interface SessionData {
    views: number,
    userId?: number
  }
}