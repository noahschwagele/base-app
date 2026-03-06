// DriverStack.js
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../contexts/ThemeContext';

import HomeScreen from '../screens/HomeStack/HomeScreen';




const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation, route }) => {
  const { userToken, userDetails, userRole, logout } = route.params;
  const { colors } = React.useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.text,
        },
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
