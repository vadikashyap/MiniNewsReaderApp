/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Navigation} from './src/navigation';
import {Provider as ReduxProvider, useSelector} from 'react-redux';
import {store} from './src/store';
import {loadBookmarks, setBookmarks} from './src/store/bookmarksSlice';
import {useDispatch} from 'react-redux';
import {lightTheme, darkTheme} from './src/theme';
import {RootState} from './src/store';

// Note: enableScreens() is not needed here if using react-native-screens >= 3.x

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // Load bookmarks from storage when the app starts
    const initializeBookmarks = async () => {
      const storedBookmarks = await loadBookmarks();
      dispatch(setBookmarks(storedBookmarks));
    };

    initializeBookmarks();
  }, [dispatch]); // Add dispatch as dependency

  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
};

// Wrap the App component with ReduxProvider
const AppWithStore = () => {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
};

export default AppWithStore; // Export the wrapped component
