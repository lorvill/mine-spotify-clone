import { prisma } from '../prisma-client.js'
import { ConflictError, NotFoundError } from '../errors/custom-errors.js'

export const likedTracksService = {
  async likeTrack(userId: number, trackId: number) {
    const track = await prisma.track.findUnique({
      where: { id: trackId }
    })
    if (!track) throw new NotFoundError('The track is not found')

    const isExist = await prisma.likedTrack.findFirst({
      where: { userId, trackId }
    })
    if (isExist) throw new ConflictError(`Track is already liked`)

    return prisma.likedTrack.create({
      data: { userId, trackId },
      include: { track: { include: { album: { include: { artist: true }}}}}
    })
  },

  async getLikedTracks(userId?: number) {
    return prisma.likedTrack.findMany({
      where: userId ? { userId } : undefined,
      include: {
        user: {
          select: {
            username:
              true
          }
        },
        track: { include: { album: { include: { artist: true }}}}
      }
    })
  }
}