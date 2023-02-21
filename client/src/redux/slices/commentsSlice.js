import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await fetch('https://example.com/comments');
  const comments = await response.json();
  return comments;
});

export const addComment = createAsyncThunk('comments/addComment', async (newComment) => {
  const response = await fetch('https://example.com/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment),
  });
  const addedComment = await response.json();
  return addedComment;
});

export const updateComment = createAsyncThunk('comments/updateComment', async ({ id, updatedComment }) => {
  const response = await fetch(`https://example.com/comments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedComment),
  });
  const updated = await response.json();
  return updated;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id) => {
  await fetch(`https://example.com/comments/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const { id, ...updatedComment } = action.payload;
        const existingComment = state.comments.find((comment) => comment.id === id);
        if (existingComment) {
          Object.assign(existingComment, updatedComment);
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const id = action.payload;
        const existingCommentIndex = state.comments.findIndex((comment) => comment.id === id);
        if (existingCommentIndex !== -1) {
          state.comments.splice(existingCommentIndex, 1);
        }
      });
  },
});

export const selectComments = (state) => state.comments;

export default commentsSlice.reducer;
