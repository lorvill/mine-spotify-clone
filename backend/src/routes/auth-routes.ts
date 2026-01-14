import express from "express"
import { authService } from '../services/auth-service.js'
import authMiddleware from '../middleware/auth-middleware.js'
import logger from '../logger.js'

const router = express.Router()
// router.post("/register", async (req, res) => {
//  console.log(req.body)
//   const { email, password, username } = req.body
//
//   if (!email || !password) {
//     return res.status(400).send("Email and password is required")
//   }
//
//   try {
//     const user = await authService.register({ email, password, username })
//     req.session.userId = user.id
//
//     // IMPORTANT: Save session before responding
//     req.session.save((err) => {
//       if (err) {
//         console.error('Session save error:', err)
//         return res.status(500).json({ message: "Session error" })
//       }
//
//       console.log('User registered successfully:', user.id)
//       res.status(201).json({
//         id: user.id,
//         email: user.email,
//         username: user.username,
//       })
//     })
//   } catch (err) {
//     console.error('Registration error:', err)
//     return res.status(400).json({
//       message: err instanceof Error ? err.message : "Registration failed"
//     })
//   }
// })

router.post("/register", async (req, res) => {
  logger.info('Body:', req.body)

  const { email, password, username } = req.body

  if (!email || !password || !username) {
    logger.error('Missing fields')
    return res.status(400).json({ message: "Email, username and password are required" })
  } logger.info('Validation passed')

  try {
    const user = await authService.register({ email, password, username })
    logger.info(user.id, 'User created')

    req.session.userId = user.id
    logger.info('Session userId set')

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" })
      }

      logger.info('Session saved, sending response...')
      res.status(201).json({
        id: user.id,
        email: user.email,
        username: user.username,
      })
      logger.info('Response sent!')
    })
  } catch (err) {
    logger.error('Registration error')
    return res.status(400).json({ message: "Registration failed" })
  }
})

router.post("/login", async (req, res) => {
  const { identity, password, rememberMe } = req.body

  if (!identity || !password) {
    return res.status(400).json({ message: "Email and password is required" })
  }

  try {
    const user = await authService.login(identity, password)
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

      logger.info({ userId: user.id }, 'User logged in successfully:')
      res.json(user)
    })
  } catch (err) {
    logger.error('Login error:')
    return res.status(401).json({ message: "Invalid email or password" })
  }
})

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const currentUser = await authService.getMe(req.userId)

    if (currentUser === null || currentUser === undefined) {
      return res.status(404).json({ message: "User not found"})
    }
    return res.status(200).json(currentUser)
  } catch (e) {
    logger.error(e)
    return res.status(500).json({ message: "Server error" })
  }
})

router.post('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(500).json({ message: 'Error logging out' })

    res.clearCookie('sessionId')
    return res.status(200).json({ message: 'Logged out' })
  })
})

export default router
