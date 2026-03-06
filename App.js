import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, ThemeContext } from "./src/contexts/ThemeContext";
import { OverlayProvider } from "./src/contexts/OverlayContext";
import { ToastProvider } from "./src/contexts/ToastContext";
import { OverlayRenderer, ToastManager } from "./src/components";
import MainNav from "./src/navigation/Main";
import { StatusBar } from "expo-status-bar";

const AppContent = () => {
    const { isDark, navTheme } = useContext(ThemeContext);

    return (
        <NavigationContainer theme={navTheme}>
            <StatusBar style={isDark ? "light" : "dark"} />
            <MainNav />
            <OverlayRenderer />
            <ToastManager />
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <ThemeProvider>
            <ToastProvider>
                <OverlayProvider>
                    <AppContent />
                </OverlayProvider>
            </ToastProvider>
        </ThemeProvider>
    );
}
