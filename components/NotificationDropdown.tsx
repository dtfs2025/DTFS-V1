

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Notification, Page } from '../types.ts';
import { IconBell } from '../constants.tsx';
import NotificationIcon from './NotificationIcon.tsx';

interface NotificationDropdownProps {
    notifications: Notification[];
    onClose: () => void;
    onMarkAllRead: () => void;
    onMarkAsRead: (id: string) => void;
    setActivePage: (page: Page) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications, onClose, onMarkAllRead, onMarkAsRead, setActivePage }) => {
    const { t } = useTranslation();
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.isRead) {
            onMarkAsRead(notification.id);
        }
        if (notification.linkTo) {
            setActivePage(notification.linkTo);
        }
        onClose();
    };
    
    return (
        <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl z-20 animate-fade-in border border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">{t('notifications.title')}</h3>
                {unreadCount > 0 && (
                     <button onClick={onMarkAllRead} className="text-sm font-semibold text-primary-600 hover:text-primary-800">
                        {t('notifications.markAllRead')}
                    </button>
                )}
            </div>
            <div className="overflow-y-auto max-h-96">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div 
                            key={notification.id} 
                            onClick={() => handleNotificationClick(notification)}
                            className={`p-4 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-primary-50/50' : ''}`}
                        >
                            <NotificationIcon type={notification.type} />
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-800">{notification.title}</p>
                                <p className="text-sm text-gray-500">{notification.description}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                            </div>
                            {!notification.isRead && (
                                <div className="w-2.5 h-2.5 bg-primary-500 rounded-full mt-1.5 shrink-0 self-center"></div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <IconBell className="w-12 h-12 mx-auto text-gray-300" />
                        <p className="mt-2 font-semibold">{t('notifications.noNotifications')}</p>
                    </div>
                )}
            </div>
             <div className="p-2 border-t border-gray-200 text-center">
                 <button onClick={onClose} className="w-full p-2 text-sm font-semibold text-primary-600 hover:bg-gray-100 rounded-md">
                    {t('notifications.viewAll')}
                </button>
            </div>
        </div>
    );
}

export default NotificationDropdown;