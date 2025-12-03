import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomsFiling, Shipment } from '../types.ts';
import { IconCustomsClearance, IconX } from '../constants.tsx';

interface CustomsClearanceProps {
    filings: CustomsFiling[];
    setCustomsFilings: React.Dispatch<React.SetStateAction<CustomsFiling[]>>;
    shipments: Shipment[];
}

const FilingModal: React.FC<{
    onClose: () => void;
    onSave: (filing: CustomsFiling) => void;
    shipments: Shipment[];
}> = ({ onClose, onSave, shipments }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ shipmentId: '', declarationNumber: '', dutyAmount: 0 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newFiling: CustomsFiling = {
            id: `CUS-${Date.now().toString().slice(-4)}`,
            ...formData,
            dutyAmount: Number(formData.dutyAmount),
            status: 'Filed',
            dateFiled: new Date().toISOString().split('T')[0],
        };
        onSave(newFiling);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">{t('customsClearance.modal.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select name="shipmentId" value={formData.shipmentId} onChange={e => setFormData(p=>({...p, shipmentId: e.target.value}))} className="w-full p-2 border rounded bg-white" required>
                        <option value="" disabled>{t('customsClearance.modal.selectShipment')}</option>
                        {shipments.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
                    </select>
                    <input name="declarationNumber" value={formData.declarationNumber} onChange={e => setFormData(p=>({...p, declarationNumber: e.target.value}))} placeholder={t('customsClearance.modal.declarationNumber')} className="w-full p-2 border rounded" required />
                    <input name="dutyAmount" type="number" value={formData.dutyAmount} onChange={e => setFormData(p=>({...p, dutyAmount: Number(e.target.value)}))} placeholder={t('customsClearance.modal.dutyAmount')} className="w-full p-2 border rounded" required />
                     <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">{t('common.cancel')}</button>
                        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded">{t('customsClearance.modal.submitFiling')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CustomsClearance: React.FC<CustomsClearanceProps> = ({ filings, setCustomsFilings, shipments }) => {
    const { t } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    
    const handleSaveFiling = (filing: CustomsFiling) => {
        setCustomsFilings(prev => [...prev, filing]);
        setModalOpen(false);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && <FilingModal onClose={() => setModalOpen(false)} onSave={handleSaveFiling} shipments={shipments}/>}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t('customsClearance.title')}</h1>
                    <p className="text-slate-500 mt-1">{t('customsClearance.description')}</p>
                </div>
                <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm self-start sm:self-center">{t('customsClearance.newFiling')}</button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-slate-50"><tr>
                            <th className="p-4 font-semibold text-slate-600">{t('customsClearance.filingId')}</th><th className="p-4 font-semibold text-slate-600">{t('customsClearance.shipmentId')}</th>
                            <th className="p-4 font-semibold text-slate-600">{t('customsClearance.dutyAmount')}</th><th className="p-4 font-semibold text-slate-600">{t('common.status')}</th>
                        </tr></thead>
                        <tbody>
                            {filings.map(filing => (
                                <tr key={filing.id} className="border-b last:border-b-0">
                                    <td className="p-4 font-semibold">{filing.id}</td>
                                    <td className="p-4">{filing.shipmentId}</td>
                                    <td className="p-4">${filing.dutyAmount.toLocaleString()}</td>
                                    <td className="p-4">{filing.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomsClearance;