import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('/api/me');
  const data = await response.json();
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.data = null;
      });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;

