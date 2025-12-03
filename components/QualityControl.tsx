
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth.ts';
import { Order, Page } from '../types.ts';

interface QualityControlProps {
    orders: Order[];
    setActivePage: (page: Page) => void;
}

const QualityControl: React.FC<QualityControlProps> = ({ orders, setActivePage }) => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const buyerOrders = user ? orders.filter(o => o.buyerId === user.id) : [];

    const getStatusColor = (status: Order['qualityStatus']) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Passed': return 'bg-green-100 text-green-700';
            case 'Failed': return 'bg-red-100 text-red-700';
            case 'Not Inspected':
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t('qualityControl.title')}</h1>
                    <p className="text-slate-500 mt-1">{t('qualityControl.description')}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('qualityControl.orderId')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('common.product')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('qualityControl.orderDate')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('qualityControl.qualityStatus')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyerOrders.map(order => (
                                <tr key={order.id} className="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-semibold text-slate-800">{order.id}</td>
                                    <td className="p-4 text-slate-700">{order.productName}</td>
                                    <td className="p-4 text-slate-700">{order.date}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.qualityStatus)}`}>
                                            {t(`qualityControl.statuses.${(order.qualityStatus || 'notInspected').replace(' ', '').toLowerCase()}`)}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button 
                                            className="text-sm font-semibold bg-white border border-slate-300 px-3 py-1 rounded-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={order.qualityStatus !== 'Not Inspected'}
                                            onClick={() => setActivePage('Request Inspection')}
                                        >
                                            {t('qualityControl.requestInspection')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default QualityControl;
