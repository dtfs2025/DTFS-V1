import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconBasicAnalytics, IconUsers, IconTrendingUp } from '../constants.tsx';

const ChartBar: React.FC<{ label: string; value: number; maxValue: number; color: string }> = ({ label, value, maxValue, color }) => {
    const heightPercentage = (value / maxValue) * 100;
    return (
        <div className="flex flex-col items-center h-full">
            <div className="flex-grow w-8 md:w-12 bg-slate-200 rounded-t-lg overflow-hidden flex flex-col justify-end">
                <div style={{ height: `${heightPercentage}%` }} className={`w-full ${color} rounded-t-md`}></div>
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-2">{label}</p>
        </div>
    );
};


const BasicAnalytics: React.FC = () => {
    const { t } = useTranslation();
    const regionalData = [
        { region: 'Kenya', signups: 45 },
        { region: 'Nigeria', signups: 88 },
        { region: 'Ghana', signups: 62 },
        { region: 'Ethiopia', signups: 31 },
        { region: 'Rwanda', signups: 55 },
    ];
    const maxSignups = Math.max(...regionalData.map(d => d.signups));

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                 <IconBasicAnalytics className="w-16 h-16 mx-auto text-primary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4">{t('basicAnalytics.title')}</h1>
                <p className="text-slate-500 mt-2">{t('basicAnalytics.description')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">{t('basicAnalytics.regionalSignups')}</h2>
                    <div className="flex justify-around items-end h-64 border-b border-slate-200 pb-2">
                        {regionalData.map(data => (
                            <ChartBar key={data.region} label={data.region} value={data.signups} maxValue={maxSignups} color="bg-primary-500" />
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">{t('basicAnalytics.activityBreakdown')}</h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4"><IconUsers className="w-6 h-6"/></div>
                            <div>
                                <p className="font-bold text-slate-800">{t('basicAnalytics.activeClients')}</p>
                                <p className="text-slate-500">{t('basicAnalytics.activeClientsDesc', { percent: 65 })}</p>
                            </div>
                            <p className="ml-auto text-2xl font-bold text-slate-800">32</p>
                        </div>
                         <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg mr-4"><IconTrendingUp className="w-6 h-6"/></div>
                            <div>
                                <p className="font-bold text-slate-800">{t('basicAnalytics.topPerforming')}</p>
                                <p className="text-slate-500">Nairobi Fresh Exports</p>
                            </div>
                            <p className="ml-auto text-xl font-bold text-green-600">+15% MoM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicAnalytics;