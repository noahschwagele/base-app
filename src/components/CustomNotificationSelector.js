import React, { useContext } from "react";
import { View, Switch, StyleSheet } from "react-native";
import AppText from "./Text";
import { CustomNotificationContext } from "../contexts/CustomNotificationContext";
import { ThemeContext } from "../contexts/ThemeContext";
import * as BackgroundTask from "expo-background-task";

const STATUS_LABELS = {
    [BackgroundTask.BackgroundTaskStatus.Restricted]: "Restricted",
    [BackgroundTask.BackgroundTaskStatus.Available]: "Available",
};

const CustomNotificationSelector = () => {
    const { colors } = useContext(ThemeContext);
    const {
        isTaskActive,
        hasNotificationPermission,
        backgroundTaskStatus,
        isTaskRegistered,
        toggleTask,
    } = useContext(CustomNotificationContext);

    const statusLabel =
        backgroundTaskStatus === null ? "Unknown" : STATUS_LABELS[backgroundTaskStatus] || "Unknown";

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
            <View style={styles.textContainer}>
                <AppText>Custom Notification </AppText>
                <AppText style={styles.detailText}>Permission: {hasNotificationPermission ? "Granted" : "Denied"}</AppText>
                <AppText style={styles.detailText}>Service: {statusLabel}</AppText>
                <AppText style={styles.detailText}>Registered: {isTaskRegistered ? "Yes" : "No"}</AppText>
            </View>
            <Switch value={isTaskActive} onValueChange={toggleTask} />
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
    textContainer: {
        flex: 1,
        paddingRight: 12,
    },
    detailText: {
        opacity: 0.7,
        fontSize: 12,
        marginTop: 2,
    },
});

export default CustomNotificationSelector;
