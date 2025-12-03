import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Order, OrderStatus, Notification } from '../types.ts';
import { IconSearch, IconDotsVertical, IconBox, IconTableView, IconCardView } from '../constants.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import OrderCard from './OrderCard.tsx';

interface OrderManagementProps {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    setToasts: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ orders, setOrders, setToasts }) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'table' | 'board'>('table');

    // Drag & Drop State
    const [draggedOrderId, setDraggedOrderId] = useState<string | null>(null);
    const [dragOverStatus, setDragOverStatus] = useState<OrderStatus | null>(null);


    const userOrders = user
        ? orders.filter(o =>
            o.exporterId === user.id &&
            (o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
             o.customer.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : [];

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Shipped': return 'bg-indigo-100 text-indigo-700';
            case 'Delivered': return 'bg-green-100 text-green-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };
    
    const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
        setToasts(prev => [...prev, {
            id: `toast-${Date.now()}`,
            type: 'order',
            title: t('orderManagement.toast.statusChangeTitle'),
            description: t('orderManagement.toast.statusChangeDescription', { id: orderId, status: t(`orderManagement.statuses.${newStatus}`) }),
            isRead: false,
            timestamp: t('common.justNow'),
            linkTo: 'Order Management',
        }]);
        setOpenMenuId(null);
    };

    const getAvailableActions = (currentStatus: Order['status']): Order['status'][] => {
        switch (currentStatus) {
            case 'Pending': return ['Processing'];
            case 'Processing': return ['Shipped'];
            case 'Shipped': return ['Delivered'];
            default: return [];
        }
    };

    const orderStatuses: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];

    // Drag & Drop Handlers
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, orderId: string) => {
        setDraggedOrderId(orderId);
        e.dataTransfer.effectAllowed = 'move';
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (status: OrderStatus) => {
        const order = orders.find(o => o.id === draggedOrderId);
        if (order && getAvailableActions(order.status).includes(status)) {
            setDragOverStatus(status);
        }
    };
    
    const handleDragLeave = () => {
        setDragOverStatus(null);
    };

    const handleDrop = (status: OrderStatus) => {
        if (draggedOrderId) {
            const order = orders.find(o => o.id === draggedOrderId);
            if (order && getAvailableActions(order.status).includes(status)) {
                handleStatusChange(draggedOrderId, status);
            }
        }
        setDraggedOrderId(null);
        setDragOverStatus(null);
    };
    
    const handleDragEnd = () => {
        setDraggedOrderId(null);
        setDragOverStatus(null);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-full mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t('orderManagement.title')}</h1>
                    <p className="text-slate-500 mt-1">{t('orderManagement.description')}</p>
                </div>
                 <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('table')}
                        aria-label={t('orderManagement.tableView')}
                        className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white shadow text-primary-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <IconTableView className="w-5 h-5"/>
                    </button>
                     <button
                        onClick={() => setViewMode('board')}
                        aria-label={t('orderManagement.boardView')}
                        className={`p-1.5 rounded-md transition-colors ${viewMode === 'board' ? 'bg-white shadow text-primary-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <IconCardView className="w-5 h-5"/>
                    </button>
                </div>
            </div>

            {viewMode === 'table' ? (
                <div className="bg-white rounded-2xl shadow-lg">
                    <div className="p-4 border-b border-slate-200">
                        <div className="relative w-full max-w-sm">
                            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder={t('orderManagement.searchPlaceholder')}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">{t('orderManagement.orderId')}</th>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">{t('orderManagement.customer')}</th>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">{t('orderManagement.product')}</th>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">{t('orderManagement.date')}</th>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">{t('orderManagement.amount')}</th>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">{t('common.status')}</th>
                                    <th className="p-4 font-semibold text-slate-600 text-sm"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map(order => (
                                    <tr key={order.id} className="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <p className="font-semibold text-slate-800">{order.id}</p>
                                        </td>
                                        <td className="p-4">
                                             <p className="font-semibold text-slate-800">{order.customer}</p>
                                        </td>
                                         <td className="p-4 text-slate-700">{order.productName}</td>
                                        <td className="p-4 text-slate-700">{order.date}</td>
                                        <td className="p-4 text-slate-700 font-medium">${order.amount.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                {t(`orderManagement.statuses.${order.status}`)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="relative">
                                                <button 
                                                    onClick={() => setOpenMenuId(openMenuId === order.id ? null : order.id)}
                                                    className="text-slate-500 p-2 rounded-full hover:bg-slate-200 transition-colors"
                                                    >
                                                    <IconDotsVertical className="w-5 h-5" />
                                                </button>
                                                {openMenuId === order.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 animate-fade-in">
                                                       {getAvailableActions(order.status).map(action => (
                                                          <a key={action} onClick={() => handleStatusChange(order.id, action)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer">
                                                             {t('orderManagement.markAs', { status: t(`orderManagement.statuses.${action}`) })}
                                                          </a>
                                                       ))}
                                                       {getAvailableActions(order.status).length === 0 && (
                                                            <span className="block px-4 py-2 text-sm text-slate-400">{t('common.noAction')}</span>
                                                       )}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
                    {orderStatuses.map(status => {
                        const ordersInStatus = userOrders.filter(o => o.status === status);
                        const isDragOverTarget = dragOverStatus === status;
                        return (
                             <div 
                                key={status} 
                                className={`flex-shrink-0 w-80 bg-slate-100/70 rounded-xl transition-colors duration-300 ${isDragOverTarget ? 'bg-primary-100' : ''}`}
                                onDragOver={handleDragOver}
                                onDragEnter={() => handleDragEnter(status)}
                                onDragLeave={handleDragLeave}
                                onDrop={() => handleDrop(status)}
                            >
                                <div className="p-4 border-b border-slate-200">
                                    <h3 className="font-semibold text-slate-700">{t(`orderManagement.statuses.${status}`)} <span className="text-sm text-slate-400 font-normal">({ordersInStatus.length})</span></h3>
                                </div>
                                <div className="p-4 space-y-4 h-[calc(100vh-300px)] overflow-y-auto">
                                    {ordersInStatus.map(order => (
                                        <OrderCard 
                                            key={order.id}
                                            order={order}
                                            onStatusChange={handleStatusChange}
                                            availableActions={getAvailableActions(order.status)}
                                            onDragStart={handleDragStart}
                                            onDragEnd={handleDragEnd}
                                        />
                                    ))}
                                    {ordersInStatus.length === 0 && (
                                        <div className="text-center text-sm text-slate-400 pt-10">
                                            <p>{t('orderManagement.noOrdersInStatus')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            
            {userOrders.length === 0 && (
                <div className="text-center p-12 bg-white rounded-2xl shadow-lg mt-4">
                     <IconBox className="w-12 h-12 mx-auto text-slate-300" />
                     <h3 className="mt-4 text-xl font-semibold text-slate-800">{t('orderManagement.noOrdersTitle')}</h3>
                     <p className="mt-1 text-slate-500">{t('orderManagement.noOrdersDescription')}</p>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;