import { prisma } from '../prisma-client.js'
import { NotFoundError, UnauthorizedError } from '../errors/custom-errors.js'
import { Prisma } from '@prisma/client'

export const playlistService = {
  async create(data: Prisma.PlaylistCreateInput) {
    return prisma.playlist.create({
      data
    })
  },

  async getById(id: number) {
    const playlist = await prisma.playlist.findUnique({
      where: { id },
      include: { user: { select: { username: true }}}
    })
    if (!playlist) throw new NotFoundError(`Playlist with id ${id} not found`)
    return playlist
  },

  async getAllPlaylists(userId?: number) {
    return prisma.playlist.findMany({
      where: userId ? { userId } : undefined,
      include: { user: { select: { username: true }}}
    })
  },

  async deletePlaylist(id: number, userId: number) {
    const playlist = await prisma.playlist.findUnique({ where: { id }})
    if (!playlist) throw new NotFoundError(`Playlist not found`)

    if (playlist.userId !== userId) throw new UnauthorizedError('Access denied')

    return prisma.playlist.delete({ where: { id }})
  },

  async editPlaylist(id: number, data: Prisma.PlaylistUpdateInput) {
    return prisma.playlist.update({ where: { id }, data })
  }
}