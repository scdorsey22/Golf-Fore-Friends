import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import roundsReducer from '../slices/roundsSlice';
import golfBuddiesReducer from '../slices/golfBuddiesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    rounds: roundsReducer,
    golfBuddies: golfBuddiesReducer,
  },
});
