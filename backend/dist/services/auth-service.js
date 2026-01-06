import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma-client.ts';
export const authService = {
    async register(email, password) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return { token };
    },
    async login(email, password) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error('Incorrect credentials');
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            throw new Error('Incorrect password');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return { token };
    }
};
