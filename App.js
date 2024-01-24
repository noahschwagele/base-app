import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {theme}  from './theme';
import MainNav from './src/navigation/Main';



//Main Data
function App(){
    return(
      <NavigationContainer >
          <MainNav/>
      </NavigationContainer>
    )
}


//Main Export
export default function Main() {

  return (
    <PaperProvider theme={theme}>
      <StatusBar/>
      <App/>
    </PaperProvider>
  );
}

