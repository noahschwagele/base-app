// DriverStack.js
import * as React from 'react';
import { Button, useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Driver Screens
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation, route }) => {
  const { userToken, userDetails, userRole, logout } = route.params;
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName='ProfileScreen'
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleStyle: {backgroundColor: theme.colors.onSurface}
      }}
    >
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ 
          headerShown: true, 
          title: 'Profile',
          headerRight: () => (<Button onPress={logout}>Logout</Button>)
        }} 
        initialParams={{ userToken, userDetails, logout }}
        />
    </Stack.Navigator>
  );
}

export default ProfileStack;
