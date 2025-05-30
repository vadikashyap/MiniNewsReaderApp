import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {ArticleDetailsScreen} from '../screens/ArticleDetailsScreen';
import {BookmarksScreen} from '../screens/BookmarksScreen';
import {TouchableOpacity, Image} from 'react-native';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: 'News Reader',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Bookmarks')}>
                <Image
                  source={require('../assets/bookmark-fill.png')}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ArticleDetails"
          component={ArticleDetailsScreen}
          options={{title: 'Article Details'}}
        />
        <Stack.Screen
          name="Bookmarks"
          component={BookmarksScreen}
          options={{title: 'Bookmarks'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
