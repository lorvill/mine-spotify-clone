export const apiAuth = {
  async register(credentials: object) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(credentials),
    })

    if (!response.ok) throw new Error('Registration failed')
    return response.json()
  },

  async login(credentials: object) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    })

    if (!response.ok) throw new Error('Login failed')
    return response.json()
  },

  async getUser() {
    const response = await fetch('/api/auth/me', { credentials: 'include' })

    if (!response.ok) throw new Error('Not authorized')
    return response.json()
  },

  async logout() {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  }
}