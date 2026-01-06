import express from "express";
import 'dotenv/config';
import authRoutes from './routes/auth-routes.ts';
const app = express();
const PORT = process.env.PORT || 5003;
app.use(express.json());
app.use('/api/auth', authRoutes);
app.listen(PORT, () => console.log(`listening on ${PORT}`));
