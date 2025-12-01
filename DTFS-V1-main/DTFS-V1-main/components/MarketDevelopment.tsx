import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconMarketDevelopment, IconTrendingUp } from '../constants.tsx';
import { getMarketOpportunities } from '../services/geminiService.ts';
import { MarketOpportunity } from '../types.ts';

const MarketDevelopment: React.FC = () => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [opportunities, setOpportunities] = useState<MarketOpportunity[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setOpportunities([]);
        try {
            const results = await getMarketOpportunities(query);
            setOpportunities(results);
        } catch (error) {
            console.error("Failed to get market opportunities:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                 <IconMarketDevelopment className="w-16 h-16 mx-auto text-secondary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">{t('marketDevelopment.title')}</h1>
                <p className="text-gray-500 mt-2">{t('marketDevelopment.description')}</p>
            </div>

             <div className="bg-white p-6 rounded-xl shadow-sm mt-10 border border-gray-200">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-grow relative">
                        <input 
                            type="text" 
                            placeholder={t('marketDevelopment.searchPlaceholder')}
                            className="w-full h-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={isLoading || !query.trim()} className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition shadow-sm disabled:bg-primary-300">
                        {isLoading ? t('marketDevelopment.generating') : t('marketDevelopment.getOpportunities')}
                    </button>
                </form>
            </div>


            <div className="bg-white p-6 rounded-2xl shadow-lg mt-8 min-h-[300px]">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('marketDevelopment.opportunitiesTitle')}</h2>
                {isLoading ? (
                     <div className="text-center py-16">
                        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-gray-500 font-semibold">{t('marketDevelopment.loading')}</p>
                    </div>
                ) : opportunities.length > 0 ? (
                     <div className="space-y-4">
                        {opportunities.map((opp) => (
                            <div key={opp.id} className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition">
                                <div>
                                    <h3 className="font-bold text-gray-800">{opp.title}</h3>
                                    <p className="text-sm text-gray-500">{opp.description}</p>
                                </div>
                                <div className="flex items-center gap-4 flex-shrink-0 mt-4 md:mt-0 self-start md:self-center">
                                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"><IconTrendingUp className="w-4 h-4" /> {t('marketDevelopment.highPotential')}</span>
                                    <button className="text-sm font-semibold text-primary-600">{t('common.viewDetails')}</button>
                                </div>
                            </div>
                        ))}
                     </div>
                ) : (
                    <div className="text-center py-16 text-gray-500">
                        <p>{t('marketDevelopment.noOpportunities')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketDevelopment;