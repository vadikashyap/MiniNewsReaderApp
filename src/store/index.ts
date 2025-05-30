import {configureStore} from '@reduxjs/toolkit';
import bookmarksReducer from './bookmarksSlice';
import themeReducer from './themeSlice';
import articlesReducer from './articlesSlice';

export const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
    theme: themeReducer,
    articles: articlesReducer,
    // Add other reducers here if needed later
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {bookmarks: BookmarksState, ...}
export type AppDispatch = typeof store.dispatch;
