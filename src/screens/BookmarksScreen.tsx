import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux'; // Import useSelector
import {RootState} from '../store'; // Import RootState
import {NewsCard} from '../components/NewsCard';
import {Article} from '../types';

export const BookmarksScreen = ({navigation}: any) => {
  // Get bookmarked articles from Redux store
  const bookmarkedArticles = useSelector(
    (state: RootState) => state.bookmarks.articles,
  );

  const handleArticlePress = (article: Article) => {
    navigation.navigate('ArticleDetails', {article});
  };

  // Show empty state if no bookmarks
  if (bookmarkedArticles.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>No bookmarks yet!</Text>
        <Text style={styles.emptyStateText}>
          Bookmark articles from the Home screen to see them here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookmarkedArticles}
      renderItem={({item}) => (
        <NewsCard article={item} onPress={handleArticlePress} />
      )}
      keyExtractor={item => item.url} // Assuming URL is unique for bookmarked articles
      contentContainerStyle={styles.listContent} // Add padding
    />
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  listContent: {
    // Style for FlatList content container
    paddingBottom: 16, // Add some padding at the bottom
  },
});
