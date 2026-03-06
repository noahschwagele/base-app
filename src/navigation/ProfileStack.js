// DriverStack.js
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../contexts/ThemeContext';

// Import Driver Screens
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation, route }) => {
  const { userToken, userDetails, userRole, logout } = route.params;
  const { colors } = React.useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName='ProfileScreen'
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
