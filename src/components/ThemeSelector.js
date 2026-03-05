import React, { useContext } from "react";
import { View, Switch, Text } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeSelector = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text>Current Theme: {theme}</Text>
            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
        </View>
    );
};

export default ThemeSelector;
