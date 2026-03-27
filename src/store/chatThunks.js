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
      if (error.response?.status === 401) {
        return rejectWithValue('Invalid API key');
      }
      if (error.response?.status === 429) {
        return rejectWithValue('Rate limit exceeded. Please wait.');
      }
      return rejectWithValue(
        error.response?.data?.error?.message || 'Network error. Try again.'
      );
    }
  }
);