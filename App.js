import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, ThemeContext } from "./src/modules/ThemeContext";
import MainNav from "./src/navigation/Main";
import { StatusBar } from "expo-status-bar";

const AppContent = () => {
    const { paperTheme, navTheme } = useContext(ThemeContext);

    return (
        <PaperProvider theme={paperTheme}>
            <NavigationContainer theme={navTheme}>
                <StatusBar />
                <MainNav />
            </NavigationContainer>
        </PaperProvider>
    );
};

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
