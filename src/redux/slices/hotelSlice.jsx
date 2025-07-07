// src/redux/slices/hotelSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'https://generateapi.onrender.com/api/hotels';
const apiKey = 'dvRW0eh1JNMQRsYC';

export const fetchHotels = createAsyncThunk('hotels/fetchHotels', () => {
  return axios
    .get(apiURL, {
      headers: { Authorization: apiKey },
    })
    .then((res) => res.data.Data)
    .catch((error) => {
      throw new Error(error.response?.data?.message || error.message);
    });
});

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    hotels: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearHotels: (state) => {
      state.hotels = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
