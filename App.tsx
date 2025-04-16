import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Animated, Easing, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screen/Login';

// Add more providers other than google like auth0

const Stack = createStackNavigator();

// update it as per latest requirements
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Hides the header for all screens
        }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
