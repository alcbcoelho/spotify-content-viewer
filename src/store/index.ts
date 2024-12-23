import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlices';
import miscReducer from './miscSlice';

export const store = configureStore({
  reducer: {
    misc: miscReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
