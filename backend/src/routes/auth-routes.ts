import express from "express"
import { authService } from '../services/auth-service.js'
import authMiddleware from '../middleware/auth-middleware.js'

const router = express.Router()

router.post("/register", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send("Email and password is required")
  }

  try {
    const user = await authService.register(email, password)

    req.session.userId = user.id
    res.status(201)

  } catch (err) {
    return res.status(401).json({ message: "Invalid email or password" })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send("Email and password is required")
  }

  try {
    const user = await authService.login(email, password)

    req.session.userId = user.id
    res.json(user)

  } catch (err) {
    return res.status(401).json({ message: "Invalid email or password" })
  }
})

router.get('/me', authMiddleware, (req, res) => {
  res.json({ userId: req.userId })
})

router.post('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(500).send('Error logging out')

    res.clearCookie('sessionId')
    return res.status(200).json({ message: 'Logged out' })
  })
})

export default router
