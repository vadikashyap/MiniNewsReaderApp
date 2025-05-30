import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Card, Text, IconButton, useTheme} from 'react-native-paper';
import {Article} from '../types';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {addBookmark, removeBookmark} from '../store/bookmarksSlice';

interface NewsCardProps {
  article: Article;
  onPress: (article: Article) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({article, onPress}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state: RootState) =>
    state.bookmarks.articles.some(bookmark => bookmark.url === article.url),
  );

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(article.url));
    } else {
      dispatch(addBookmark(article));
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress(article)}>
      <Card style={[styles.card, {backgroundColor: theme.colors.surface}]}>
        {article.urlToImage && (
          <Card.Cover source={{uri: article.urlToImage}} style={styles.image} />
        )}
        <Card.Content>
          <View style={styles.titleContainer}>
            <Text
              variant="titleMedium"
              style={[styles.title, {color: theme.colors.text}]}
              numberOfLines={2}>
              {article.title}
            </Text>
            <IconButton
              icon={() => (
                <Image
                  source={
                    isBookmarked
                      ? require('../assets/bookmark-fill.png')
                      : require('../assets/bookmark.png')
                  }
                  style={{width: 24, height: 24}}
                />
              )}
              size={24}
              onPress={handleBookmarkToggle}
              style={styles.bookmarkButton}
            />
          </View>
          <View style={styles.footer}>
            <Text
              variant="bodySmall"
              style={[styles.source, {color: theme.colors.secondary}]}>
              {article.source.name}
            </Text>
            <Text
              variant="bodySmall"
              style={[styles.date, {color: theme.colors.secondary}]}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  },
  image: {
    height: 200,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 8,
  },
  bookmarkButton: {
    margin: 0,
    padding: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  source: {
    color: '#666',
  },
  date: {
    color: '#666',
  },
});

// npm cache clean --force
// watchman watch-del-all
// rm -rf node_modules
// rm -rf $TMPDIR/react-*
// rm -rf $TMPDIR/metro-*
// cd android && ./gradlew clean && cd ..
// npm install
