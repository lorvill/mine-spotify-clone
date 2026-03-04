import express from 'express';
import { playlistController } from '../controllers/playlist-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'
import { bodyReq, idParams } from '../schemas/request-data-schema.js'
import { paramsValidation } from '../middleware/params-validation.js'
import { bodyValidation } from '../middleware/body-validation.js'

const router = express.Router();

router.post('/', authMiddleware, bodyValidation(bodyReq) ,playlistController.createPlaylist)
router.get('/:id', authMiddleware, paramsValidation(idParams), playlistController.getPlaylist)
router.get('/', authMiddleware, playlistController.getAllPlaylists)
router.delete('/:id', authMiddleware, paramsValidation(idParams), playlistController.deletePlaylist)
router.patch('/:id', authMiddleware, paramsValidation(idParams), bodyValidation(bodyReq), playlistController.editPlaylist)

export default router