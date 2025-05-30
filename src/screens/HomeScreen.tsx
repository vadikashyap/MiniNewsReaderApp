import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, StyleSheet, RefreshControl, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {NewsCard} from '../components/NewsCard';
import {newsService} from '../services/newsService';
import {Article} from '../types';
import {SearchBar} from '../components/SearchBar';
import debounce from 'lodash.debounce';

export const HomeScreen = ({navigation}: any) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNews = async (query = '') => {
    setLoading(true);
    try {
      let response;
      if (query.trim() === '') {
        response = await newsService.getTopHeadlines();
      } else {
        response = await newsService.searchByQuery(query);
      }
      setArticles(response.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchNews(query);
    }, 500),
    [],
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setSearchQuery('');
    fetchNews();
  };

  const handleArticlePress = (article: Article) => {
    navigation.navigate('ArticleDetails', {article});
  };

  const showEmptyState =
    !loading && articles.length === 0 && searchQuery.trim() !== '';

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        onChangeSearch={handleSearchChange}
      />

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : showEmptyState ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No articles found for "{searchQuery}"
          </Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          renderItem={({item}) => (
            <NewsCard article={item} onPress={handleArticlePress} />
          )}
          keyExtractor={(item, index) => item.url + index}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});
