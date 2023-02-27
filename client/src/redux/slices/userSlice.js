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
  const {id, password, ...data} = updatedData;
 
  const response = await fetch(`/api/users/${id}/update_without_password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData;
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data;
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
});

export const loginUser = createAsyncThunk('user/loginUser', async (userData, { rejectWithValue }) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 401) {
    const error = await response.json();
    return rejectWithValue(error);
  }

  const data = await response.json();

  return data;
});

export const registerUser = createAsyncThunk('user/registerUser', async (userData, { rejectWithValue }) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 422) {
    const errors = await response.json();
  
    return rejectWithValue(errors);
  }

  const data = await response.json();
  
  return data;
});


export const logOut = createAsyncThunk('user/logOut', async () => {
  await fetch('/api/logout', {
    method: 'DELETE',
  });
  
  return null;
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
        state.responseData = action.payload;
       
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loggedUser = null
        state.isAuthenticated = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.loggedUser = action.payload
        state.isAuthenticated = true
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.loggedUser = action.payload
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.errors;
        state.isAuthenticated = false;
      })
  },
});

export const selectUser = (state) => state.user;
export const selectLoggedUser = (state) => state.user.loggedUser
export const selectAllUsers = (state) => state.user.allUsers;
export const selectFetchUserById = (state) => state.user
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;



export default userSlice.reducer;

