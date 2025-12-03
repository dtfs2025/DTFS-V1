

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    IconFactoring, IconExportFinance, IconSupplyChain, IconImportFinance, IconNonInterestFinance, IconStartupFinance,
    IconCheck, IconChevronLeft, IconTableView, IconCardView, IconUpload
} from '../constants.tsx';

type FinanceOptionType = 'Factoring' | 'Export Finance' | 'Supply Chain Finance' | 'Import Finance' | 'Non-Interest Finance' | 'Startup Trade Finance';

interface FinanceOption {
  id: string;
  type: FinanceOptionType;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const financeOptions: FinanceOption[] = [
    { id: 'factoring', type: 'Factoring', title: 'tradeFinance.options.factoring.title', description: 'tradeFinance.options.factoring.description', icon: IconFactoring },
    { id: 'export-finance', type: 'Export Finance', title: 'tradeFinance.options.exportFinance.title', description: 'tradeFinance.options.exportFinance.description', icon: IconExportFinance },
    { id: 'supply-chain-finance', type: 'Supply Chain Finance', title: 'tradeFinance.options.supplyChainFinance.title', description: 'tradeFinance.options.supplyChainFinance.description', icon: IconSupplyChain },
    { id: 'import-finance', type: 'Import Finance', title: 'tradeFinance.options.importFinance.title', description: 'tradeFinance.options.importFinance.description', icon: IconImportFinance },
    { id: 'non-interest-finance', type: 'Non-Interest Finance', title: 'tradeFinance.options.nonInterestFinance.title', description: 'tradeFinance.options.nonInterestFinance.description', icon: IconNonInterestFinance },
    { id: 'startup-trade-finance', type: 'Startup Trade Finance', title: 'tradeFinance.options.startupTradeFinance.title', description: 'tradeFinance.options.startupTradeFinance.description', icon: IconStartupFinance },
];

const comparisonData = [
    { type: 'factoring', processTimeKey: 'tradeFinance.comparison.data.factoring.processTime', maxAmount: 5000000, interestRateKey: 'tradeFinance.comparison.data.factoring.interestRate', termKey: 'tradeFinance.comparison.data.factoring.term', documentationKey: 'tradeFinance.comparison.data.documentation.low', bestForKey: 'tradeFinance.comparison.bestFor.factoring' },
    { type: 'export-finance', processTimeKey: 'tradeFinance.comparison.data.exportFinance.processTime', maxAmount: 10000000, interestRateKey: 'tradeFinance.comparison.data.exportFinance.interestRate', termKey: 'tradeFinance.comparison.data.exportFinance.term', documentationKey: 'tradeFinance.comparison.data.documentation.medium', bestForKey: 'tradeFinance.comparison.bestFor.exportFinance' },
    { type: 'supply-chain-finance', processTimeKey: 'tradeFinance.comparison.data.supplyChainFinance.processTime', maxAmount: 15000000, interestRateKey: 'tradeFinance.comparison.data.supplyChainFinance.interestRate', termKey: 'tradeFinance.comparison.data.supplyChainFinance.term', documentationKey: 'tradeFinance.comparison.data.documentation.medium', bestForKey: 'tradeFinance.comparison.bestFor.supplyChainFinance' },
    { type: 'import-finance', processTimeKey: 'tradeFinance.comparison.data.importFinance.processTime', maxAmount: 8000000, interestRateKey: 'tradeFinance.comparison.data.importFinance.interestRate', termKey: 'tradeFinance.comparison.data.importFinance.term', documentationKey: 'tradeFinance.comparison.data.documentation.high', bestForKey: 'tradeFinance.comparison.bestFor.importFinance' },
    { type: 'non-interest-finance', processTimeKey: 'tradeFinance.comparison.data.nonInterestFinance.processTime', maxAmount: 3000000, interestRateKey: 'tradeFinance.comparison.data.nonInterestFinance.interestRate', termKey: 'tradeFinance.comparison.data.nonInterestFinance.term', documentationKey: 'tradeFinance.comparison.data.documentation.low', bestForKey: 'tradeFinance.comparison.bestFor.nonInterestFinance' },
    { type: 'startup-trade-finance', processTimeKey: 'tradeFinance.comparison.data.startupTradeFinance.processTime', maxAmount: 1000000, interestRateKey: 'tradeFinance.comparison.data.startupTradeFinance.interestRate', termKey: 'tradeFinance.comparison.data.startupTradeFinance.term', documentationKey: 'tradeFinance.comparison.data.documentation.lowMedium', bestForKey: 'tradeFinance.comparison.bestFor.startupTradeFinance' },
];

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center shadow-md border border-white/20">
        <p className="text-3xl lg:text-4xl font-bold text-white">{value}</p>
        <p className="text-white/80 text-sm mt-1">{label}</p>
    </div>
);

const FinanceOptionCard: React.FC<{ option: FinanceOption; isSelected: boolean; onSelect: () => void; }> = ({ option, isSelected, onSelect }) => {
    const { t } = useTranslation();
    return (
        <div onClick={onSelect} className={`bg-white p-6 rounded-2xl shadow-sm cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-gray-200 hover:shadow-md hover:border-primary-300'}`}>
            <div className="flex items-center justify-between">
                <div className="p-3 bg-gray-100 text-gray-600 rounded-lg"><option.icon className="w-7 h-7" /></div>
                {isSelected && <div className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center"><IconCheck className="w-4 h-4"/></div>}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mt-4">{t(option.title)}</h3>
            <p className="text-gray-500 text-sm mt-1">{t(option.description)}</p>
        </div>
    );
};

type ViewType = 'landing' | 'options' | 'comparison' | 'application';

const LandingView: React.FC<{
    setView: (view: ViewType) => void;
}> = ({ setView }) => {
    const { t } = useTranslation();
    return (
        <div className="space-y-12 p-4 sm:p-6 md:p-8">
            <div className="relative bg-gradient-to-br from-primary-600 via-secondary-600 to-secondary-500 rounded-2xl p-6 md:p-12 lg:p-16 text-white overflow-hidden shadow-2xl">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full opacity-50"></div>
                <div className="absolute -bottom-24 -left-12 w-72 h-72 bg-white/10 rounded-full opacity-50"></div>
                
                <div className="relative z-10 space-y-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-md">{t('tradeFinance.pageTitle')}</h1>
                        <p className="mt-4 text-lg text-white/90">{t('tradeFinance.pageDescription')}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <StatCard value="$2.5M+" label={t('tradeFinance.totalFunded')} />
                        <StatCard value="500+" label={t('tradeFinance.activeClients')} />
                        <StatCard value="48hrs" label={t('tradeFinance.avgApproval')} />
                        <StatCard value="99.8%" label={t('tradeFinance.successRate')} />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => setView('options')} className="bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg flex items-center justify-center gap-2">
                            {t('tradeFinance.startApplication')}
                        </button>
                        <button onClick={() => setView('comparison')} className="bg-white/20 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/30 transition-colors border border-white/30 text-lg flex items-center justify-center gap-2">
                           {t('tradeFinance.compareOptions')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

const OptionsView: React.FC<{
    setView: (view: ViewType) => void;
    setSelectedOption: (option: FinanceOption) => void;
}> = ({ setView, setSelectedOption }) => {
    const { t } = useTranslation();
    const handleSelect = (option: FinanceOption) => {
        setSelectedOption(option);
        setView('application');
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <button onClick={() => setView('landing')} className="flex items-center gap-2 font-semibold text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm">
                <IconChevronLeft className="w-5 h-5" /> {t('common.back')}
            </button>
            <div className="text-center">
                <span className="text-sm font-semibold bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{t('nav.Request Finance')}</span>
                <h2 className="text-3xl font-extrabold text-gray-800 mt-4">{t('tradeFinance.chooseOptionTitle')}</h2>
                <p className="text-gray-500 mt-2 max-w-2xl mx-auto">{t('tradeFinance.chooseOptionDescription')}</p>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {financeOptions.map(option => (
                    <FinanceOptionCard 
                        key={option.id} 
                        option={option}
                        isSelected={false}
                        onSelect={() => handleSelect(option)}
                    />
                ))}
            </div>
        </div>
    );
};

const ComparisonView: React.FC<{
    setView: (view: ViewType) => void;
    setComparisonView: (view: 'table' | 'card') => void;
    comparisonView: 'table' | 'card';
}> = ({ setView, comparisonView, setComparisonView }) => {
    const { t } = useTranslation();
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <button onClick={() => setView('landing')} className="flex items-center gap-2 font-semibold text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm">
                <IconChevronLeft className="w-5 h-5" /> {t('common.back')}
            </button>
            <div className="text-left">
                <h1 className="text-3xl font-extrabold text-gray-800">{t('tradeFinance.comparisonTitle')}</h1>
                <p className="text-gray-500 mt-1">{t('tradeFinance.comparisonDescription')}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">{t('tradeFinance.chooseOptionTitle')}</h3>
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                        <button onClick={() => setComparisonView('table')} className={`p-1.5 rounded-md ${comparisonView === 'table' ? 'bg-white shadow' : ''}`}>
                            <IconTableView className="w-5 h-5" />
                        </button>
                        <button onClick={() => setComparisonView('card')} className={`p-1.5 rounded-md ${comparisonView === 'card' ? 'bg-white shadow' : ''}`}>
                            <IconCardView className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                 {comparisonView === 'table' ? (
                    <div className="overflow-x-auto mt-6">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-3 text-sm font-semibold text-gray-600">{t('tradeFinance.comparison.type')}</th>
                                    <th className="p-3 text-sm font-semibold text-gray-600">{t('tradeFinance.comparison.processTime')}</th>
                                    <th className="p-3 text-sm font-semibold text-gray-600">{t('tradeFinance.comparison.maxAmount')}</th>
                                    <th className="p-3 text-sm font-semibold text-gray-600">{t('tradeFinance.comparison.interestRate')}</th>
                                    <th className="p-3 text-sm font-semibold text-gray-600">{t('tradeFinance.comparison.term')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map(item => (
                                    <tr key={item.type} className="border-b last:border-b-0">
                                        <td className="p-3 font-semibold">{t(`tradeFinance.options.${item.type}.title` as any)}</td>
                                        <td className="p-3">{t(item.processTimeKey)}</td>
                                        <td className="p-3">${item.maxAmount.toLocaleString()}</td>
                                        <td className="p-3">{t(item.interestRateKey)}</td>
                                        <td className="p-3">{t(item.termKey)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {comparisonData.map(item => (
                            <div key={item.type} className="bg-gray-50 rounded-lg p-4 border">
                                <h4 className="font-bold text-lg">{t(`tradeFinance.options.${item.type}.title` as any)}</h4>
                                <ul className="mt-2 text-sm space-y-1 text-gray-600">
                                    <li><strong>{t('tradeFinance.comparison.processTime')}:</strong> {t(item.processTimeKey)}</li>
                                    <li><strong>{t('tradeFinance.comparison.maxAmount')}:</strong> ${item.maxAmount.toLocaleString()}</li>
                                    <li><strong>{t('tradeFinance.comparison.interestRate')}:</strong> {t(item.interestRateKey)}</li>
                                    <li><strong>{t('tradeFinance.comparison.term')}:</strong> {t(item.termKey)}</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ApplicationView: React.FC<{
    option: FinanceOption;
    setView: (view: ViewType) => void;
}> = ({ option, setView }) => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto text-center animate-fade-in">
                <IconCheck className="w-24 h-24 text-green-500 mx-auto" />
                <h1 className="text-3xl font-bold text-slate-800 mt-4">{t('tradeFinance.applicationSubmitted')}</h1>
                <p className="text-slate-500 mt-2">{t('tradeFinance.applicationSuccessMessage', { option: t(option.title) })}</p>
                <button onClick={() => setView('landing')} className="mt-6 bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition shadow-sm">
                    {t('tradeFinance.backToTradeFinance')}
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-8">
            <button onClick={() => setView('options')} className="flex items-center gap-2 font-semibold text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm">
                <IconChevronLeft className="w-5 h-5" /> {t('common.back')}
            </button>
            <div className="text-center">
                <div className="p-4 bg-gray-100 text-gray-600 rounded-lg inline-block"><option.icon className="w-10 h-10" /></div>
                <h2 className="text-3xl font-extrabold text-gray-800 mt-4">{t('tradeFinance.applyFor', { option: t(option.title) })}</h2>
                <p className="text-gray-500 mt-2 max-w-2xl mx-auto">{t(option.description)}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="font-medium text-gray-700">{t('tradeFinance.companyName')}</label>
                        <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" required />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">{t('tradeFinance.requestedAmount')}</label>
                        <input type="number" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" required />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">{t('tradeFinance.uploadDocuments')}</label>
                         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <IconUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="text-sm text-gray-600">{t('tradeFinance.uploadPrompt')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={() => setView('options')} className="px-6 py-2 rounded-lg border hover:bg-gray-50">{t('common.cancel')}</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">{t('tradeFinance.submitApplication')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const TradeFinance: React.FC = () => {
    const [view, setView] = useState<ViewType>('landing');
    const [selectedOption, setSelectedOption] = useState<FinanceOption | null>(null);
    const [comparisonView, setComparisonView] = useState<'table' | 'card'>('table');

    const renderView = () => {
        switch (view) {
            case 'options':
                return <OptionsView setView={setView} setSelectedOption={setSelectedOption} />;
            case 'comparison':
                return <ComparisonView setView={setView} comparisonView={comparisonView} setComparisonView={setComparisonView} />;
            case 'application':
                if (selectedOption) {
                    return <ApplicationView option={selectedOption} setView={setView} />;
                }
                setView('options');
                return null;
            case 'landing':
            default:
                return <LandingView setView={setView} />;
        }
    };
    
    return <div className="animate-fade-in">{renderView()}</div>;
};

export default TradeFinance;
