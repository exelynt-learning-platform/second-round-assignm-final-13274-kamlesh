import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (userMessage, { getState, rejectWithValue }) => {
        try {
            const { messages } = getState().chat;

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        ...messages,
                        { role: 'user', content: userMessage },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    },
                }
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue('Network error. Check your connection.');
            }
            if (!import.meta.env.VITE_OPENAI_API_KEY) {
                return rejectWithValue('API key not configured. Check your .env file.');
            }
            if (error.response.status === 401) {
                return rejectWithValue('Invalid API key. Check your .env file.');
            }
            if (error.response.status === 429) {
                return rejectWithValue('Rate limit exceeded. Please wait.');
            }
            if (error.response.status >= 500) {
                return rejectWithValue('Server error. Try again later.');
            }
            if (error.code === 'ECONNABORTED') {
                return rejectWithValue('Request timed out. Please try again.');
            }
            return rejectWithValue(
                error.response?.data?.error?.message || 'Something went wrong.'
            );
        }
    }
);