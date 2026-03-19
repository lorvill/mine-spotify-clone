import { prisma } from '../prisma-client.js'
import { UnauthorizedError } from '../errors/custom-errors.js'

export const libraryService = {
  async getAllLibrary(userId?: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        likedTracks: {
          include: { track: { include: { album: true } } },
          orderBy: { createdAt: 'desc' }
        },
        albums: {
          include: { album: { include: { artist: true } } },
          orderBy: { createdAt: 'desc' }
        },
        podcasts: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if(!user) throw new UnauthorizedError('User not found')

    return {
      albums: user.albums.map(albums => albums.album),
      likedTracks: user.likedTracks.map(track => track.track),
      podcasts: user.podcasts
    }
  }
}