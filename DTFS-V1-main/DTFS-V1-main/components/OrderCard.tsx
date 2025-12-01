
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Order, OrderStatus } from '../types.ts';
import { IconDotsVertical } from '../constants.tsx';

interface OrderCardProps {
    order: Order;
    onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
    availableActions: OrderStatus[];
    onDragStart: (e: React.DragEvent<HTMLDivElement>, orderId: string) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange, availableActions, onDragStart, onDragEnd }) => {
    const { t } = useTranslation();
    const [isMenuOpen, setMenuOpen] = useState(false);
    
    const handleDragStartLocal = (e: React.DragEvent<HTMLDivElement>) => {
        onDragStart(e, order.id);
        e.currentTarget.style.opacity = '0.5';
    };

    const handleDragEndLocal = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1';
        onDragEnd(e);
    };

    return (
        <div 
            draggable
            onDragStart={handleDragStartLocal}
            onDragEnd={handleDragEndLocal}
            className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 animate-fade-in cursor-grab active:cursor-grabbing transition-opacity">
            <div className="flex justify-between items-start">
                <p className="font-bold text-slate-800">{order.id}</p>
                <div className="relative">
                    <button onClick={() => setMenuOpen(!isMenuOpen)} className="text-slate-500 p-1 rounded-full hover:bg-slate-200">
                        <IconDotsVertical className="w-5 h-5"/>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 animate-fade-in border">
                            {availableActions.map(action => (
                                <a key={action} onClick={() => { onStatusChange(order.id, action); setMenuOpen(false); }} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer">
                                    {t('orderManagement.markAs', { status: t(`orderManagement.statuses.${action}`) })}
                                </a>
                            ))}
                            {availableActions.length === 0 && (
                                <span className="block px-4 py-2 text-sm text-slate-400">{t('common.noAction')}</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <p className="text-sm text-slate-600 mt-2">{order.productName}</p>
            <p className="text-sm text-slate-500">{order.customer}</p>
            <div className="flex justify-between items-end mt-4 pt-2 border-t border-slate-200">
                <p className="text-lg font-bold text-slate-900">${order.amount.toLocaleString()}</p>
                <p className="text-xs text-slate-400">{order.date}</p>
            </div>
        </div>
    );
}

export default OrderCard;
