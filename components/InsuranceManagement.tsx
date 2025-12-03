import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InsuranceClaim, Shipment } from '../types.ts';
import { IconInsuranceManagement, IconX } from '../constants.tsx';

interface InsuranceManagementProps {
    claims: InsuranceClaim[];
    setClaims: React.Dispatch<React.SetStateAction<InsuranceClaim[]>>;
    shipments: Shipment[];
}

const ClaimModal: React.FC<{
    onClose: () => void;
    onSave: (claim: InsuranceClaim) => void;
    shipments: Shipment[];
}> = ({ onClose, onSave, shipments }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ shipmentId: '', reason: '', claimAmount: 0 });

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newClaim: InsuranceClaim = {
            id: `CLM-${Date.now().toString().slice(-4)}`,
            ...formData,
            claimAmount: Number(formData.claimAmount),
            status: 'Filed',
            dateFiled: new Date().toISOString().split('T')[0],
        };
        onSave(newClaim);
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">{t('insuranceManagement.modal.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select name="shipmentId" value={formData.shipmentId} onChange={e => setFormData(p=>({...p, shipmentId: e.target.value}))} className="w-full p-2 border rounded bg-white" required>
                        <option value="" disabled>{t('insuranceManagement.modal.selectShipment')}</option>
                        {shipments.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
                    </select>
                    <input name="reason" value={formData.reason} onChange={e => setFormData(p=>({...p, reason: e.target.value}))} placeholder={t('insuranceManagement.modal.reason')} className="w-full p-2 border rounded" required />
                    <input name="claimAmount" type="number" value={formData.claimAmount} onChange={e => setFormData(p=>({...p, claimAmount: Number(e.target.value)}))} placeholder={t('insuranceManagement.modal.claimAmount')} className="w-full p-2 border rounded" required />
                     <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">{t('common.cancel')}</button>
                        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded">{t('insuranceManagement.modal.submitClaim')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const InsuranceManagement: React.FC<InsuranceManagementProps> = ({ claims, setClaims, shipments }) => {
    const { t } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    
    const handleSaveClaim = (claim: InsuranceClaim) => {
        setClaims(prev => [...prev, claim]);
        setModalOpen(false);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && <ClaimModal onClose={() => setModalOpen(false)} onSave={handleSaveClaim} shipments={shipments}/>}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                 <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t('insuranceManagement.title')}</h1>
                    <p className="text-slate-500 mt-1">{t('insuranceManagement.description')}</p>
                </div>
                 <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm self-start sm:self-center">{t('insuranceManagement.fileClaim')}</button>
            </div>
             <div className="bg-white rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                     <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-slate-50"><tr>
                            <th className="p-4 font-semibold text-slate-600">{t('insuranceManagement.claimId')}</th><th className="p-4 font-semibold text-slate-600">{t('insuranceManagement.shipmentId')}</th>
                            <th className="p-4 font-semibold text-slate-600">{t('common.amount')}</th><th className="p-4 font-semibold text-slate-600">{t('common.status')}</th>
                        </tr></thead>
                        <tbody>
                            {claims.map(claim => (
                                <tr key={claim.id} className="border-b last:border-b-0">
                                    <td className="p-4 font-semibold">{claim.id}</td>
                                    <td className="p-4">{claim.shipmentId}</td>
                                    <td className="p-4">${claim.claimAmount.toLocaleString()}</td>
                                    <td className="p-4">{claim.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InsuranceManagement;