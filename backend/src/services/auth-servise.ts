import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma-client.js'

export const authServise = {
  async register(email: string, password: string) {

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' })

    return {token}
  },

  async login(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 12)

    const isMatched = await bcrypt.compare(password, hashedPassword)
  }
}