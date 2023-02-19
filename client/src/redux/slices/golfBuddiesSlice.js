import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGolfBuddies = createAsyncThunk('golfBuddies/fetchGolfBuddies', async () => {
  const response = await fetch('/api/golf_buddies');
  const data = await response.json();
  return data;
});

export const golfBuddiesSlice = createSlice({
  name: 'golfBuddies',
  initialState: { data: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGolfBuddies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGolfBuddies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGolfBuddies.rejected, (state) => {
        state.loading = false;
        state.data = [];
      });
  },
});

export const selectGolfBuddies = (state) => state.golfBuddies;

export default golfBuddiesSlice.reducer;
