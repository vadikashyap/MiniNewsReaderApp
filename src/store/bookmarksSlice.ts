import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Article} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

interface BookmarksState {
  articles: Article[];
}

const initialState: BookmarksState = {
  articles: [],
};

const BOOKMARKS_STORAGE_KEY = 'miniNewsReaderBookmarks';

const saveBookmarks = async (bookmarks: Article[]) => {
  try {
    const jsonValue = JSON.stringify(bookmarks);
    await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving bookmarks to AsyncStorage', e);
  }
};

// Load bookmarks on app start (will be called outside the slice)
export const loadBookmarks = async (): Promise<Article[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading bookmarks from AsyncStorage', e);
    return []; // Return empty array on error
  }
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Article>) => {
      const articleToAdd = action.payload;
      // Check if article already exists to avoid duplicates
      const exists = state.articles.some(
        article => article.url === articleToAdd.url,
      );
      if (!exists) {
        state.articles.push(articleToAdd);
        // Save updated bookmarks to AsyncStorage
        saveBookmarks(state.articles);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      const urlToRemove = action.payload;
      state.articles = state.articles.filter(
        article => article.url !== urlToRemove,
      );
      // Save updated bookmarks to AsyncStorage
      saveBookmarks(state.articles);
    },
    // Action to set bookmarks when loaded from AsyncStorage
    setBookmarks: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
  },
});

export const {addBookmark, removeBookmark, setBookmarks} =
  bookmarksSlice.actions;
export default bookmarksSlice.reducer;
