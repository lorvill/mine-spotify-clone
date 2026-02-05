import { prisma } from '../prisma-client.js'
import type { Playlist } from '../types/playlist.js'
import { NotFoundError, Unauthorized } from '../errors/custom-errors.js'

export const playlistService = {
  async create(data: Playlist & { authorId: number }) {
    return prisma.playlist.create({
      data
    })
  },

  async getById(id: number) {
    const playlist = await prisma.playlist.findUnique({
      where: { id },
      include: { author: { select: { username: true }}}
    })
    if (!playlist) throw new NotFoundError(`Playlist with id ${id} not found`)
    return playlist
  },

  async getAllPlaylists(authorId?: number) {
    return prisma.playlist.findMany({
      where: authorId ? { authorId } : undefined,
      include: { author: { select: { username: true }}}
    })
  },

  async deletePlaylist(id: number, userId: number) {
    const playlist = await prisma.playlist.findUnique({ where: { id }})
    if (!playlist) throw new NotFoundError(`Playlist not found`)
    if (playlist.authorId !== userId) throw new Unauthorized('You do not have permission to delete the playlist')

    return prisma.playlist.delete({ where: { id }})
  }
}
