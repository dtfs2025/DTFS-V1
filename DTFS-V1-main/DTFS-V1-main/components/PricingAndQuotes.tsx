import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from '../types.ts';
import { IconPricingQuotes, IconX } from '../constants.tsx';

interface PricingAndQuotesProps {
    quotes: Quote[];
    setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
}

const QuoteModal: React.FC<{
    onClose: () => void;
    onSave: (quote: Quote) => void;
}> = ({ onClose, onSave }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        customerName: '', origin: '', destination: '', freightCost: 0, insuranceCost: 0,
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, [name]: name.includes('Cost') ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newQuote: Quote = {
            id: `QT-${Date.now().toString().slice(-4)}`,
            ...formData,
            totalCost: formData.freightCost + formData.insuranceCost,
            status: 'Draft',
            date: new Date().toISOString().split('T')[0],
        };
        onSave(newQuote);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">{t('pricingAndQuotes.modal.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="customerName" value={formData.customerName} onChange={handleChange} placeholder={t('pricingAndQuotes.modal.customerName')} className="w-full p-2 border rounded" required />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="origin" value={formData.origin} onChange={handleChange} placeholder={t('pricingAndQuotes.modal.origin')} className="w-full p-2 border rounded" required />
                        <input name="destination" value={formData.destination} onChange={handleChange} placeholder={t('pricingAndQuotes.modal.destination')} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="freightCost" type="number" value={formData.freightCost} onChange={handleChange} placeholder={t('pricingAndQuotes.modal.freightCost')} className="w-full p-2 border rounded" required />
                        <input name="insuranceCost" type="number" value={formData.insuranceCost} onChange={handleChange} placeholder={t('pricingAndQuotes.modal.insuranceCost')} className="w-full p-2 border rounded" required />
                    </div>
                     <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">{t('common.cancel')}</button>
                        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded">{t('pricingAndQuotes.modal.saveQuote')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const PricingAndQuotes: React.FC<PricingAndQuotesProps> = ({ quotes, setQuotes }) => {
    const { t } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSaveQuote = (quote: Quote) => {
        setQuotes(prev => [...prev, quote]);
        setModalOpen(false);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
             {isModalOpen && <QuoteModal onClose={() => setModalOpen(false)} onSave={handleSaveQuote} />}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t('pricingAndQuotes.title')}</h1>
                    <p className="text-slate-500 mt-1">{t('pricingAndQuotes.description')}</p>
                </div>
                 <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm self-start sm:self-center">{t('pricingAndQuotes.createQuote')}</button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                     <table className="w-full text-left min-w-[700px]">
                        <thead className="bg-slate-50"><tr>
                            <th className="p-4 font-semibold text-slate-600">{t('pricingAndQuotes.quoteId')}</th><th className="p-4 font-semibold text-slate-600">{t('pricingAndQuotes.customer')}</th>
                            <th className="p-4 font-semibold text-slate-600">{t('pricingAndQuotes.route')}</th><th className="p-4 font-semibold text-slate-600">{t('pricingAndQuotes.totalCost')}</th>
                            <th className="p-4 font-semibold text-slate-600">{t('common.status')}</th>
                        </tr></thead>
                        <tbody>
                            {quotes.map(quote => (
                                <tr key={quote.id} className="border-b last:border-b-0">
                                    <td className="p-4 font-semibold">{quote.id}</td>
                                    <td className="p-4">{quote.customerName}</td>
                                    <td className="p-4">{quote.origin} &rarr; {quote.destination}</td>
                                    <td className="p-4 font-semibold">${quote.totalCost.toLocaleString()}</td>
                                    <td className="p-4">{quote.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PricingAndQuotes;