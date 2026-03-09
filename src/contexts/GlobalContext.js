//This is a controller so that we can just have all our context providers here

import { CustomNotificationProvider } from "./CustomNotificationContext";
import { NotificationProvider } from "./NotificationContext";
import { OverlayProvider } from "./OverlayContext";
import { ToastProvider } from "./ToastContext";
import { RequestHandlerProvider } from "../utilities/requestHandler";

const GlobalContext = ({ children }) => {
    return (
        <RequestHandlerProvider>
            <ToastProvider>
                <CustomNotificationProvider>
                <NotificationProvider>
                    <OverlayProvider>
                        {children}
                    </OverlayProvider>
                </NotificationProvider>
                </CustomNotificationProvider>
            </ToastProvider>
        </RequestHandlerProvider>
        )
    }

export default GlobalContext;

