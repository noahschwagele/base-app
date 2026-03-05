import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, ThemeContext } from "./src/modules/ThemeContext";
import MainNav from "./src/navigation/Main";
import { StatusBar } from "expo-status-bar";

const AppContent = () => {
    const { paperTheme, navTheme } = useContext(ThemeContext);

    return (
            <NavigationContainer theme={navTheme}>
                <StatusBar />
                <MainNav />
            </NavigationContainer>
    );
};

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
