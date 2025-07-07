// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import tourReducer from './slices/tourSlice';
import hotelReducer from './slices/hotelSlice';
import reviewReducer from './slices/reviewSlice';

export const store = configureStore({
  reducer: {
    tours: tourReducer,
    hotels: hotelReducer,
    reviews: reviewReducer,
  },
});
