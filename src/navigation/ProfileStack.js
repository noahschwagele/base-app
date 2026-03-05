// DriverStack.js
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Driver Screens
import ProfileScreen from '../screens/ProfileScreen'
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation, route }) => {
  const { userToken, userDetails, userRole, logout } = route.params;
  return (
    <Stack.Navigator
      initialRouteName='ProfileScreen'
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ 
          headerShown: true, 
          title: 'Profile',
          // headerRight: () => (<Button onPress={logout}>Logout</Button>)
        }} 
        initialParams={{ userToken, userDetails, logout }}
        />
    </Stack.Navigator>
  );
}

export default ProfileStack;
