import bcrypt from 'bcryptjs'
import { prisma } from '../prisma-client.js'
import { Login, Registration } from '../types/auth.js'
import { AppError, BadRequest } from '../errors/custom-errors.js'

export const authService = {
  async register(userData: Registration) {
    const { email, password, username } = userData

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) throw new AppError('User already exists')

    const existingName = await prisma.user.findUnique({ where: { username } })
    if (existingName) throw new AppError('User already exists')

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      }
    })

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  async login(userData: Login) {
    const { identity, password } = userData

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identity }, { username: identity }]
      },
    })
    if (!user) throw new BadRequest('Incorrect credentials')

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) throw new BadRequest()

    const { password:_, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  async getMe(userId: number | undefined) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
      }
    })
  }
}
