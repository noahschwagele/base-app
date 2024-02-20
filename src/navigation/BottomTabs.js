// BottomTabs.js
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import the Operator and Driver Stacks
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs({route}) {
  // get Route Params
  const {userToken, userRole, userDetails, logout} = route.params;

  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      // inactiveColor='grey'
      // activeColor='#fff'
      barStyle={theme.colors.primary}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        initialParams={{ userToken, userDetails, userRole, logout }}
      />
    </Tab.Navigator>
  );
}
