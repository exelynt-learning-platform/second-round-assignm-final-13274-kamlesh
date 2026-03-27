/**
 * SECURITY NOTE:
 * In production, API calls should be made through a backend server
 * to keep the API key secure. This frontend implementation is for
 * development/assignment purposes only.
 * 
 * Production solution: Create a Node.js/Express backend endpoint
 * that handles the OpenAI API call server-side.
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (userMessage, { getState, rejectWithValue }) => {
    try {
      const { messages } = getState().chat;

      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-8b-8192',
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