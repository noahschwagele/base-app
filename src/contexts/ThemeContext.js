import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createNavigationTheme,
    getThemeByMode,
} from "../../theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    // Load saved theme from AsyncStorage on app start
    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem("selectedTheme");
            setTheme(storedTheme || "light"); // Default to light if nothing is stored
        };
        loadTheme();
    }, []);

    // Function to toggle theme
    const toggleTheme = async () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        await AsyncStorage.setItem("selectedTheme", newTheme);
    };

    const appTheme = getThemeByMode(theme);
    const navTheme = createNavigationTheme(appTheme);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                isDark: appTheme.dark,
                setTheme,
                toggleTheme,
                appTheme,
                paperTheme: appTheme,
                navTheme,
                colors: appTheme.colors,
                components: appTheme.components,
                tokens: appTheme.tokens,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
