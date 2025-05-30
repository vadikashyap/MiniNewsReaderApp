import axios from 'axios';
import {NewsResponse} from '../types';

const API_KEY = '97e86aa1440a452e87ec880079b347a4'; // TODO: Replace with your NewsAPI key
const BASE_URL = 'https://newsapi.org/v2';

export const newsService = {
  async getTopHeadlines(): Promise<NewsResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: 'tesla',
          apiKey: API_KEY,
          sortBy: 'publishedAt',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  },

  async searchByQuery(query: string): Promise<NewsResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: query,
          apiKey: API_KEY,
          language: 'en',
          sortBy: 'relevancy',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching for "${query}":`, error);
      throw error;
    }
  },
};
