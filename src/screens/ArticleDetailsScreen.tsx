import React, {useLayoutEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Text, Title, Paragraph, IconButton} from 'react-native-paper';
import {Article} from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {addBookmark, removeBookmark} from '../store/bookmarksSlice';

export const ArticleDetailsScreen = ({route, navigation}: any) => {
  const {article} = route.params;
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={() => (
            <Icon
              name={isBookmarked ? 'bookmark' : 'bookmark-border'}
              size={24}
              color="#fff"
            />
          )}
          size={24}
          onPress={handleBookmarkToggle}
        />
      ),
    });
  }, [navigation, isBookmarked, handleBookmarkToggle]);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      {article.urlToImage && (
        <Image source={{uri: article.urlToImage}} style={styles.image} />
      )}
      <View style={styles.contentContainer}>
        <Title style={styles.title}>{article.title}</Title>
        <View style={styles.metaContainer}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
        </View>
        <Paragraph style={styles.description}>{article.description}</Paragraph>
        {article.content && (
          <Paragraph style={styles.content}>{article.content}</Paragraph>
        )}
        <Text
          style={styles.readMore}
          onPress={() => handleLinkPress(article.url)}>
          Read full article at: {article.url}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  source: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  readMore: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
