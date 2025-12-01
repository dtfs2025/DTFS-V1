
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product, Order } from '../types.ts';
import { IconCheckCircle } from '../constants.tsx';
import { useAuth } from '../hooks/useAuth.ts';

interface OrderPlacementProps {
    products: Product[];
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrderPlacement: React.FC<OrderPlacementProps> = ({ products, orders, setOrders }) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [selectedProductId, setSelectedProductId] = useState<string | number>('');
    const [quantity, setQuantity] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const product = products.find(p => p.id.toString() === selectedProductId.toString());

        if (!user || !product || quantity <= 0) {
            alert('Please select a product and enter a valid quantity.');
            return;
        }
        
        const newOrder: Order = {
            id: `TRD-${new Date().getFullYear()}-${(orders.length + 1).toString().padStart(3, '0')}`,
            productName: product.name,
            customer: user.name,
            buyerId: user.id,
            exporterId: product.exporterId,
            status: 'Pending',
            amount: product.price * quantity,
            date: new Date().toISOString().split('T')[0],
            qualityStatus: 'Not Inspected',
        };

        setOrders(prevOrders => [...prevOrders, newOrder]);
        setSubmitted(true);
    };
    
    if (submitted) {
        return (
            <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto text-center animate-fade-in">
                <IconCheckCircle className="w-24 h-24 text-green-500 mx-auto" />
                <h1 className="text-3xl font-bold text-slate-800 mt-4">{t('orderPlacement.successTitle')}</h1>
                <p className="text-slate-500 mt-2">{t('orderPlacement.successDescription')}</p>
                <button 
                    onClick={() => {
                        setSubmitted(false);
                        setSelectedProductId('');
                        setQuantity(1);
                    }}
                    className="mt-6 bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition shadow-sm"
                >
                    {t('orderPlacement.placeAnother')}
                </button>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">{t('orderPlacement.title')}</h1>
                <p className="text-slate-500 mt-1">{t('orderPlacement.description')}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="product" className="block text-sm font-medium text-slate-700 mb-1">
                            {t('orderPlacement.selectProduct')}
                        </label>
                        <select
                            id="product"
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
                            required
                        >
                            <option value="" disabled>{t('orderPlacement.chooseProduct')}</option>
                            {products.filter(p => p.status === 'Active').map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name} (${product.price}/unit)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-1">
                            {t('orderPlacement.quantity')}
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            min="1"
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            required
                        />
                    </div>
                    
                    {selectedProductId && (
                        <div className="p-4 bg-slate-50 rounded-lg text-center">
                            <p className="text-slate-500">{t('orderPlacement.estimatedTotal')}</p>
                            <p className="text-3xl font-bold text-slate-800">
                                ${((products.find(p => p.id.toString() === selectedProductId.toString())?.price || 0) * quantity).toLocaleString()}
                            </p>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={!selectedProductId || quantity <= 0}
                            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-primary-700 transition shadow-sm disabled:bg-primary-300 disabled:cursor-not-allowed"
                        >
                            {t('orderPlacement.placeOrder')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderPlacement;
