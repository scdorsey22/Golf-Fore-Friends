import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('/api/me');
  const data = await response.json();
  return data;
});

export const updateUser = createAsyncThunk('user/updateUser', async (updatedData) => {
  const response = await fetch('/api/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  const data = await response.json();
  return data;
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
});

export const loginUser = createAsyncThunk('user/loginUser', async (userData) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
});

export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
});


export const logOut = createAsyncThunk('user/logOut', async () => {
  const response = await fetch('/api/logout', {
    method: 'DELETE',
  });
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
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.data = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
  },
});

export const selectUser = (state) => state.user;
export const selectAllUsers = (state) => state.user.allUsers;

export default userSlice.reducer;

