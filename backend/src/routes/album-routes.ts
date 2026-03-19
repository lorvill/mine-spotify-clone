import express from 'express'
import authMiddleware from '../middleware/auth-middleware.js'
import { albumController } from '../controllers/album-controller.js'
import { paramsValidation } from '../middleware/params-validation.js'
import { idParams } from '../schemas/request-data-schema.js'
const router = express.Router()


router.get(`/:id`, authMiddleware, paramsValidation(idParams), albumController.getAlbumTracks)

export default router