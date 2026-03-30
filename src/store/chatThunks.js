import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const axiosInstance = axios.create({
  timeout: 30000,
});
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (userMessage, { getState, rejectWithValue }) => {

        if (!API_KEY || API_KEY.trim() === '') {
      console.error('OpenAI API key is missing');

      return rejectWithValue(
        'Chat service is not configured properly. Please contact support.'
      );
    }

        try {
            const { messages } = getState().chat;
            const response = await axiosInstance.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        ...messages.slice(-10),
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