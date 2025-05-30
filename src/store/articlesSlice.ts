// src/store/articlesSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Article} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ARTICLES_KEY = 'offlineArticles';

export const loadArticles = async (): Promise<Article[]> => {
  try {
    const data = await AsyncStorage.getItem(ARTICLES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load articles from storage', e);
    return [];
  }
};

export const saveArticles = async (articles: Article[]) => {
  try {
    await AsyncStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error('Failed to save articles to storage', e);
  }
};

interface ArticlesState {
  articles: Article[];
}

const initialState: ArticlesState = {
  articles: [],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
  },
});

export const {setArticles} = articlesSlice.actions;
export default articlesSlice.reducer;
