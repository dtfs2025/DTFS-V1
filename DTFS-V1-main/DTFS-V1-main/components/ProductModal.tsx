
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types.ts';
import { IconX, IconAIAssistant } from '../constants.tsx';
import { generateProductDetails, generateProductImage } from '../services/geminiService.ts';

export const ProductModal: React.FC<{
    product: Product | null;
    onClose: () => void;
    onSave: (product: Product) => void;
    exporterId: string;
}> = ({ product, onClose, onSave, exporterId }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Omit<Product, 'id' | 'exporterId'>>({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        status: product?.status || 'Draft',
        image: product?.image || '',
    });

    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setFormData({
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || 0,
            stock: product?.stock || 0,
            status: product?.status || 'Draft',
            image: product?.image || '',
        });
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
    };

    const handleGenerateWithAI = async () => {
        if (!aiPrompt.trim()) return;
        setIsGenerating(true);
        try {
            const [details, imageUrl] = await Promise.all([
                generateProductDetails(aiPrompt),
                generateProductImage(aiPrompt)
            ]);

            setFormData(prev => ({
                ...prev,
                name: details.name || prev.name,
                description: details.description || prev.description,
                price: details.price || prev.price,
                image: imageUrl || prev.image,
            }));

        } catch (error) {
            console.error("Failed to generate product with AI:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: Product = {
            ...formData,
            id: product?.id || Date.now(),
            exporterId: exporterId,
        };
        onSave(newProduct);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{product ? t('productManagement.modal.editTitle') : t('productManagement.modal.addTitle')}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IconX className="w-6 h-6" /></button>
                </div>
                
                <div className="p-4 bg-primary-50 rounded-lg border border-primary-200 mb-6">
                    <label className="font-bold text-primary-800 flex items-center gap-2">
                        <IconAIAssistant className="w-5 h-5" />
                        {t('productManagement.modal.aiGeneratorTitle')}
                    </label>
                    <p className="text-sm text-primary-700 mt-1">{t('productManagement.modal.aiGeneratorDescription')}</p>
                    <div className="flex gap-2 mt-3">
                        <input 
                            type="text" 
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder={t('productManagement.modal.aiPromptPlaceholder')}
                            className="flex-grow p-2 border border-primary-300 rounded-lg"
                        />
                        <button 
                            type="button" 
                            onClick={handleGenerateWithAI}
                            disabled={isGenerating || !aiPrompt.trim()}
                            className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:bg-primary-300"
                        >
                            {isGenerating ? t('common.generating') : t('productManagement.modal.generate')}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="font-medium text-gray-700">{t('productManagement.modal.productName')}</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-lg" required />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">{t('productManagement.modal.description')}</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full mt-1 p-2 border border-gray-300 rounded-lg" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label className="font-medium text-gray-700">{t('productManagement.price')}</label>
                           <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-lg" required />
                        </div>
                        <div>
                           <label className="font-medium text-gray-700">{t('productManagement.stock')}</label>
                           <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-lg" required />
                        </div>
                    </div>
                     <div>
                        <label className="font-medium text-gray-700">{t('productManagement.modal.imageUrl')}</label>
                        <div className="flex items-center gap-3 mt-1">
                            {formData.image && <img src={formData.image} alt="Product preview" className="w-16 h-16 rounded-lg object-cover bg-gray-100" />}
                            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https:// or data:image/jpeg;base64,..." className="w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                     <div>
                        <label className="font-medium text-gray-700">{t('common.status')}</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-white">
                            <option value="Active">{t('productManagement.modal.status.active')}</option>
                            <option value="Draft">{t('productManagement.modal.status.draft')}</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border hover:bg-gray-50 transition-colors">{t('common.cancel')}</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">{t('common.save')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};