import express from "express"
import authMiddleware from '../middleware/auth-middleware.js'
import { validateMiddleware } from '../middleware/validation-middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth-schema.js'
import { authController } from '../controllers/auth-controller.js'

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

router.post("/register", validateMiddleware(registerSchema), authController.register)

router.post("/login", validateMiddleware(loginSchema), authController.login )

router.get('/me', authMiddleware, authController.getUser)

router.post('/logout', authController.logout)

export default router
