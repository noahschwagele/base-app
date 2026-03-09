//Notification selector to toggle notifications on and off, and to request permissions if needed

import { useContext, useEffect, useState } from "react";
import { CustomNotificationContext } from "../contexts/CustomNotificationContext";
import { View, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import Switch from "./Switch";
import AppText from "./Text";
import { ThemeContext } from "../contexts/ThemeContext";


const NotificationSelector = () => {
    const { isEnabled, toggleNotifications } = useContext(CustomNotificationContext);
    const [hasPermission, setHasPermission] = useState(false);
    const { paperTheme } = useContext(ThemeContext);
    const colors = paperTheme.colors;

    const containerStyle = {
        backgroundColor: colors.elevation?.level1 || colors.surface,
        borderColor: colors.outline || colors.border,
    };

    const detailTextStyle = {
        color: colors.onSurfaceVariant || colors.textMuted || colors.onSurface,
    };

    useEffect(() => {
        // Check for notification permissions
        const checkPermissions = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            setHasPermission(status === "granted");
        };
        checkPermissions();
    }, []);

    return (
        <View
            style={[
                styles.row,
                containerStyle,
            ]}
        >
            <View style={styles.textContainer}>
                <AppText variant="titleSmall">Notification</AppText>
                <AppText variant="body2" style={[styles.detailText, detailTextStyle]}>
                    Permission: {hasPermission ? "Granted" : "Denied"}
                </AppText>
                <AppText variant="body2" style={[styles.detailText, detailTextStyle]}>
                    Service: {isEnabled ? "Enabled" : "Disabled"}
                </AppText>
            </View>
            <Switch value={isEnabled} onValueChange={toggleNotifications} />
        </View>
    );
};

export default NotificationSelector;

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
        marginTop: 2,
    },
});