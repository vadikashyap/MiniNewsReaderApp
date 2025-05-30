import {configureStore} from '@reduxjs/toolkit';
import bookmarksReducer from './bookmarksSlice';

export const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
    // Add other reducers here if needed later
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {bookmarks: BookmarksState, ...}
export type AppDispatch = typeof store.dispatch;
