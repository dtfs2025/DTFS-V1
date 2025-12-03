import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconAnalyticsAccess } from '../constants.tsx';

const AnalyticsAccess: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <IconAnalyticsAccess className="w-16 h-16 mx-auto text-primary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4">{t('analyticsAccess.title')}</h1>
                <p className="text-slate-500 mt-2">{t('analyticsAccess.description')}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                     <h2 className="text-xl font-bold text-slate-800 mb-4">{t('analyticsAccess.userGrowth')}</h2>
                     <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">{t('analyticsAccess.placeholder')}</div>
                </div>
                 <div className="bg-white p-6 rounded-2xl shadow-lg">
                     <h2 className="text-xl font-bold text-slate-800 mb-4">{t('analyticsAccess.tradeVolume')}</h2>
                     <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">{t('analyticsAccess.placeholder')}</div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsAccess;