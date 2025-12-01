
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product, Notification } from '../types.ts';
import { IconSearch, IconDotsVertical, IconBox } from '../constants.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import { ProductModal } from './ProductModal.tsx';

interface ProductManagementProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setToasts: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ products, setProducts, setToasts }) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);

    const userProducts = user
        ? products.filter(p =>
            p.exporterId === user.id &&
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];
        
    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
        setOpenMenuId(null);
    };

    const handleDelete = (productId: string | number) => {
        if (window.confirm(t('common.deleteConfirm'))) {
            const productToDelete = products.find(p => p.id === productId);
            setProducts(prev => prev.filter(p => p.id !== productId));
            if (productToDelete) {
                setToasts(prev => [...prev, {
                    id: `toast-${Date.now()}`,
                    type: 'system',
                    title: t('productManagement.toast.deleteSuccessTitle'),
                    description: t('productManagement.toast.deleteSuccessDescription', { name: productToDelete.name }),
                    isRead: false,
                    timestamp: t('common.justNow'),
                }]);
            }
        }
        setOpenMenuId(null);
    };
    
    const handleSave = (productToSave: Product) => {
        if (editingProduct) { // Editing existing product
            setProducts(prev => prev.map(p => p.id === productToSave.id ? productToSave : p));
        } else { // Adding new product
            setProducts(prev => [...prev, productToSave]);
        }
        setIsModalOpen(false);
        setEditingProduct(null);
        setToasts(prev => [...prev, {
            id: `toast-${Date.now()}`,
            type: 'system',
            title: t('productManagement.toast.saveSuccessTitle'),
            description: t('productManagement.toast.saveSuccessDescription', { name: productToSave.name }),
            isRead: false,
            timestamp: t('common.justNow'),
        }]);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && user && (
                <ProductModal 
                    product={editingProduct}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    exporterId={user.id}
                />
            )}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('productManagement.title')}</h1>
                    <p className="text-gray-500 mt-1">{t('productManagement.description')}</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
                    {t('productManagement.addNew')}
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative w-full max-w-sm">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('productManagement.searchPlaceholder')}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                         />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('productManagement.product')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('productManagement.price')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('productManagement.stock')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('common.status')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userProducts.map(product => (
                                <tr key={product.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={product.image} alt={product.name} className="w-16 h-12 object-cover rounded-md bg-gray-200" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{product.name}</p>
                                            <p className="text-sm text-gray-500">{t('common.idLabel')} {product.id}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-700 font-medium">${product.price.toFixed(2)}</td>
                                    <td className="p-4 text-gray-700">{product.stock} {t('common.units')}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                            product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="relative">
                                            <button 
                                                onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                                                className="text-gray-500 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                            >
                                                <IconDotsVertical className="w-5 h-5" />
                                            </button>
                                            {openMenuId === product.id && (
                                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 animate-fade-in border">
                                                    <a onClick={() => handleEdit(product)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">{t('common.edit')}</a>
                                                    <a onClick={() => handleDelete(product.id)} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">{t('common.delete')}</a>
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
            {userProducts.length === 0 && (
                <div className="text-center p-12 bg-white rounded-2xl shadow-lg mt-4">
                     <IconBox className="w-12 h-12 mx-auto text-slate-300" />
                     <h3 className="mt-4 text-xl font-semibold text-slate-800">{t('productManagement.noProductsTitle')}</h3>
                     <p className="mt-1 text-slate-500">{t('productManagement.noProductsDescription')}</p>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
