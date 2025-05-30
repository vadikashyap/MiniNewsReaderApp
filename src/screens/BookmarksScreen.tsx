import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux'; // Import useSelector
import {RootState} from '../store'; // Import RootState
import {NewsCard} from '../components/NewsCard';
import {Article} from '../types';
import {useTheme} from 'react-native-paper';
import {ThemeToggle} from '../components/ThemeToggle';

export const BookmarksScreen = ({navigation}: any) => {
  const theme = useTheme();
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
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={styles.emptyStateContainer}>
          <Text
            style={[styles.emptyStateText, {color: theme.colors.secondary}]}>
            No bookmarked articles yet
          </Text>
          <Text style={styles.emptyStateText}>
            Bookmark articles from the Home screen to see them here.
          </Text>
        </View>
        <ThemeToggle />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <FlatList
        data={bookmarkedArticles}
        renderItem={({item}) => (
          <NewsCard article={item} onPress={handleArticlePress} />
        )}
        keyExtractor={(item, index) => item.url + index}
        contentContainerStyle={styles.listContent} // Add padding
      />
      <ThemeToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  listContent: {
    // Style for FlatList content container
    paddingBottom: 16, // Add some padding at the bottom
  },
});
