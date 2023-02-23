import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: null, // Fetched user data for any user and logged-in user
  loggedUser: null, // Logged-in user data
  isAuthenticated: false,
  isFetching: false,
  allUsers: [], // Array of all users
  loading: false,
  error: null,
};

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

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  console.log(userId)
  const data = await response.json();
  console.log(data)
  return data;
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
});

export const loginUser = createAsyncThunk('user/loginUser', async (userData, { dispatch }) => {
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

export const registerUser = createAsyncThunk('user/registerUser', async (userData, { dispatch }) => {
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
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.loggedUser = action.payload;
        
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.data = null;
        state.loggedUser = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('fetchUserById.fulfilled', action.payload);
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.data = null;
        state.loggedUser = null
        state.isAuthenticated = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticated = true
        
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticated = true
        
      })
  },
});

export const selectUser = (state) => state.user;
export const selectLoggedUser = (state) => state.user.loggedUser
export const selectAllUsers = (state) => state.user.allUsers;
export const selectFetchUserById = (state) => state.user
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;



export default userSlice.reducer;

