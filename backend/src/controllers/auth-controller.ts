import { authService } from '../services/auth-service.js'
import { Request, Response } from 'express'
import { Registration, Login } from '../types/auth.js'

export const authController = {
  async register(req: Request<any, any, Registration>, res: Response) {
      const user = await authService.register(req.body)

      req.session.userId = user.id
      await new Promise<void>((resolve, reject):void => {
        req.session.save((err) =>
          err ? reject(err) : resolve()
        ) // promisification
      })
      res.json(user)
  },

  async login(req: Request<any, any, Login>, res: Response) {
      const { identity, password, rememberMe } = req.body
      const user = await authService.login({ identity, password })

      await new Promise<void>((resolve, reject) => {
        req.session.regenerate(err => {
          if (err) return reject(err)

          req.session.userId = user.id
          req.session.cookie.maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000
          req.session.save(saveErr => saveErr ? reject(saveErr) : resolve())
        })
      })

      res.json(user)
  },

  async logout(req: Request, res: Response) {
      await new Promise<void>((resolve, reject) => {
        req.session.destroy((err) => {
          err ? reject(err) : resolve();
        })
      })
      res.clearCookie('sessionId')
  },

  async getUser(req: Request, res: Response) {
      const currentUser = await authService.getMe(req.userId)
      res.json(currentUser)
  },
}
