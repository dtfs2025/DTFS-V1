import React from 'react';
import { Notification, Page } from '../types.ts';
import Toast from './Toast.tsx';

interface ToastContainerProps {
    toasts: Notification[];
    removeToast: (id: string) => void;
    setActivePage: (page: Page) => void;
    markNotificationAsRead: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast, setActivePage, markNotificationAsRead }) => {
    
    const handleNotificationClick = (notification: Notification) => {
        markNotificationAsRead(notification.id);
        if (notification.linkTo) {
            setActivePage(notification.linkTo);
        }
    };
    
    return (
        <div className="fixed top-24 right-4 z-[100] space-y-3">
            {toasts.map(toast => (
                <Toast 
                    key={toast.id} 
                    notification={toast}
                    onDismiss={removeToast}
                    onNotificationClick={handleNotificationClick}
                />
            ))}
        </div>
    );
};

export default ToastContainer;
