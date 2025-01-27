
// src/features/auth/authSlice.js (o .ts)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User { // Interfaz para el usuario (si usas TypeScript)
  id: number;
  email: string;
  username: string;
  role: string
  token: string
  // ... otras propiedades del usuario
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;