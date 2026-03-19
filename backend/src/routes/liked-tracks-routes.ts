import express from 'express'
import authMiddleware from '../middleware/auth-middleware.js'
import { bodyReq, idParams } from '../schemas/request-data-schema.js'
import { bodyValidation } from '../middleware/body-validation.js'
import { likedTracksController } from '../controllers/liked-tracks-controller.js'
import { paramsValidation } from '../middleware/params-validation.js'

const router = express.Router()

router.post('/:id', authMiddleware, paramsValidation(idParams), likedTracksController.addLikedTrack)
router.get('/', authMiddleware, likedTracksController.getLikedTracks)

export default router