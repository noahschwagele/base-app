// BottomTabs.js
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import the Operator and Driver Stacks
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

export default function BottomTabs({route}) {
  // get Route Params
  const {userToken, userRole, userDetails, logout} = route.params;

  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={theme.colors.primary}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        initialParams={{ userToken, userDetails, userRole, logout }}
      />
       <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        initialParams={{ userToken, userDetails, userRole, logout }}
      />
    </Tab.Navigator>
  );
}
