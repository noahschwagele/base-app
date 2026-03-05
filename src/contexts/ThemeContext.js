import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Darktheme, Lighttheme, NavThemeDark, NavThemeLight } from "../../theme"; // Your themes

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

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, 
            paperTheme: theme === "dark" ? Darktheme : Lighttheme, 
            navTheme: theme === "dark" ? NavThemeDark : NavThemeLight }}>
            {children}
        </ThemeContext.Provider>
    );
};
