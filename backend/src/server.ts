import express from "express";
import 'dotenv/config'
import authRoutes from './routes/auth-routes.js'
import session from 'express-session'
import { createClient } from 'redis'
import { RedisStore } from 'connect-redis'
import logger from './logger.js'
import { errorHandler } from './middleware/error-handler.js'

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());

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
  await client.set('test', 'hello')
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

app.use(errorHandler)

app.listen(PORT, () => logger.info(`Server listening on http://localhost:${PORT}`));