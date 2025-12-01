import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogisticsDocument, Shipment } from '../types.ts';
import { IconSearch, IconDotsVertical, IconX, IconLogisticsDocumentation } from '../constants.tsx';

interface LogisticsDocumentationProps {
    documents: LogisticsDocument[];
    setDocuments: React.Dispatch<React.SetStateAction<LogisticsDocument[]>>;
    shipments: Shipment[];
}

const DocumentModal: React.FC<{
    onClose: () => void;
    onSave: (doc: LogisticsDocument) => void;
    shipments: Shipment[];
}> = ({ onClose, onSave, shipments }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ type: 'Bill of Lading', shipmentId: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newDoc: LogisticsDocument = {
            id: `DOC-${Date.now().toString().slice(-4)}`,
            type: formData.type as any,
            shipmentId: formData.shipmentId,
            status: 'Pending',
            url: '#',
        };
        onSave(newDoc);
    };

    return (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">{t('logisticsDocumentation.modal.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <select name="type" value={formData.type} onChange={e => setFormData(p => ({...p, type: e.target.value}))} className="w-full p-2 border rounded bg-white">
                        <option value="Bill of Lading">{t('logisticsDocumentation.modal.docTypes.bol')}</option>
                        <option value="Commercial Invoice">{t('logisticsDocumentation.modal.docTypes.ci')}</option>
                        <option value="Packing List">{t('logisticsDocumentation.modal.docTypes.pl')}</option>
                        <option value="Certificate of Origin">{t('logisticsDocumentation.modal.docTypes.coo')}</option>
                    </select>
                    <select name="shipmentId" value={formData.shipmentId} onChange={e => setFormData(p => ({...p, shipmentId: e.target.value}))} className="w-full p-2 border rounded bg-white" required>
                        <option value="" disabled>{t('logisticsDocumentation.modal.selectShipment')}</option>
                        {shipments.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
                    </select>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('logisticsDocumentation.modal.uploadFile')}</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center"><p className="text-sm text-gray-600">{t('logisticsDocumentation.modal.uploadPrompt')}</p></div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">{t('common.cancel')}</button>
                        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded">{t('common.save')}</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

const LogisticsDocumentation: React.FC<LogisticsDocumentationProps> = ({ documents, setDocuments, shipments }) => {
    const { t } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    
    const handleSaveDocument = (doc: LogisticsDocument) => {
        setDocuments(prev => [...prev, doc]);
        setModalOpen(false);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && <DocumentModal onClose={() => setModalOpen(false)} onSave={handleSaveDocument} shipments={shipments} />}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                 <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t('logisticsDocumentation.title')}</h1>
                    <p className="text-slate-500 mt-1">{t('logisticsDocumentation.description')}</p>
                </div>
                <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm self-start sm:self-center">{t('logisticsDocumentation.addDocument')}</button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-slate-50"><tr>
                            <th className="p-4 font-semibold text-slate-600">{t('logisticsDocumentation.docId')}</th><th className="p-4 font-semibold text-slate-600">{t('logisticsDocumentation.type')}</th>
                            <th className="p-4 font-semibold text-slate-600">{t('logisticsDocumentation.shipmentId')}</th><th className="p-4 font-semibold text-slate-600">{t('common.status')}</th>
                        </tr></thead>
                        <tbody>
                            {documents.map(doc => (
                                <tr key={doc.id} className="border-b last:border-b-0">
                                    <td className="p-4 font-semibold">{doc.id}</td>
                                    <td className="p-4">{doc.type}</td>
                                    <td className="p-4">{doc.shipmentId}</td>
                                    <td className="p-4">{doc.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LogisticsDocumentation;