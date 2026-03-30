import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (userMessage, { getState, rejectWithValue }) => {
    try {
      const { messages } = getState().chat;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        {
          messages: [
            ...messages.slice(-10),
            { role: 'user', content: userMessage },
          ],
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
      if (error.response.status === 429) {
        return rejectWithValue('Too many requests. Please wait.');
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