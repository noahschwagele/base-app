// DriverStack.js
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { Image } from 'react-native';
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
        headerRight: () => (
          <Image source={{uri: 'https://www.tmsinternational.com/images/TMS_logos/TMS-No-Tagline.png'}} style={{width: 100, height: 40, resizeMode:'contain'}} />
        ),
      }}
    >
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ headerShown: true, title: 'Profile' }} 
        initialParams={{ userToken, userDetails, logout }}
        />
    </Stack.Navigator>
  );
}

export default ProfileStack;
