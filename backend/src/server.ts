import express from "express";
import 'dotenv/config'
import authRoutes from './routes/auth-routes.js'
import session from 'express-session'
import { createClient } from 'redis'
import { RedisStore } from 'connect-redis'
import logger from './logger.js'

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
// app.use((req, res, next) => {
//   console.log(`\n📨 ${req.method} ${req.url}`)
//   console.log('Body:', req.body)
//   next()
// })
//
// Redis connection with better error handling

const client = createClient({
  url: process.env.REDIS_CLIENT,
  socket: {
    connectTimeout: 5000,
  }
})

client.on('error', (err) => logger.error({ err }, 'Redis Client Error:'))
client.on('connect', () => logger.info('Redis connecting...'))
client.on('ready', () => logger.info('Redis ready!'))

try {
  await client.connect()
  logger.info('Redis connected successfully')

  await client.set('test', 'hello')
  const val = await client.get('test')
  logger.info({ val },'Redis test value:')
} catch (err) {
  logger.error({ err }, 'Redis connection failed:')
  logger.info('Continuing without Redis - sessions will use memory store')
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

app.listen(PORT, () => console.log(`✅ Server listening on http://localhost:${PORT}`));