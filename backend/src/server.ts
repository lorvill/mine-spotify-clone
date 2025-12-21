import express from "express";
import 'dotenv/config'
import { pool } from './database.js'
import authRoutes from './routes/auth-routes.js'

const app = express();
const PORT = process.env.PORT || 5003;
app.use(express.json());

async function testConnection() {
  try {
    const res = await pool.query('SELECT 1')
    console.log('Соединение с PostgreSQL установлено:', res.rows)
    await pool.end()
  } catch (err) {
    console.error('Ошибка соединения с PostgreSQL:', err)
  }
}

testConnection()

app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`listening on ${PORT}`));