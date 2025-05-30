import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Searchbar, useTheme} from 'react-native-paper';

interface SearchBarProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onChangeSearch,
}) => {
  const theme = useTheme();

  return (
    <Searchbar
      placeholder="Search news..."
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={[
        styles.searchBar,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.primary,
          borderWidth: 1,
        },
      ]}
      iconColor={theme.colors.primary}
      inputStyle={[
        styles.input,
        {
          color: theme.colors.text,
          backgroundColor: theme.colors.surface,
        },
      ]}
      placeholderTextColor={theme.colors.secondary}
      icon={() => (
        <Image source={require('../assets/search.png')} style={styles.icon} />
      )}
      clearIcon={() =>
        searchQuery.length > 0 ? (
          <Image source={require('../assets/clear.png')} style={styles.icon} />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    margin: 16,
    elevation: 4,
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    height: 40,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
});
