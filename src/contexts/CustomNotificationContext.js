import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import { useToast } from "./ToastContext";

export const CustomNotificationContext = createContext();

const CUSTOM_NOTIFICATION_TASK = "custom-notification-task";
const TASK_STORAGE_KEY = "customNotificationTask";



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

if (!TaskManager.isTaskDefined(CUSTOM_NOTIFICATION_TASK)) {
    TaskManager.defineTask(CUSTOM_NOTIFICATION_TASK, async () => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Background check complete",
                    body: "Custom background task is still running.",
                },
                trigger: null,
            });

            return BackgroundTask.BackgroundTaskResult.Success;
        } catch (error) {
            console.error("Custom notification task failed:", error);
            return BackgroundTask.BackgroundTaskResult.Failed;
        }
    });
}

const configureNotificationsAsync = async () => {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.DEFAULT,
        });
    }

    const permission = await Notifications.getPermissionsAsync();
    if (permission.granted) {
        return true;
    }

    const requestResult = await Notifications.requestPermissionsAsync();
    return requestResult.granted;
};

const canRunBackgroundTaskAsync = async () => {
    const [taskManagerAvailable, backgroundTaskStatus] = await Promise.all([
        TaskManager.isAvailableAsync(),
        BackgroundTask.getStatusAsync(),
    ]);

    return (
        taskManagerAvailable &&
        backgroundTaskStatus === BackgroundTask.BackgroundTaskStatus.Available
    );
};

const registerTaskAsync = async () => {
    await BackgroundTask.registerTaskAsync(CUSTOM_NOTIFICATION_TASK, {
        minimumInterval: 15,
    });
};

const unregisterTaskAsync = async () => {
    await BackgroundTask.unregisterTaskAsync(CUSTOM_NOTIFICATION_TASK);
};

const stopTaskIfRegisteredAsync = async () => {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(CUSTOM_NOTIFICATION_TASK);
    if (isRegistered) {
        await unregisterTaskAsync();
    }
};

export const CustomNotificationProvider = ({ children }) => {
    const { showToast } = useToast();

    const [isTaskActive, setIsTaskActive] = useState(false);
    const [hasNotificationPermission, setHasNotificationPermission] = useState(false);
    const [backgroundTaskStatus, setBackgroundTaskStatus] = useState(null);
    const [isTaskRegistered, setIsTaskRegistered] = useState(false);

    const refreshTaskStateAsync = async () => {
        const [status, registered] = await Promise.all([
            BackgroundTask.getStatusAsync(),
            TaskManager.isTaskRegisteredAsync(CUSTOM_NOTIFICATION_TASK),
        ]);

        setBackgroundTaskStatus(status);
        setIsTaskRegistered(registered);

        return { status, registered };
    };

    const ensureTaskRunningAsync = async () => {
        const canRunTask = await canRunBackgroundTaskAsync();
        if (!canRunTask) {
            return false;
        }

        const alreadyRegistered = await TaskManager.isTaskRegisteredAsync(CUSTOM_NOTIFICATION_TASK);
        if (!alreadyRegistered) {
            await registerTaskAsync();
        }

        const updatedTaskState = await refreshTaskStateAsync();
        return (
            updatedTaskState.status === BackgroundTask.BackgroundTaskStatus.Available &&
            updatedTaskState.registered
        );
    };

    useEffect(() => {
        const loadTaskStatus = async () => {
            const isPermissionGranted = await configureNotificationsAsync();
            setHasNotificationPermission(isPermissionGranted);

            const status = await AsyncStorage.getItem(TASK_STORAGE_KEY);
            const shouldBeActive = status === "active";

            if (shouldBeActive && isPermissionGranted) {
                await ensureTaskRunningAsync();
            } else {
                await stopTaskIfRegisteredAsync();

                if (shouldBeActive && !isPermissionGranted) {
                    await AsyncStorage.setItem(TASK_STORAGE_KEY, "inactive");
                }
            }

            const taskState = await refreshTaskStateAsync();
            const isRunning =
                isPermissionGranted &&
                taskState.status === BackgroundTask.BackgroundTaskStatus.Available &&
                taskState.registered;

            setIsTaskActive(isRunning);
            await AsyncStorage.setItem(TASK_STORAGE_KEY, isRunning ? "active" : "inactive");
        };

        loadTaskStatus().catch((error) => {
            showToast("Error initializing custom notification task", {type : 'error'});
            console.error("Unable to initialize custom notification task:", error);
        });
    }, []);

    const toggleTask = async () => {
        const newStatus = !isTaskActive;
        let permissionGrantedNow = hasNotificationPermission;

        try {
            if (newStatus) {
                const isPermissionGranted = await configureNotificationsAsync();
                setHasNotificationPermission(isPermissionGranted);
                permissionGrantedNow = isPermissionGranted;

                if (!isPermissionGranted) {
                    throw new Error("Notification permission was not granted.");
                }

                const isRunning = await ensureTaskRunningAsync();
                if (!isRunning) {
                    throw new Error("Background task could not be registered.");
                }
            } else {
                await stopTaskIfRegisteredAsync();
            }

            const taskState = await refreshTaskStateAsync();
            const isRunning =
                permissionGrantedNow &&
                taskState.status === BackgroundTask.BackgroundTaskStatus.Available &&
                taskState.registered;

            setIsTaskActive(isRunning);
            await AsyncStorage.setItem(TASK_STORAGE_KEY, isRunning ? "active" : "inactive");
        } catch (error) {
            console.error("Unable to toggle custom notification task:", error);
            showToast("Error toggling custom notification task", {type : 'error'});
        }
    };

    return (
        <CustomNotificationContext.Provider
            value={{
                isTaskActive,
                hasNotificationPermission,
                backgroundTaskStatus,
                isTaskRegistered,
                toggleTask,
                refreshTaskStateAsync,
            }}
        >
            {children}
        </CustomNotificationContext.Provider>
    );
};