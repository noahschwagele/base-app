import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Darktheme, Lighttheme, NavThemeDark, NavThemeLight} from './theme';
import MainNav from './src/navigation/Main';
import { useColorScheme } from 'react-native';

function themeSelector() {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  return colorScheme == 'dark' ? Darktheme : Lighttheme;
}
function NavThemeSelector() {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  return colorScheme == 'dark' ? NavThemeDark : NavThemeLight;
}

// Main Data
function App() {
  return (
    <NavigationContainer theme={NavThemeSelector()}>
      <StatusBar />
      <MainNav />
    </NavigationContainer>
  );
}

// Main Export
export default function Main() {
  
  return (
    <PaperProvider theme={themeSelector()}>
      <App />
    </PaperProvider>
  );
}
