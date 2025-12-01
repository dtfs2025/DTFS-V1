import React from 'react';
import { NotificationType } from '../types.ts';
import { IconBox, IconChat, IconWallet, IconDocument, IconBell } from '../constants.tsx';

interface NotificationIconProps {
    type: NotificationType;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
    const iconMap: Record<NotificationType, React.FC<React.SVGProps<SVGSVGElement>>> = {
        order: IconBox,
        chat: IconChat,
        payment: IconWallet,
        document: IconDocument,
        system: IconBell,
    };
    const Icon = iconMap[type];
    const colorMap: Record<NotificationType, string> = {
        order: 'bg-blue-100 text-blue-600',
        chat: 'bg-purple-100 text-purple-600',
        payment: 'bg-green-100 text-green-600',
        document: 'bg-yellow-100 text-yellow-600',
        system: 'bg-gray-100 text-gray-600'
    };
    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorMap[type]}`}>
            <Icon className="w-5 h-5" />
        </div>
    );
};

export default NotificationIcon;
