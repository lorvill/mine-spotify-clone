import { Request, Response } from 'express';
import type { Playlist } from '../types/playlist.js'
import { AppError, Unauthorized } from '../errors/custom-errors.js'
import { playlistService } from '../services/playlist-service.js'
import logger from '../logger.js'


export const playlistController = {
  async createPlaylist(req: Request<any, any, Playlist>, res: Response) {
    const userId = req.userId
    if (!userId) throw new Unauthorized()

    const playlist = await playlistService.create({
     ...req.body,
      authorId: userId
    })

    return res.json(playlist)
  },

  async getPlaylist(req: Request<any, any, Playlist>, res: Response) {
    const { id } = req.params
    const playlistId = Number(id)
    const playlist = await playlistService.getById(playlistId)
    return res.json(playlist)
  },

  async getAllPlaylists(req: Request, res: Response) {
    const userId = req.userId
    const playlists = await playlistService.getAllPlaylists(userId)
    return res.json(playlists)
  },

  async deletePlaylist(req: Request<any, any, Playlist>, res: Response) {
    const { id } = req.params
    const playlistId = Number(id)
    const userId = req.userId
    const deletePlaylist = await playlistService.deletePlaylist(playlistId, userId!)
    return res.json(deletePlaylist)
  }
}
