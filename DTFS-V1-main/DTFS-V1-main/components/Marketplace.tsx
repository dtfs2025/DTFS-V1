
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconSearch, IconCheckCircle } from '../constants.tsx';
import { Product } from '../types.ts';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="relative">
                <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
                <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 ring-1 ring-inset ring-primary-200">
                    <IconCheckCircle className="w-4 h-4 mr-1.5" />
                    {t('marketplace.verifiedSeller')}
                </span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-2 flex-grow">{product.description}</p>
                <p className="text-sm text-gray-500 mt-1">{t('marketplace.exporterId')} {product.exporterId}</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-3">${product.price.toLocaleString()} {t('marketplace.perUnit')}</p>
                <div className="mt-4 flex gap-3">
                    <button className="flex-1 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm">
                        {t('marketplace.contactSeller')}
                    </button>
                    <button className="bg-gray-100 text-gray-700 font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-200 transition">
                        {t('common.details')}
                    </button>
                </div>
            </div>
        </div>
    )
};

const Marketplace: React.FC<{ products: Product[] }> = ({ products }) => {
    const { t } = useTranslation();
    const activeProducts = products.filter(p => p.status === 'Active');
    
    const sortOptions = [
        { key: 'newest', label: t('marketplace.sortByOptions.newest') },
        { key: 'name_asc', label: t('marketplace.sortByOptions.nameAsc') },
        { key: 'name_desc', label: t('marketplace.sortByOptions.nameDesc') },
        { key: 'price_asc', label: t('marketplace.sortByOptions.priceAsc') },
        { key: 'price_desc', label: t('marketplace.sortByOptions.priceDesc') },
    ];
    
    const categories = [
        { key: 'all', label: t('marketplace.categories.all') },
        { key: 'agriculture', label: t('marketplace.categories.agriculture') },
        { key: 'textiles', label: t('marketplace.categories.textiles') },
        { key: 'minerals', label: t('marketplace.categories.minerals') },
        { key: 'handicrafts', label: t('marketplace.categories.handicrafts') },
        { key: 'cosmetics', label: t('marketplace.categories.cosmetics') },
    ];

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
             <div className="text-center">
                <span className="text-sm font-semibold bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                    {t('marketplace.title')}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">{t('marketplace.pageTitle')}</h1>
                <p className="text-gray-500 mt-2 max-w-3xl mx-auto">{t('marketplace.pageDescription')}</p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-10 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 relative">
                        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                        <input type="text" placeholder={t('marketplace.searchPlaceholder')} className="w-full h-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"/>
                    </div>
                    <select className="h-full border border-gray-300 rounded-lg py-3 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500">
                         <option>{t('marketplace.sortBy')}</option>
                         {sortOptions.map(opt => <option key={opt.key}>{opt.label}</option>)}
                    </select>
                </div>
                 <div className="mt-4 flex items-center gap-2 flex-wrap">
                    {categories.map((cat, index) => (
                         <button key={cat.key} className={`${index === 0 ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-lg text-sm font-medium`}>
                             {cat.label}
                         </button>
                    ))}
                </div>
            </div>
            
            <div className="mt-8">
                <p className="text-gray-600 font-medium">{t('marketplace.showingProducts', { count: activeProducts.length })}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
                    {activeProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;