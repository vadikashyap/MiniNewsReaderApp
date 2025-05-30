import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Searchbar as PaperSearchbar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface SearchBarProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  onSubmit?: () => void; // Optional onSubmit for triggering search
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onChangeSearch,
  onSubmit,
}) => {
  return (
    <View style={styles.container}>
      <PaperSearchbar
        placeholder="Search articles..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={onSubmit}
        style={styles.searchbar}
        icon={() => (
          <Image source={require('../assets/search.png')} style={styles.icon} />
        )}
        clearIcon={() =>
          searchQuery.length ? (
            <Image
              source={require('../assets/clear.png')}
              style={styles.icon}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff', // Optional: set background color
  },
  searchbar: {
    elevation: 2, // Optional: add shadow on Android
  },
  icon: {
    width: 22,
    height: 22,
  },
});
