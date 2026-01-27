import z from 'zod'
import { registerSchema, loginSchema } from '../schemas/auth-schema.js'

export type Registration = z.infer<typeof registerSchema>
export type Login = z.infer<typeof loginSchema>