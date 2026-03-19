import express from "express";
import 'dotenv/config'
import authRoutes from './routes/auth-routes.js'
import playlistRoutes from './routes/playlist-routes.js'
import session from 'express-session'
import { createClient } from 'redis'
import { RedisStore } from 'connect-redis'
import logger from './logger.js'
import { errorHandler } from './middleware/error-handler.js'
import likedTracksRoutes from './routes/liked-tracks-routes.js'
import libraryRoutes from './routes/library-routes.js'
import albumRoutes from './routes/album-routes.js'

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const client = createClient({
  url: process.env.REDIS_CLIENT,
  socket: {
    connectTimeout: 5000,
  }
})

client.on('error', (err) => logger.error({ err }, 'Redis Client Error'))
client.on('connect', () => logger.info('Redis connecting'))
client.on('ready', () => logger.info('Redis ready'))

try {
  await client.connect()
  // await client.set('test', 'hello')
} catch (err) {
  logger.error({ err }, 'Redis connection failed:')
}

const redisStore = new RedisStore({ client: client })

app.use(session({
  store: redisStore,
  secret: process.env.REDIS_SECRET!,
  resave: false,
  saveUninitialized: false,
  name: 'sessionId',
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use('/api/auth', authRoutes)
app.use('/api/playlists', playlistRoutes)
app.use('/api/liked-tracks', likedTracksRoutes)
app.use('/api/library', libraryRoutes)
app.use('/api/library/album', albumRoutes)

app.use(errorHandler)

app.listen(PORT, () => logger.info(`Server listening on http://localhost:${PORT}`));