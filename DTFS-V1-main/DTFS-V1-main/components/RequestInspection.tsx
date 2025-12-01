
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconCheckCircle } from '../constants.tsx';
import { Order } from '../types.ts';

interface RequestInspectionProps {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const RequestInspection: React.FC<RequestInspectionProps> = ({ orders, setOrders }) => {
    const { t } = useTranslation();
    const [orderId, setOrderId] = useState('');
    const [notes, setNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!orderId) {
            setError(t('requestInspection.error'));
            return;
        }

        const orderToUpdate = orders.find(o => o.id === orderId && o.qualityStatus === 'Not Inspected');
        
        if (!orderToUpdate) {
            setError(t('requestInspection.error'));
            return;
        }

        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId 
                    ? { ...order, qualityStatus: 'Pending' } 
                    : order
            )
        );
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto text-center animate-fade-in">
                <IconCheckCircle className="w-24 h-24 text-green-500 mx-auto" />
                <h1 className="text-3xl font-bold text-slate-800 mt-4">{t('requestInspection.successTitle')}</h1>
                <p className="text-slate-500 mt-2">{t('requestInspection.successDescription', { orderId: orderId })}</p>
                <button 
                    onClick={() => {
                        setSubmitted(false);
                        setOrderId('');
                        setNotes('');
                        setError('');
                    }}
                    className="mt-6 bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition shadow-sm"
                >
                    {t('requestInspection.requestAnother')}
                </button>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">{t('requestInspection.title')}</h1>
                <p className="text-slate-500 mt-1">{t('requestInspection.description')}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="orderId" className="block text-sm font-medium text-slate-700 mb-1">
                            {t('requestInspection.orderId')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="orderId"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder={t('requestInspection.orderIdPlaceholder')}
                            required
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        />
                         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">
                            {t('requestInspection.additionalNotes')}
                        </label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            placeholder={t('requestInspection.notesPlaceholder')}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            disabled={!orderId}
                            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-primary-700 transition shadow-sm disabled:bg-primary-300 disabled:cursor-not-allowed"
                        >
                            {t('requestInspection.submitRequest')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestInspection;
