import React, { useEffect, useState } from 'react';
import { Notification, Page } from '../types.ts';
import { IconX } from '../constants.tsx';
import NotificationIcon from './NotificationIcon.tsx';

interface ToastProps {
    notification: Notification;
    onDismiss: (id: string) => void;
    onNotificationClick: (notification: Notification) => void;
}

const Toast: React.FC<ToastProps> = ({ notification, onDismiss, onNotificationClick }) => {
    const [isExiting, setIsExiting] = useState(false);
    
    const DURATION = 5000; // 5 seconds

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, DURATION);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        // Let the fade-out animation play before removing from DOM
        setTimeout(() => {
            onDismiss(notification.id);
        }, 400); // match animation duration
    };
    
    const handleClick = () => {
        onNotificationClick(notification);
        handleClose();
    };

    const animationClass = isExiting ? 'animate-fade-out' : 'animate-slide-in-right';

    return (
        <div className={`w-96 max-w-sm bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-200/80 ${animationClass}`}>
            <div className="p-4 flex items-start gap-4 cursor-pointer" onClick={handleClick}>
                <NotificationIcon type={notification.type} />
                <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{notification.title}</p>
                    <p className="text-sm text-gray-500">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                </div>
                 <button onClick={(e) => { e.stopPropagation(); handleClose(); }} className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 shrink-0">
                    <IconX className="w-5 h-5" />
                </button>
            </div>
            <div className="h-1 bg-primary-200/50">
                <div className="h-1 bg-primary-400 animate-progress-bar" style={{ animationDuration: `${DURATION}ms` }}></div>
            </div>
        </div>
    );
};

export default Toast;
