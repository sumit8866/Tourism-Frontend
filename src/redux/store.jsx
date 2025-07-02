// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import tourReducer from './slices/tourSlice';

export const store = configureStore({
  reducer: {
    tours: tourReducer,
  },
});
