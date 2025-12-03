import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconFinancialOversight } from '../constants.tsx';

const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-slate-50 p-6 rounded-lg border">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
);

const FinancialOversight: React.FC = () => {
    const { t } = useTranslation();
    const transactions = [
        { id: 'TXN001', type: 'Platform Fee', amount: 250, date: '2024-06-13', status: 'Completed' },
        { id: 'TXN002', type: 'Finance Payout', amount: 12000, date: '2024-06-12', status: 'Completed' },
        { id: 'TXN003', type: 'Commission Payout', amount: 550, date: '2024-06-11', status: 'Completed' },
    ];
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <IconFinancialOversight className="w-16 h-16 mx-auto text-primary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4">{t('financialOversight.title')}</h1>
                <p className="text-slate-500 mt-2">{t('financialOversight.description')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title={t('financialOversight.totalVolume')} value="$5.2M" />
                <StatCard title={t('financialOversight.platformRevenue')} value="$52,000" />
                <StatCard title={t('financialOversight.pendingPayouts')} value="$18,500" />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('financialOversight.recentTransactions')}</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead className="bg-slate-50"><tr>
                            <th className="p-4 font-semibold text-slate-600">{t('financialOversight.transactionId')}</th>
                            <th className="p-4 font-semibold text-slate-600">{t('financialOversight.type')}</th>
                            <th className="p-4 font-semibold text-slate-600">{t('financialOversight.amount')}</th>
                            <th className="p-4 font-semibold text-slate-600">{t('common.date')}</th>
                            <th className="p-4 font-semibold text-slate-600">{t('common.status')}</th>
                        </tr></thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id} className="border-b last:border-b-0">
                                    <td className="p-4 font-semibold">{t.id}</td>
                                    <td className="p-4">{t.type}</td>
                                    <td className="p-4">${t.amount.toLocaleString()}</td>
                                    <td className="p-4">{t.date}</td>
                                    <td className="p-4 text-green-600 font-semibold">{t.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinancialOversight;