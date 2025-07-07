// src/redux/slices/reviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'https://generateapi.onrender.com/api/review';
const apiKey = 'hwOMaWc5inHk1x9M';

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const res = await axios.get(apiURL, {
    headers: { Authorization: apiKey },
  });
  return res.data.Data;
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;