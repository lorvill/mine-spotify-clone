import express from "express";
import 'dotenv/config'
import authRoutes from './routes/auth-routes.js'
import session from 'express-session'
import { createClient } from 'redis'
import { RedisStore } from 'connect-redis'

const app = express();
const PORT = process.env.PORT || 5003;
const client = createClient({
  url: process.env.REDIS_CLIENT, // это адрес Redis-сервера
})

await client.connect().catch((err) => console.error()) // реальное подключение к Redis (если он упадет - сессии прекратят работу)

const redisStore = new RedisStore({ client: client }) // создаем хранилище редис, тем самым говорим express-session что когда нужно сохранить или прочесть сессию то нужно идти сюда, в хранилище

app.use(session({ // мидлвар, выполняется при каждом запросе
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

app.use(express.json());
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`listening on ${PORT}`));