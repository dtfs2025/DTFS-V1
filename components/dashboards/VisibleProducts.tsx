

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product, Page } from '../../types.ts';
import { IconBox, IconChevronRight } from '../../constants.tsx';

interface VisibleProductsProps {
    products: Product[];
    setActivePage: (page: Page) => void;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    onAddNewProduct: () => void;
}

const ProductCard: React.FC<{ product: Product; onEdit: () => void; onToggleVisibility: (productId: string | number) => void; }> = ({ product, onEdit, onToggleVisibility }) => {
    const { t } = useTranslation();

    const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        onToggleVisibility(product.id);
    };

    return (
        <div onClick={onEdit} className="bg-white p-3 rounded-xl border border-gray-200 flex items-center gap-4 hover:shadow-md hover:border-primary-300 transition-all cursor-pointer group">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-grow overflow-hidden">
                <p className="font-bold text-gray-800 truncate" title={product.name}>{product.name}</p>
                <p className="text-sm text-gray-600 font-semibold">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{product.stock} {t('common.inStock')}</p>
            </div>
            <div className="flex items-center gap-2">
                 <label onClick={(e) => e.stopPropagation()} htmlFor={`visible-toggle-${product.id}`} aria-label={t('dashboard.exporter.visibleProducts.toggleAriaLabel', { name: product.name })} className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id={`visible-toggle-${product.id}`}
                            className="sr-only peer"
                            checked={product.status === 'Active'}
                            onChange={handleToggleChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary-600 transition-colors"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </div>
                </label>
                <IconChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
};

export const VisibleProducts: React.FC<VisibleProductsProps> = ({ products, setActivePage, setProducts, onAddNewProduct }) => {
    const { t } = useTranslation();

    const handleEditClick = () => {
        setActivePage('Product Management');
    };

    const handleToggleVisibility = (productId: string | number) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId ? { ...p, status: p.status === 'Active' ? 'Draft' : 'Active' } : p
            )
        );
    };

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{t('dashboard.exporter.visibleProducts.title')}</h2>
                <button
                    onClick={onAddNewProduct}
                    className="flex items-center gap-2 bg-primary-100 text-primary-700 font-semibold px-4 py-2 rounded-lg hover:bg-primary-200 transition-all shadow-sm border border-primary-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
                    {t('dashboard.exporter.visibleProducts.addNewProduct')}
                </button>
            </div>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} onEdit={handleEditClick} onToggleVisibility={handleToggleVisibility}/>
                    ))}
                </div>
            ) : (
                <div className="text-center p-10 bg-white rounded-xl border border-gray-200">
                    <IconBox className="w-12 h-12 mx-auto text-gray-300" />
                    <h3 className="mt-2 text-lg font-semibold text-gray-700">{t('dashboard.exporter.visibleProducts.noProductsTitle')}</h3>
                    <p className="text-sm text-gray-500 mt-1">{t('dashboard.exporter.visibleProducts.noProductsDescription')}</p>
                    <button onClick={onAddNewProduct} className="mt-4 bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition shadow-sm">
                        {t('dashboard.exporter.visibleProducts.addNewProduct')}
                    </button>
                </div>
            )}
        </div>
    );
};
