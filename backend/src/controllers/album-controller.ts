import { Request, Response } from 'express'
import { albumService } from '../services/album-service.js'


export const albumController = {
 async getAlbumTracks(req: Request, res: Response) {
     const { id } = req.params
     const albumId = Number(id)
     const album = await albumService.getAlbumById(albumId)
     return res.json(album)
   },
}