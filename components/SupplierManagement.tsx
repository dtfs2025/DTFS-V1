
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconSearch, IconDotsVertical } from '../constants.tsx';
import { Supplier, Page } from '../types.ts';

interface SupplierManagementProps {
    suppliers: Supplier[];
    onUpdateStatus: (supplierId: string, status: Supplier['status']) => void;
    setActivePage: (page: Page) => void;
}

const SupplierManagement: React.FC<SupplierManagementProps> = ({ suppliers, onUpdateStatus, setActivePage }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const getStatusColor = (status: Supplier['status']) => {
        switch (status) {
            case 'Preferred': return 'bg-green-100 text-green-700';
            case 'Active': return 'bg-blue-100 text-blue-700';
            case 'Blocked': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
    
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('supplierManagement.title')}</h1>
                    <p className="text-gray-500 mt-1">{t('supplierManagement.description')}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="relative w-full max-w-sm">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder={t('supplierManagement.searchPlaceholder')}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('supplierManagement.supplier')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('supplierManagement.location')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('supplierManagement.rating')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('supplierManagement.products')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('common.status')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSuppliers.map(supplier => (
                                <tr key={supplier.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-lg`}>
                                            {supplier.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{supplier.name}</p>
                                            <p className="text-sm text-gray-500">{t('common.idLabel')} {supplier.id}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-700">{supplier.location}</td>
                                    <td className="p-4 text-gray-700 font-medium flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-400"><path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.215-.662 1.536 0l1.681 3.468 3.821.556c.734.107 1.028.997.494 1.513l-2.766 2.695.653 3.805c.124.73-.64 1.282-1.293.945L10 15.347l-3.419 1.797c-.653.337-1.417-.215-1.293-.945l.653-3.805-2.766-2.695c-.534-.516-.24-1.406.494-1.513l3.821-.556L9.132 2.884z" clipRule="evenodd" /></svg>
                                        {supplier.rating.toFixed(1)}
                                    </td>
                                    <td className="p-4 text-gray-700">{supplier.productsCount}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(supplier.status)}`}>
                                            {t(`supplierManagement.statuses.${supplier.status.replace(' ', '')}`)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="relative">
                                            <button onClick={() => setOpenMenuId(openMenuId === supplier.id ? null : supplier.id)} className="text-gray-500 p-2 rounded-full hover:bg-gray-200">
                                                <IconDotsVertical className="w-5 h-5" />
                                            </button>
                                            {openMenuId === supplier.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 animate-fade-in border">
                                                    <a onClick={() => { setActivePage('AI Product Recommendation'); setOpenMenuId(null); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">{t('supplierManagement.viewProducts')}</a>
                                                    <a onClick={() => { setActivePage('Contract Management'); setOpenMenuId(null); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">{t('supplierManagement.viewContracts')}</a>
                                                    <div className="my-1 border-t"></div>
                                                    {supplier.status !== 'Preferred' && <a onClick={() => { onUpdateStatus(supplier.id, 'Preferred'); setOpenMenuId(null); }} className="block px-4 py-2 text-sm text-green-600 hover:bg-gray-100 cursor-pointer">{t('supplierManagement.markPreferred')}</a>}
                                                    {supplier.status !== 'Active' && <a onClick={() => { onUpdateStatus(supplier.id, 'Active'); setOpenMenuId(null); }} className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 cursor-pointer">{t('supplierManagement.setActive')}</a>}
                                                    {supplier.status !== 'Blocked' && <a onClick={() => { onUpdateStatus(supplier.id, 'Blocked'); setOpenMenuId(null); }} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">{t('supplierManagement.blockSupplier')}</a>}
                                                </div>
                                            )}
                                        </div>
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

export default SupplierManagement;
