import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#f4511e',
    secondary: '#666666',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    error: '#B00020',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#ff7043',
    secondary: '#999999',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    error: '#CF6679',
  },
};
