// DriverStack.js
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../contexts/ThemeContext';
import NotifictionScreen from '../screens/NotificationStack/NotificationScreen';


const Stack = createNativeStackNavigator();

const NotificationStack = ({ navigation, route }) => {
  const { userToken, userDetails, userRole, logout } = route.params;
  const { colors } = React.useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName='NotificationScreen'
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
        name="NotificationScreen" 
        component={NotifictionScreen} 
        options={{ headerShown: true, title: 'Notifications' }} 
        initialParams={{ userToken, userDetails, logout }}
        />
    </Stack.Navigator>
  );
}

export default NotificationStack;
