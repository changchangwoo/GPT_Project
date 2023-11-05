import React from 'react';
import FontLoader from './component/FontLoader';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import ChatScreen from './screens/ChatScreen';
import IntroScreen from './screens/IntroScreen';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer independent={true}>
      <FontLoader>
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
      </FontLoader>
    </NavigationContainer>
  );
}