import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

type AuthMode = 'sign in' | 'sign up'

export const loginSchema = () =>
  toTypedSchema(
    zod.object({
      identity: zod.string().min(1).min(3, 'Too short'),
      password: zod.string().min(1, 'This is required').min(6, 'Too short'),
      rememberMe: zod.boolean().default(false),
    }),
  )

export const registrationSchema = (mode: AuthMode) =>
  toTypedSchema(
    zod
      .object({
        email: zod.string().email('Must be a valid email'),
        username: zod.string().min(1).min(3, 'Too short'),
        password: zod.string().min(1, 'This is required').min(6, 'Too short'),
        confirmPassword: zod.string(),
      })
      .refine(
        (data) => {
          if (mode !== 'sign up') {
            return true
          }
          return data.password === data.confirmPassword
        },
        {
          message: "Passwords don't match",
          path: ['confirmPassword'],
        },
      ),
  )

