import { createSlice } from '@reduxjs/toolkit';
import { sendMessage } from './chatThunks';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.messages.push({
          role: 'user',
          content: action.meta.arg,
        });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push({
          role: 'assistant',
          content: action.payload,
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong!';
      });
  },
});

export const { clearError } = chatSlice.actions;
export default chatSlice.reducer;