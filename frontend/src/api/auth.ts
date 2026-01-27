import type { LoginCredentials } from '@/types/loginCredentials.ts'
import type { RegisterCredentials } from '@/types/registerCredentials.ts'

export const apiAuth = {
  async register(credentials: RegisterCredentials) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(credentials),
    })

    if (!response.ok) throw new Error('Registration failed')
    return response.json()
  },

  async login(credentials: LoginCredentials) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials)
    })

    if (!response.ok) throw new Error('Login failed')
    return response.json()
  },

  async getUser() {
    try {
      const response = await fetch('/api/auth/me', { credentials: 'include' })

      if (!response.ok) throw new Error('Not authorized')
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Not authorized')
    }
  },

  async logout() {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  }
}
