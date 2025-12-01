import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product, Order, Shipment, User, Page } from '../types.ts';
import { IconBox, IconDocument, IconShipmentManagement, IconUsers } from '../constants.tsx';

interface GlobalSearchProps {
    query: string;
    results: {
        products: Product[];
        orders: Order[];
        shipments: Shipment[];
        users: Omit<User, 'permissions'>[];
    };
    isLoading: boolean;
    onClose: () => void;
    setActivePage: (page: Page) => void;
}

const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim() || !text) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? <strong key={i} className="font-bold text-primary-600 bg-primary-100 rounded-sm">{part}</strong> : <span key={i}>{part}</span>
            )}
        </span>
    );
};


const GlobalSearch: React.FC<GlobalSearchProps> = ({ query, results, isLoading, onClose, setActivePage }) => {
    const { t } = useTranslation();

    const resultCategories = [
        { key: 'products', title: t('search.categories.products'), data: results.products, icon: IconBox, page: 'Marketplace' as Page, field: 'name', subField: 'id' },
        { key: 'orders', title: t('search.categories.orders'), data: results.orders, icon: IconDocument, page: 'Order Management' as Page, field: 'id', subField: 'customer' },
        { key: 'shipments', title: t('search.categories.shipments'), data: results.shipments, icon: IconShipmentManagement, page: 'Shipment Management' as Page, field: 'id', subField: 'trackingNumber' },
        { key: 'users', title: t('search.categories.users'), data: results.users, icon: IconUsers, page: 'User Management' as Page, field: 'name', subField: 'email' },
    ];
    
    const hasResults = !isLoading && resultCategories.some(cat => cat.data.length > 0);

    const handleNavigate = (page: Page) => {
        setActivePage(page);
        onClose();
    };
    
    return (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl z-30 animate-fade-in border border-gray-100 overflow-hidden">
             <div className="p-4 border-b">
                <p className="text-sm text-gray-500">{isLoading ? t('common.loading') : t('search.resultsFor', {query})}</p>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
                 {isLoading ? (
                    <div className="p-10 text-center text-gray-500 flex flex-col items-center justify-center">
                        <div className="w-6 h-6 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
                        <p className="mt-3 text-sm font-semibold">{t('common.thinking')}</p>
                    </div>
                 ) : hasResults ? (
                    resultCategories.map(category => category.data.length > 0 && (
                        <div key={category.key} className="mb-2">
                            <h4 className="text-xs font-semibold uppercase text-gray-400 px-3 py-1.5">{category.title}</h4>
                            <ul>
                                {category.data.slice(0, 5).map((item: any) => (
                                    <li key={item.id} onClick={() => handleNavigate(category.page)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                        <div className="p-2 bg-gray-100 rounded-md">
                                            <category.icon className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <div className="text-sm text-gray-700 overflow-hidden">
                                           <p className="font-semibold truncate"><Highlight text={item[category.field]} highlight={query} /></p>
                                           <p className="text-xs text-gray-500 truncate"><Highlight text={String(item[category.subField])} highlight={query} /></p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="p-10 text-center text-gray-500">
                        {t('search.noResults')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlobalSearch;