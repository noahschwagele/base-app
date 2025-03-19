import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

//import the Screens
import SplashScreen from '../screens/SplashScreen';
import BottomTabs from './BottomTabs';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState(null);
  const [userRole, setUserRole] = React.useState('Driver');
  const navigation = useNavigation();

  const logout = async () => {
    // Implement your logout logic here

    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userRole');
    setUserRole(null)
    setUserToken(null)
  };

  const getUserToken = async () => {
    // testing purposes
    try {
      const token = await AsyncStorage.getItem('userToken');
      const role = await AsyncStorage.getItem('userRole');
      setUserRole(role)
      setUserToken(token);
      
    }catch (error){

      console.error('Error retrieving users data locally saved')

    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getUserToken();
  }, []);

  React.useEffect(() => {
    // This effect will run whenever userToken changes
    if (userToken === null) {
      // User is not logged in, navigate to the login screen
      navigation.navigate('Login');
    }
  }, [userToken, navigation]);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {userToken == null ? (
        // No token found, user isn't signed in
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
            headerShown: false,
          }}
          initialParams={{ setUserToken, setUserDetails, setUserRole }}
        />
      ) : (
        // Driver Screens
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            headerShown: false,
            // headerRight: () => (
            //   <Button onPress={() => navigation.goBack()} title="Info">
            //     Back
            //   </Button>
            // ),
          }}
          initialParams={{ userToken, userDetails, userRole, logout }}
        />
        )}
      
    </Stack.Navigator>
  );
};

export default App;