import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await fetch('/api/comments');
  const data = await response.json();
  return data;
});

export const addComment = createAsyncThunk('comments/addComment', async (newComment) => {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment),
  });
  const addedComment = await response.json();
  return addedComment;
});

export const updateComment = createAsyncThunk('comments/updateComment', async ({ id, updatedComment }) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedComment),
  });
  const updated = await response.json();
  return updated;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id) => {
  await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { data: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
        state.data = [];
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const { id, ...updatedComment } = action.payload;
        const existingComment = state.data.find((comment) => comment.id === id);
        if (existingComment) {
          Object.assign(existingComment, updatedComment);
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const id = action.payload;
        const existingCommentIndex = state.data.findIndex((comment) => comment.id === id);
        if (existingCommentIndex !== -1) {
          state.data.splice(existingCommentIndex, 1);
        }
      });
  },
});

export const selectComments = (state) => state.comments;

export default commentsSlice.reducer;
