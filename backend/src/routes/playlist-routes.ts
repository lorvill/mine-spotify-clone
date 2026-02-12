import express from 'express';
import { playlistController } from '../controllers/playlist-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'
import { bodyReq, idParams } from '../schemas/request-data-schema.js'
import { paramsValidation } from '../middleware/params-validation.js'
import { validateMiddleware } from '../middleware/body-validation.js'

const router = express.Router();

router.post('/', authMiddleware, validateMiddleware(bodyReq) ,playlistController.createPlaylist)
router.get('/:id', authMiddleware, paramsValidation(idParams), playlistController.getPlaylist)
router.get('/', authMiddleware, playlistController.getAllPlaylists)
router.delete('/:id', authMiddleware, paramsValidation(idParams), playlistController.deletePlaylist)

export default router