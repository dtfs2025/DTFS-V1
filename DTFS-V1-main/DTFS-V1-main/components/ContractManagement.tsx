
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconLink } from '../constants.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import { Contract } from '../types.ts';

interface ContractManagementProps {
    contracts: Contract[];
}

const ContractManagement: React.FC<ContractManagementProps> = ({ contracts }) => {
    const { user } = useAuth();
    const { t } = useTranslation();
    
    const buyerContracts = user ? contracts.filter(c => c.buyerId === user.id) : [];

    const getStatusColor = (status: Contract['status']) => {
        switch (status) {
            case 'Active': return 'bg-blue-100 text-blue-700';
            case 'Completed': return 'bg-green-100 text-green-700';
            case 'Draft': return 'bg-yellow-100 text-yellow-700';
            case 'Terminated': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t('contractManagement.title')}</h1>
                    <p className="text-slate-500 mt-1">{t('contractManagement.description')}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('contractManagement.contractId')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('contractManagement.supplier')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('common.date')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('common.status')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('contractManagement.document')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyerContracts.map(contract => (
                                <tr key={contract.id} className="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-semibold text-slate-800">{contract.id}</td>
                                    <td className="p-4 text-slate-700">{contract.supplierName}</td>
                                    <td className="p-4 text-slate-700">{contract.date}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                                            {contract.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <a 
                                            href={contract.documentUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-primary-600 font-semibold hover:underline"
                                        >
                                            <IconLink className="w-4 h-4" />
                                            {t('contractManagement.viewDocument')}
                                        </a>
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

export default ContractManagement;
