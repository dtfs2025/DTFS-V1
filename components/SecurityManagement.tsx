import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconSecurityManagement } from '../constants.tsx';

const logs = [
    { event: 'Admin Login', user: 'Jane Doe', ip: '192.168.1.1', time: '2 mins ago', status: 'Success' },
    { event: 'Failed Login', user: 'Unknown', ip: '10.0.0.5', time: '15 mins ago', status: 'Failed' },
    { event: 'Password Change', user: 'Kwame Exports', ip: '24.10.5.1', time: '1 hour ago', status: 'Success' },
    { event: 'API Key Generated', user: 'Amina Imports', ip: '88.12.55.3', time: '3 hours ago', status: 'Success' },
    { event: 'Permission Change', user: 'Jane Doe', ip: '192.168.1.1', time: '1 day ago', status: 'Success' },
    { event: 'Failed API Access', user: 'External App', ip: '201.5.33.1', time: '2 days ago', status: 'Failed' },
];

const SecurityManagement: React.FC = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<'all' | 'Success' | 'Failed'>('all');

    const filteredLogs = useMemo(() => {
        if (filter === 'all') return logs;
        return logs.filter(log => log.status === filter);
    }, [filter]);

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <IconSecurityManagement className="w-16 h-16 mx-auto text-primary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">{t('securityManagement.title')}</h1>
                <p className="text-gray-500 mt-2">{t('securityManagement.description')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">{t('securityManagement.auditLog')}</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{t('common.all')}</button>
                        <button onClick={() => setFilter('Success')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${filter === 'Success' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{t('securityManagement.statuses.success')}</button>
                        <button onClick={() => setFilter('Failed')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${filter === 'Failed' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{t('securityManagement.statuses.failed')}</button>
                    </div>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[768px]">
                        <thead className="bg-gray-50"><tr>
                            <th className="p-4 font-semibold text-gray-600">{t('securityManagement.event')}</th>
                            <th className="p-4 font-semibold text-gray-600">{t('securityManagement.user')}</th>
                            <th className="p-4 font-semibold text-gray-600">{t('securityManagement.ipAddress')}</th>
                            <th className="p-4 font-semibold text-gray-600">{t('securityManagement.time')}</th>
                             <th className="p-4 font-semibold text-gray-600">{t('common.status')}</th>
                        </tr></thead>
                        <tbody>
                            {filteredLogs.map((log, i) => (
                                <tr key={i} className="border-b last:border-b-0">
                                    <td className="p-4 font-semibold">{log.event}</td>
                                    <td className="p-4">{log.user}</td>
                                    <td className="p-4 font-mono text-sm">{log.ip}</td>
                                    <td className="p-4">{log.time}</td>
                                    <td className="p-4">
                                        <span className={`font-semibold ${log.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>
                                            {t(`securityManagement.statuses.${log.status.toLowerCase()}` as any)}
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

export default SecurityManagement;