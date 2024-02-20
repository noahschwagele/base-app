// DriverStack.js
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeStack/HomeScreen';




const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation, route }) => {
  const { userToken, userDetails, userRole, logout } = route.params;
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleStyle: {backgroundColor: theme.colors.onSurface}
      }}
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: true, title: 'Home' }} 
        initialParams={{ userToken, userDetails, logout }}
        />
    </Stack.Navigator>
  );
}

export default HomeStack;
