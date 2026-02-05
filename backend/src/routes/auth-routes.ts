import express from "express"
import authMiddleware from '../middleware/auth-middleware.js'
import { validateMiddleware } from '../middleware/body-validation.js'
import { registerSchema, loginSchema } from '../schemas/auth-schema.js'
import { authController } from '../controllers/auth-controller.js'

const router = express.Router()

router.post("/register", validateMiddleware(registerSchema), authController.register)

router.post("/login", validateMiddleware(loginSchema), authController.login )

router.get('/me', authMiddleware, authController.getUser)

router.post('/logout', authController.logout)

export default router
