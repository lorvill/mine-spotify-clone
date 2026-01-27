import { authService } from '../services/auth-service.js'
import logger from '../logger.js'
import { Request, Response } from 'express'
import { Registration, Login } from '../types/auth.js'

export const authController = {
  async register(req: Request<any, any, Registration>, res: Response) {
    const user = await authService.register(req.body)
    logger.debug(user.id, 'User has been created')

    req.session.userId = user.id

    req.session.save((err) => {
      if (err) {
        logger.error(err)
        return res.status(500).json({ message: "Session error" })
      }
      res.status(201).json(user)
    })
  },

  async login(req: Request<any, any, Login>, res: Response) {
    const { identity, password, rememberMe } = req.body

    const user = await authService.login({ identity, password })

    req.session.userId = user.id
    if (rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000 // 30d
    } else {
      req.session.cookie.maxAge = 1000 * 60 * 60 // 1h
    }

    req.session.save((err) => {
      if (err) {
        logger.error('Session save error:', err)
        return res.status(500).json({ message: "Session error" })
      }

      logger.debug({ userId: user.id }, 'User logged in successfully:')
      res.json(user)
    })
   },

  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) res.status(500).json({ message: 'Error logging out' })
    })

    res.clearCookie('sessionId')
    res.status(200).json({ message: 'Logged out' })
  },

  async getUser(req: Request, res: Response) {
      const currentUser = await authService.getMe(req.userId)

      if (!currentUser) {
        return res.status(404).json({ message: "User not found"})
      }

      res.status(200)
  },
}
