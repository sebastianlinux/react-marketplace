// src/store.js (o src/store.ts)
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';

const initialState = {
  value: 0,
};

const store = configureStore({
  reducer: {
    auth: authReducer
    // Aquí irán tus reducers
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;