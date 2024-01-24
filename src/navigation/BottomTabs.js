// BottomTabs.js
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for storing user role

// Import the Operator and Driver Stacks
import ProfileStack from './ProfileStack';
import DriverStack from './DriverStack';
import OperatorStack from './OperatorStack';


const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs({route}) {
  // get Route Params
  const {userToken, userRole, userDetails, logout} = route.params;

  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      inactiveColor='#000'
      activeColor='#fff'
      barStyle={{ backgroundColor: theme.colors.primaryContainer, height: 50 }}
      compact={true}
    >
      <Tab.Screen
        name="Home"
        component={(userRole === 'Operator' ? OperatorStack : DriverStack )} // Use DriverStack as the default, can be changed based on authentication logic
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={userRole === 'Operator' ? 'headset' : 'truck'} color={color} size={26} />
          ),
        }}
        initialParams={{userRole, userDetails}}
      />
      {/* {userRole === 'Operator' && ( <Tab.Screen
        name="Selections"
        component={SelectionStack} // Use DriverStack as the default, can be changed based on authentication logic
        options={{
          tabBarLabel: 'Select',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="truck" color={color} size={26} />
          ),
        }}
      />       
      )} */}
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
