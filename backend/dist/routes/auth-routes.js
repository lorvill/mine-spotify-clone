import express from "express";
import { authService } from '../services/auth-service.ts';
import authMiddleware from '../middleware/auth-middleware.ts';
const router = express.Router();
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and password is required");
    }
    try {
        const user = await authService.login(email, password);
        res.status(200).json(user);
    }
    catch (err) {
        return res.status(503);
    }
});
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and password is required");
    }
    try {
        const user = await authService.register(email, password);
        res.status(200).json(user);
    }
    catch (err) {
        return res.status(503);
    }
});
router.get('/me', authMiddleware, (req, res) => {
    res.json({ userId: req.userId });
});
export default router;
