import express from 'express'
import authMiddleware from '../middleware/auth-middleware.js'
import { libraryController } from '../controllers/library-controller.js'

const router = express.Router()

router.get('/', authMiddleware, libraryController.getAllLibrary)

export default router
