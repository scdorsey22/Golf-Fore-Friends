import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGolfBuddies = createAsyncThunk('golfBuddies/fetchGolfBuddies', async () => {
  const response = await fetch('/api/golf_buddies');
  const data = await response.json();
  return data;
});

export const addGolfBuddy = createAsyncThunk(
  'golfBuddies/addGolfBuddy',
  async (newBuddy) => {
    const response = await fetch(`/api/golf_buddies`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBuddy)
    });
    const data = await response.json();
    return data;
  }
);

export const deleteGolfBuddy = createAsyncThunk(
  'golfBuddies/deleteGolfBuddy',
  async (buddyId) => {
    const response = await fetch(`/api/golf_buddies/${buddyId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
);

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
      })
      .addCase(addGolfBuddy.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteGolfBuddy.fulfilled, (state, action) => {
        state.data = state.data.filter(buddy => buddy.id !== action.payload.id);
      })
  },
});

export const selectGolfBuddies = (state) => state.golfBuddies;

export default golfBuddiesSlice.reducer;
