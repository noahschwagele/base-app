import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, ThemeContext } from "./src/contexts/ThemeContext";
import MainNav from "./src/navigation/Main";
import { StatusBar } from "expo-status-bar";
import GlobalContext from "./src/contexts/GlobalContext";
import * as Notifications from "expo-notifications";
import { Linking } from "react-native";

const AppContent = () => {
    const { isDark, navTheme } = useContext(ThemeContext);

    return (
        <NavigationContainer theme={navTheme} linking={{
        config: {
          // Configuration for linking
        },
        async getInitialURL() {
          // First, you may want to do the default deep link handling
          // Check if app was opened from a deep link
          const url = await Linking.getInitialURL();

          if (url != null) {
            return url;
          }

          // Handle URL from expo push notifications
          const response = Notifications.getLastNotificationResponse();

          return response?.notification.request.content.data.url;
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }) => listener(url);

          // Listen to incoming links from deep linking
          const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

          // Listen to expo push notifications
          const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const url = response.notification.request.content.data.url;

            // Any custom logic to see whether the URL needs to be handled
            //...

            // Let React Navigation handle the URL
            listener(url);
          });

          return () => {
            // Clean up the event listeners
            eventListenerSubscription.remove();
            subscription.remove();
          };
        },
      }}>
            <StatusBar style={isDark ? "light" : "dark"} />
                <MainNav />
                
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <ThemeProvider>
            <GlobalContext>
                <AppContent />
            </GlobalContext>
        </ThemeProvider>
    );
}
