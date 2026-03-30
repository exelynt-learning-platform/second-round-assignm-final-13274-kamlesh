import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;


const authMiddleware = (req, res, next) => {
    const clientKey = req.headers['x-api-key'];

    if (!clientKey || clientKey !== INTERNAL_API_KEY) {
        return res.status(403).json({ error: 'Unauthorized access' });
    }

    next();
};
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 10,
    message: 'Too many requests. Please try again later.',
});
app.use('/api/chat', limiter);
app.post('/api/chat', authMiddleware, async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid request format' });
        }

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({
                error: 'API key not configured',
            });
        }

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            error: error.response?.data?.error?.message || 'Server error',
        });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});