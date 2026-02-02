import { Request, Response } from 'express';
import type { Playlist } from '../types/playlist.js'
import { AppError, Unauthorized } from '../errors/custom-errors.js'
import { playlistService } from '../services/playlist-service.js'
import logger from '../logger.js'


export const playlistController = {
  async createPlaylist(req: Request<any, any, Playlist>, res: Response) {
    logger.debug(req.body)
    const userId = req.session.userId
    if (!userId) throw new Unauthorized()

    const playlist = await playlistService.create({
     ...req.body,
      authorId: userId
    })

    return res.json(playlist)
  },

  async getPlaylist(req: Request<any, any, Playlist>, res: Response) {
    try {
      const { id } = req.params
      const playlistId = Number(id)
      if (isNaN(playlistId)) {
        return res.status(400).json({ message: 'Invalid playlist id' })
      }
      const playlist = await playlistService.getById(playlistId)
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' })
      }
      return res.json(playlist)
    } catch (error) {
      throw new AppError('Error getting playlist')
    }
  },

  async getAllPlaylists(req: Request, res: Response) {
    const userId = req.userId
    if (!userId) throw new Unauthorized()
    const playlists = await playlistService.getAllPlaylists(userId)
    if (!playlists) {
      throw new AppError('Error getting playlists')
    }
    return res.json(playlists)
  }
}
