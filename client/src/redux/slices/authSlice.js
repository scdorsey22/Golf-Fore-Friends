import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    clearAuth: state => {
      state.isAuthenticated = false;
      state.token = null;
    },
    setAuthError: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload;
    },
    clearAuthError: state => {
      state.error = null;
    },
  },
});

export const { setAuth, clearAuth, setAuthError, clearAuthError } = authSlice.actions;

export const selectAuth = state => state.auth;

export default authSlice.reducer;
