import React, { useContext } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import AppText from "./Text";

const ThemeSelector = () => {
    const { theme, toggleTheme, colors } = useContext(ThemeContext);

    return (
        <View
            style={[
                styles.row,
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                },
            ]}
        >
            <AppText>Current Theme: {theme}</AppText>
            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
});

export default ThemeSelector;
