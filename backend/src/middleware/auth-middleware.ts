import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// interface JwtPayload {
//   id: number
// }

function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const authHeader = req.headers.authorization
  // if (!authHeader) {
  //   return res.status(401).json({ message: 'No token provided' })
  // }
  //
  // const token = authHeader.split(' ')[1]
  //
  // try {
  //   const decoded = jwt.verify(
  //     token,
  //     process.env.JWT_SECRET as string
  //   ) as JwtPayload
  //
  //   req.userId = decoded.id
  //   next()
  // } catch {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  if (!req.session || !req.session.userId) return res.status(401).json({ message: 'Unauthorized' })

  req.userId = req.session.userId
  next()
}

export default authMiddleware
