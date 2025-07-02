// src/redux/slices/tourSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'https://generateapi.onrender.com/api/detailstour';
const apiKey = 'Ofokc8bYPo2MB7Ll';

export const fetchTours = createAsyncThunk('tours/fetchTours', async () => {
  const res = await axios.get(apiURL, {
    headers: { Authorization: apiKey },
  });
  return res.data.Data;
});

const tourSlice = createSlice({
  name: 'tours',
  initialState: {
    tours: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearTours: (state) => {
      state.tours = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearTours } = tourSlice.actions;
export default tourSlice.reducer;
