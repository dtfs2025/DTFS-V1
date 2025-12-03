import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconCompliance, IconCheckCircle } from '../constants.tsx';

const initialComplianceItems = [
    { name: 'AML (Anti-Money Laundering)', status: 'Compliant', lastCheck: '2024-06-01', key: 'aml' },
    { name: 'KYC (Know Your Customer)', status: 'Compliant', lastCheck: '2024-06-01', key: 'kyc' },
    { name: 'GDPR Data Protection', status: 'Compliant', lastCheck: '2024-05-28', key: 'gdpr' },
    { name: 'AfCFTA Trade Regulations', status: 'Compliant', lastCheck: '2024-06-10', key: 'afcfta' },
];

const ComplianceMonitoring: React.FC = () => {
    const { t } = useTranslation();
    const [complianceItems, setComplianceItems] = useState(initialComplianceItems);
    
    const handleRecheck = (itemName: string) => {
        setComplianceItems(prev => prev.map(item => 
            item.name === itemName 
            ? { ...item, lastCheck: new Date().toISOString().split('T')[0] }
            : item
        ));
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto animate-fade-in">
             <div className="text-center mb-8">
                <IconCompliance className="w-16 h-16 mx-auto text-primary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">{t('complianceMonitoring.title')}</h1>
                <p className="text-gray-500 mt-2">{t('complianceMonitoring.description')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                 <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('complianceMonitoring.complianceStatus')}</h2>
                 <div className="space-y-4">
                    {complianceItems.map(item => (
                        <div key={item.name} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-semibold text-gray-800">{t(`complianceMonitoring.items.${item.key}`)}</p>
                                <p className="text-sm text-gray-500">{t('complianceMonitoring.lastChecked', { date: item.lastCheck })}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-2 sm:mt-0 flex-shrink-0">
                                <div className="flex items-center gap-2 text-green-600 font-semibold">
                                    <IconCheckCircle className="w-5 h-5"/>
                                    <span>{item.status}</span>
                                </div>
                                <button onClick={() => handleRecheck(item.name)} className="text-sm font-semibold bg-white border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100">
                                    {t('complianceMonitoring.recheck')}
                                </button>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default ComplianceMonitoring;