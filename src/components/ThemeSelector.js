import React, { useContext } from "react";
import { View } from "react-native";
import { Button, Switch, Text } from "react-native-paper";
import { ThemeContext } from "../modules/ThemeContext";

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
