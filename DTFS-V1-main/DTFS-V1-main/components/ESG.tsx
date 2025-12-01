import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth.ts';
import { ESG_CRITERIA, GREEN_FINANCE_OPTIONS, IconCheckCircle, IconClock, IconX } from '../constants.tsx';
import ESGScore from './shared/ESGScore.tsx';
import { Page } from '../types.ts';

interface ESGProps {
    setActivePage: (page: Page) => void;
}

const ESG: React.FC<ESGProps> = ({ setActivePage }) => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const getStatusIcon = (status: 'Certified' | 'In Progress' | 'Not Started') => {
        switch (status) {
            case 'Certified': return <IconCheckCircle className="w-5 h-5 text-green-500" />;
            case 'In Progress': return <IconClock className="w-5 h-5 text-yellow-500" />;
            case 'Not Started': return <IconX className="w-5 h-5 text-red-500" />;
        }
    };

    const categories = ['environmental', 'social', 'governance'] as const;

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{t('esg.title')}</h1>
                <p className="text-gray-500 mt-2">{t('esg.description')}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
                {user?.esgMetrics ? (
                    <>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">{t('wallet.passport.esgTitle')}</h3>
                        <ESGScore esgMetrics={user.esgMetrics} />
                    </>
                ) : (
                    <div className="p-6 text-center text-gray-500">{t('wallet.passport.noData')}</div>
                )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">{t('esg.greenFinance.title')}</h2>
                <p className="text-gray-500 mt-1 mb-6">{t('esg.greenFinance.description')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {GREEN_FINANCE_OPTIONS.map(option => (
                        <div key={option.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-start hover:bg-white hover:border-primary-300 transition-all">
                            <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                                <option.icon className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-gray-800 mt-4">{t(option.titleKey)}</h3>
                            <p className="text-sm text-gray-500 flex-grow mt-1">{t(option.descriptionKey)}</p>
                            <button onClick={() => setActivePage('Request Finance')} className="mt-4 text-sm font-semibold text-primary-600 hover:underline">
                                {t('esg.greenFinance.applyNow')} &rarr;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">{t('esg.ecoLearning.title')}</h2>
                <p className="text-gray-500 mt-1 mb-4">{t('esg.ecoLearning.description')}</p>
                <button onClick={() => setActivePage('Training')} className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition">
                    {t('esg.ecoLearning.goToTraining')}
                </button>
            </div>

            {categories.map(category => (
                <div key={category} className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">{t(`esg.${category}` as any)}</h2>
                    <div className="space-y-4">
                        {ESG_CRITERIA.filter(c => c.category === category).map(criterion => (
                            <div key={criterion.id} className="p-4 border rounded-lg flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-gray-800">{t(criterion.nameKey)}</h3>
                                    <p className="text-sm text-gray-500">{t(criterion.descriptionKey)}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                    {getStatusIcon(criterion.status)}
                                    <span className="text-sm font-semibold text-gray-600">{t(`esg.statuses.${criterion.status.replace(' ', '')}` as any)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ESG;