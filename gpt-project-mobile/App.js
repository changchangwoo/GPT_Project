import React from 'react';
import FontLoader from './component/FontLoader';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './screens/ChatScreen';
import IntroScreen from './screens/IntroScreen';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import ListScreen from './screens/ListScreen';
import ReChatScreen from './screens/ReChatScreen';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer independent={true}>
      <FontLoader>
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="ReChat" component={ReChatScreen} />

        </Stack.Navigator>
      </FontLoader>
    </NavigationContainer>
  );
}