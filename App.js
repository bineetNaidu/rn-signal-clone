import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register';
import Home from './screens/Home';
import AddChat from './screens/AddChat';
import Chat from './screens/Chat';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#2c6BED' },
          headerTintColor: 'white',
          headerTitleStyle: { color: 'white' },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
