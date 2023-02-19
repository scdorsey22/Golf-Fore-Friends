import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRounds = createAsyncThunk('rounds/fetchRounds', async () => {
  const response = await fetch('/api/rounds');
  const data = await response.json();
  return data;
});

export const roundsSlice = createSlice({
  name: 'rounds',
  initialState: { data: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRounds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRounds.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRounds.rejected, (state) => {
        state.loading = false;
        state.data = [];
      });
  },
});

export const selectRounds = (state) => state.rounds;

export default roundsSlice.reducer;

