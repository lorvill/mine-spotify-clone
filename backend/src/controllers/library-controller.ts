import {Request, Response} from 'express'
import { libraryService } from '../services/library-service.js'

export const libraryController = {
  async getAllLibrary(req: Request, res: Response) {
    const userId = req.userId
    const library = await libraryService.getAllLibrary(userId)
    return res.json(library)
  }
}