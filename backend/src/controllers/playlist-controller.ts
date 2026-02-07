import { Request, Response } from 'express';
import { playlistService } from '../services/playlist-service.js'
import { idParams } from '../schemas/request-data-schema.js'

export const playlistController = {
  async createPlaylist(req: Request, res: Response) {
    const userId = req.userId
    const playlist = await playlistService.create({
     ...req.body,
      userId: userId
    })

    return res.json(playlist)
  },

  async getPlaylist(req: Request, res: Response) {
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

  async deletePlaylist(req: Request, res: Response) {
    const { id } = idParams.parse(req.params)
    const userId = req.userId
    const deletePlaylist = await playlistService.deletePlaylist(id, userId!)
    return res.json(deletePlaylist)
  }
}
