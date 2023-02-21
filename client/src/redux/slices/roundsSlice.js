import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRounds = createAsyncThunk('rounds/fetchRounds', async () => {
  const response = await fetch('/api/rounds');
  const data = await response.json();
  return data;
});

export const addPost = createAsyncThunk('rounds/addPost', async (newPost) => {
  const response = await fetch('/api/rounds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  const data = await response.json();
  return data;
});

export const deletePost = createAsyncThunk('rounds/deletePost', async (id) => {
  const response = await fetch(`/api/rounds/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

export const updatePost = createAsyncThunk('rounds/updatePost', async (updatedPost) => {
  const response = await fetch(`/api/rounds/${updatedPost.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPost),
  });
  const data = await response.json();
  return data;
});

export const roundsSlice = createSlice({
  name: 'rounds',
  initialState: { data: [], loading: true },
  reducers: {
    deletePost: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter(post => post.id !== id);
    },
    updatePost: (state, action) => {
      const updatedPost = action.payload;
      state.data = state.data.map(post => post.id === updatedPost.id ? updatedPost : post);
    },
  },
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
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.filter(post => post.id !== id);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.data = state.data.map(post => post.id === updatedPost.id ? updatedPost : post);
      });
  },
});


export const selectRounds = (state) => state.rounds;

export default roundsSlice.reducer;

