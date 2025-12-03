import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Commission } from '../types.ts';
import { IconCommissionTracking, IconTrendingUp } from '../constants.tsx';

interface CommissionTrackingProps {
    commissions: Commission[];
}

const StatCard: React.FC<{ title: string; value: string; color: string; }> = ({ title, value, color }) => (
    <div className={`p-6 rounded-2xl shadow-sm ${color}`}>
        <h3 className="text-slate-700 font-medium">{title}</h3>
        <p className="text-4xl font-bold text-slate-800 mt-2">{value}</p>
    </div>
);

const CommissionTracking: React.FC<CommissionTrackingProps> = ({ commissions }) => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<'all' | 'Paid' | 'Unpaid'>('all');
    
    const filteredCommissions = useMemo(() => {
        if (filter === 'all') return commissions;
        return commissions.filter(c => c.status === filter);
    }, [commissions, filter]);

    const totalEarned = useMemo(() => commissions.reduce((sum, c) => sum + c.amount, 0), [commissions]);
    const totalPaid = useMemo(() => commissions.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.amount, 0), [commissions]);
    const totalUnpaid = useMemo(() => commissions.filter(c => c.status === 'Unpaid').reduce((sum, c) => sum + c.amount, 0), [commissions]);
    
    const getStatusColor = (status: Commission['status']) => {
        return status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">{t('commissionTracking.title')}</h1>
                <p className="text-slate-500 mt-1">{t('commissionTracking.description')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title={t('commissionTracking.totalEarned')} value={`$${totalEarned.toLocaleString()}`} color="bg-gradient-to-br from-primary-100 to-primary-200" />
                <StatCard title={t('commissionTracking.totalPaid')} value={`$${totalPaid.toLocaleString()}`} color="bg-gradient-to-br from-green-100 to-green-200" />
                <StatCard title={t('commissionTracking.pendingPayout')} value={`$${totalUnpaid.toLocaleString()}`} color="bg-gradient-to-br from-yellow-100 to-yellow-200" />
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
                <div className="p-4 border-b border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{t('common.all')}</button>
                        <button onClick={() => setFilter('Paid')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${filter === 'Paid' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{t('commissionTracking.paid')}</button>
                        <button onClick={() => setFilter('Unpaid')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${filter === 'Unpaid' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{t('commissionTracking.unpaid')}</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[640px]">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('commissionTracking.orderId')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('commissionTracking.clientName')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('commissionTracking.amount')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('commissionTracking.date')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('common.status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCommissions.map(commission => (
                                <tr key={commission.id} className="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-semibold text-slate-800">{commission.orderId}</td>
                                    <td className="p-4 text-slate-700">{commission.clientName}</td>
                                    <td className="p-4 font-semibold text-slate-800">${commission.amount.toLocaleString()}</td>
                                    <td className="p-4 text-slate-700">{commission.date}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(commission.status)}`}>
                                            {t(`commissionTracking.${commission.status.toLowerCase()}` as any)}
                                        </span>
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

export default CommissionTracking;