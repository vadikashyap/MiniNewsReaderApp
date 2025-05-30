import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {toggleTheme} from '../store/themeSlice';
import {useTheme} from 'react-native-paper';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: theme.colors.primary}]}
      onPress={() => dispatch(toggleTheme())}>
      <Image
        source={
          isDarkMode
            ? require('../assets/light.png')
            : require('../assets/dark.png')
        }
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    width: 22,
    height: 22,
  },
});
