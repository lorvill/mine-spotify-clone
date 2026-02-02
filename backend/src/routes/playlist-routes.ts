import express from 'express';
import { playlistController } from '../controllers/playlist-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'

const router = express.Router();

router.post('/', authMiddleware, playlistController.createPlaylist)
router.get('/:id', authMiddleware, playlistController.getPlaylist)
router.get('/', authMiddleware, playlistController.getAllPlaylists)

export default router