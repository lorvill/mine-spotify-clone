import { Request, Response } from 'express'
import { likedTracksService } from "../services/liked-tracks-service.js"

export const likedTracksController = {
  async addLikedTrack(req: Request, res: Response) {
      const userId = req.userId
      const trackId = Number(req.params.id)
      const likedTrack = await likedTracksService.likeTrack(userId as number, trackId)
      return res.json(likedTrack)
  },

  async getLikedTracks(req: Request, res: Response) {
      const userId = req.userId
      const tracks = await likedTracksService.getLikedTracks(userId)
      return res.json(tracks)
  }
}