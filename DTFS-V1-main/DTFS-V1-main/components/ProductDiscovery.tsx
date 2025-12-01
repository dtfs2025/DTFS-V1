
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconSearch, IconCheckCircle, IconAIAssistant } from '../constants.tsx';
import { Product, Page } from '../types.ts';
import { recommendProducts } from '../services/geminiService.ts';

interface AIProductRecommendationProps {
    products: Product[];
    setActivePage: (page: Page) => void;
}

const ProductCard: React.FC<{ product: Product; onPlaceOrder: () => void; onContactSeller: () => void; }> = ({ product, onPlaceOrder, onContactSeller }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200">
            <div className="relative">
                <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
                <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-200">
                    <IconCheckCircle className="w-4 h-4 mr-1.5" />
                    {t('marketplace.verifiedSeller')}
                </span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-2 flex-grow">{product.description}</p>
                <p className="text-sm text-gray-500 mt-1">Exporter ID: {product.exporterId}</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-3">${product.price.toLocaleString()} / unit</p>
                <div className="mt-4 flex gap-3">
                    <button onClick={onPlaceOrder} className="flex-1 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm">
                        {t('orderPlacement.placeOrder')}
                    </button>
                    <button onClick={onContactSeller} className="bg-gray-100 text-gray-700 font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-200 transition">
                        {t('marketplace.contactSeller')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AIProductRecommendation: React.FC<AIProductRecommendationProps> = ({ products, setActivePage }) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recommendedProductIds, setRecommendedProductIds] = useState<Set<string|number> | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        
        setIsLoading(true);
        setRecommendedProductIds(null);
        try {
            const ids = await recommendProducts(query, products);
            setRecommendedProductIds(new Set(ids));
        } catch (error) {
            console.error("AI Recommendation failed:", error);
            // Fallback to simple text search on error
            setRecommendedProductIds(new Set(
                products
                    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
                    .map(p => p.id)
            ));
        } finally {
            setIsLoading(false);
        }
    };

    const displayedProducts = useMemo(() => {
        if (recommendedProductIds === null) {
            return products.filter(p => p.status === 'Active');
        }
        return products.filter(p => recommendedProductIds.has(p.id));
    }, [products, recommendedProductIds]);

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
             <div className="text-center">
                <span className="text-sm font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    <IconAIAssistant className="w-4 h-4 inline-block mr-1.5" />
                    {t('productDiscovery.title')}
                </span>
                <h1 className="text-5xl font-extrabold text-gray-800 mt-4 bg-gradient-to-r from-purple-600 to-primary-600 bg-clip-text text-transparent">{t('productDiscovery.pageTitle')}</h1>
                <p className="text-gray-500 mt-2 max-w-3xl mx-auto">{t('productDiscovery.pageDescription')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm mt-10 border border-gray-200">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="flex-grow relative">
                        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                        <input 
                            type="text" 
                            placeholder={t('productDiscovery.searchPlaceholder')}
                            className="w-full h-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition shadow-sm disabled:bg-primary-300">
                        {isLoading ? t('common.thinking') : t('common.search')}
                    </button>
                </form>
            </div>
            
            <div className="mt-8">
                 {isLoading ? (
                    <div className="text-center py-16">
                        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-gray-500 font-semibold">{t('productDiscovery.loading')}</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 font-medium">{t('marketplace.showingProducts', { count: displayedProducts.length })} {recommendedProductIds !== null && t('productDiscovery.showingResults', { count: displayedProducts.length })}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                            {displayedProducts.map(product => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onPlaceOrder={() => setActivePage('Order Placement')}
                                    onContactSeller={() => setActivePage('Chat')}
                                />
                            ))}
                        </div>
                         {displayedProducts.length === 0 && recommendedProductIds !== null && (
                            <div className="text-center py-16 text-gray-500">
                                <h3 className="text-xl font-semibold text-gray-700">{t('productDiscovery.noResultsTitle')}</h3>
                                <p>{t('productDiscovery.noResultsDescription')}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AIProductRecommendation;