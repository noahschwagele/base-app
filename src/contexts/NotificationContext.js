//Uses FCM and APNS to send notifications to users when they receive a new message or when they are mentioned in a channel.

import * as Notifications from "expo-notifications";
import { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [expoPushToken, setExpoPushToken] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);

    const syncNotificationState = async () => {
        const token = await registerForPushNotificationsAsync();
        const isEnabled = Boolean(token);
        console.log("Notification permission status:", isEnabled ? "Granted" : "Denied");
        console.log("Expo Push Token:", token);
        setExpoPushToken(token ?? null);
        setHasPermission(isEnabled);

        return isEnabled;
    };

    useEffect(() => {
        syncNotificationState().catch((error) => {
            console.error("Failed to initialize push notifications:", error);
            setExpoPushToken(null);
            setHasPermission(false);
        });
    }, []);

    const toggleNotifications = async (nextValue) => {
        if (!nextValue) {
            const { status } = await Notifications.getPermissionsAsync();
            const isGranted = status === "granted";

            setHasPermission(isGranted);
            if (!isGranted) {
                setExpoPushToken(null);
            }

            return isGranted;
        }

        return syncNotificationState();
    };

    return (
        <NotificationContext.Provider
            value={{
                expoPushToken,
                hasPermission,
                isEnabled: hasPermission && Boolean(expoPushToken),
                toggleNotifications,
                refreshNotifications: syncNotificationState,
                sendLocalNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

//Send a local notification
export async function sendLocalNotification(title, body, data = {}) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: data,
        },
        trigger: null, // null means show immediately
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return null;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert("Must use physical device for Push Notifications");
        return null;
    }

    return token;
}

