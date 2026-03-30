import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (userMessage, { getState, rejectWithValue }) => {

        try {
            const { messages } = getState().chat;
            const response = await axios.post(
                'http://localhost:5000/api/chat',
                {
                    messages: [
                        ...messages.slice(-10),
                        { role: 'user', content: userMessage },
                    ],
                },
                {
                    headers: {
                        'x-api-key': 'sk_internal_9f8a7b6c5d4e3',
                    },
                }
            );

            return response.data.choices[0].message.content;

        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                return rejectWithValue('Request timed out. Please try again.');
            }
            if (!error.response) {
                return rejectWithValue('Network error. Check your connection.');
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
            return rejectWithValue(
                error.response?.data?.error?.message || 'Something went wrong.'
            );
        }
    }
);