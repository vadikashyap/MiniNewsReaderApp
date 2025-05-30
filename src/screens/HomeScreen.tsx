import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, StyleSheet, RefreshControl, View, Text} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {NewsCard} from '../components/NewsCard';
import {newsService} from '../services/newsService';
import {Article} from '../types';
import {SearchBar} from '../components/SearchBar';
import {ThemeToggle} from '../components/ThemeToggle';
import debounce from 'lodash.debounce';
import {saveArticles, loadArticles} from '../store/articlesSlice';

export const HomeScreen = ({navigation}: any) => {
  const theme = useTheme();
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
      await saveArticles(response.articles); // Save to AsyncStorage
    } catch (error) {
      console.error('Error fetching news:', error);

      const cached = await loadArticles();
      setArticles(cached);
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
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <SearchBar
        searchQuery={searchQuery}
        onChangeSearch={handleSearchChange}
      />

      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={theme.colors.primary}
        />
      ) : showEmptyState ? (
        <View style={styles.emptyStateContainer}>
          <Text
            style={[styles.emptyStateText, {color: theme.colors.secondary}]}>
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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
          keyboardShouldPersistTaps="handled"
        />
      )}
      <ThemeToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    textAlign: 'center',
  },
});
