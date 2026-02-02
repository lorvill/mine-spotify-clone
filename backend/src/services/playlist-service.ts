import { prisma } from '../prisma-client.js'
import type { Playlist } from '../types/playlist.js'

export const playlistService = {
  async create(data: Playlist & { authorId: number }) {
    return prisma.playlist.create({
      data
    })
  },

  async getById(id: number) {
    return prisma.playlist.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            username: true,
          }
        }
      }
    })
  },

  async getAllPlaylists(authorId?: number) {
    return prisma.playlist.findMany({
      where: authorId ? { authorId } : undefined,
      include: {
        author: {
          select: {
            username: true,
          }
        }
      }
    })
  }
}
