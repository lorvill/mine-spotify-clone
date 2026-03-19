import { prisma } from '../prisma-client.js'
import { NotFoundError } from '../errors/custom-errors.js'

const URL = process.env.R2_PUBLIC_URL

export const albumService = {
  async getAlbumById(id: number) {
    const album = await prisma.album.findUnique({
      where: { id: id },
      include: {
        artist: true,
        tracks: {
          orderBy: { number: 'asc' }
        },
      }
    })

    if (!album) throw new NotFoundError(`Album is not found`)

    const tracksWithUrl = album.tracks.map(track => ({
      ...track,
      path: `${URL}${track.audioPath}`
    }))

    return {
      ...album,
      tracks: tracksWithUrl
    }
  }
}