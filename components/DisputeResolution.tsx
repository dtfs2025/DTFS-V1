import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dispute, Order, ChatMessage } from '../types.ts';
import { IconDisputeResolution, IconX, IconAIAssistant } from '../constants.tsx';
import { analyzeDispute } from '../services/geminiService.ts';
import { CONVERSATIONS, CHAT_MESSAGES } from '../constants.tsx';


interface DisputeResolutionProps {
    disputes: Dispute[];
    onUpdateStatus: (disputeId: string, status: Dispute['status']) => void;
    orders: Order[];
}

const DisputeModal: React.FC<{
    dispute: Dispute;
    order: Order;
    messages: ChatMessage[];
    onClose: () => void;
    onUpdateStatus: (disputeId: string, status: Dispute['status']) => void;
}> = ({ dispute, order, messages, onClose, onUpdateStatus }) => {
    const { t } = useTranslation();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<{ summary: string; suggested_resolution: string; key_points: string[] } | null>(null);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setAnalysis(null);
        try {
            const result = await analyzeDispute(dispute, order, messages);
            setAnalysis(result);
        } catch (error) {
            console.error("Failed to analyze dispute", error);
            setAnalysis({ 
                summary: t('disputeResolution.modal.aiError'), 
                suggested_resolution: t('disputeResolution.modal.aiErrorSuggestion'), 
                key_points: [] 
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{t('disputeResolution.modal.title', { disputeId: dispute.id })}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IconX className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4">
                    <div><p className="font-semibold">{t('orderManagement.orderId')}:</p><p>{dispute.orderId}</p></div>
                    <div><p className="font-semibold">{t('disputeResolution.modal.partiesLabel')}</p><p>{dispute.parties.join(' vs ')}</p></div>
                    <div><p className="font-semibold">{t('disputeResolution.modal.reasonLabel')}</p><p>{dispute.reason}</p></div>
                    <div><p className="font-semibold">{t('disputeResolution.modal.dateFiledLabel')}</p><p>{dispute.dateFiled}</p></div>
                     <div><p className="font-semibold">{t('disputeResolution.modal.currentStatusLabel')}</p><p>{dispute.status}</p></div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <IconAIAssistant className="w-6 h-6 text-primary-600" />
                        {t('disputeResolution.modal.aiAnalysis')}
                    </h3>
                    {!analysis && !isAnalyzing && (
                        <div className="text-center p-4 bg-gray-50 rounded-lg mt-2">
                            <p className="text-sm text-gray-600">{t('disputeResolution.modal.aiDescription')}</p>
                            <button onClick={handleAnalyze} className="mt-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-700">{t('disputeResolution.modal.analyzeButton')}</button>
                        </div>
                    )}
                    {isAnalyzing && (
                        <div className="text-center p-8">
                            <div className="w-6 h-6 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                            <p className="mt-3 text-sm font-semibold text-gray-500">{t('common.thinking')}</p>
                        </div>
                    )}
                    {analysis && (
                         <div className="space-y-4 mt-4 animate-fade-in">
                             <div>
                                <h4 className="font-semibold text-gray-700">{t('disputeResolution.modal.summary')}</h4>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{analysis.summary}</p>
                             </div>
                             {analysis.key_points.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-700">{t('disputeResolution.modal.keyPoints')}</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
                                        {analysis.key_points.map((point, i) => <li key={i}>{point}</li>)}
                                    </ul>
                                </div>
                             )}
                             <div>
                                <h4 className="font-semibold text-gray-700">{t('disputeResolution.modal.suggestedResolution')}</h4>
                                <p className="text-sm font-bold text-primary-700 bg-primary-50 p-3 rounded-md border border-primary-200">{analysis.suggested_resolution}</p>
                             </div>
                         </div>
                    )}
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t mt-6">
                    <button onClick={() => onUpdateStatus(dispute.id, 'In Review')} className="px-4 py-2 rounded-lg bg-yellow-500 text-white">{t('disputeResolution.modal.markInReview')}</button>
                    <button onClick={() => onUpdateStatus(dispute.id, 'Resolved')} className="px-4 py-2 rounded-lg bg-green-600 text-white">{t('disputeResolution.modal.markResolved')}</button>
                </div>
            </div>
        </div>
    );
};


const DisputeResolution: React.FC<DisputeResolutionProps> = ({ disputes, onUpdateStatus, orders }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDispute, setSelectedDispute] = useState<{ dispute: Dispute, order: Order, messages: ChatMessage[] } | null>(null);

    const handleReview = (dispute: Dispute) => {
        const order = orders.find(o => o.id === dispute.orderId);
        if (!order) {
            console.error("Order not found for dispute");
            return;
        }

        // Find conversation by matching party names (a bit simplified for mock data)
        const partyNames = dispute.parties;
        const conversation = CONVERSATIONS.find(c => partyNames.includes(c.name));
        const messages = conversation ? CHAT_MESSAGES[conversation.id] || [] : [];
        
        setSelectedDispute({ dispute, order, messages });
        setIsModalOpen(true);
    };

    const handleUpdate = (disputeId: string, status: Dispute['status']) => {
        onUpdateStatus(disputeId, status);
        setIsModalOpen(false);
    }
    
    const getStatusColor = (status: Dispute['status']) => {
        switch (status) {
            case 'Open': return 'bg-red-100 text-red-700';
            case 'In Review': return 'bg-yellow-100 text-yellow-700';
            case 'Resolved': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
    
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && selectedDispute && (
                <DisputeModal 
                    dispute={selectedDispute.dispute} 
                    order={selectedDispute.order}
                    messages={selectedDispute.messages}
                    onClose={() => setIsModalOpen(false)} 
                    onUpdateStatus={handleUpdate} 
                />
            )}
            <div className="text-center mb-8">
                <IconDisputeResolution className="w-16 h-16 mx-auto text-primary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">{t('disputeResolution.title')}</h1>
                <p className="text-gray-500 mt-2">{t('disputeResolution.description')}</p>
            </div>
            
             <div className="bg-white rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">{t('disputeResolution.disputeId')}</th>
                                <th className="p-4 font-semibold text-gray-600">{t('disputeResolution.orderId')}</th>
                                <th className="p-4 font-semibold text-gray-600">{t('disputeResolution.parties')}</th>
                                <th className="p-4 font-semibold text-gray-600">{t('disputeResolution.reason')}</th>
                                <th className="p-4 font-semibold text-gray-600">{t('common.status')}</th>
                                <th className="p-4 font-semibold text-gray-600">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disputes.map(dispute => (
                                <tr key={dispute.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                    <td className="p-4 font-semibold text-gray-800">{dispute.id}</td>
                                    <td className="p-4 text-gray-700">{dispute.orderId}</td>
                                    <td className="p-4 text-gray-700">{dispute.parties.join(' vs ')}</td>
                                    <td className="p-4 text-gray-700">{dispute.reason}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(dispute.status)}`}>
                                            {dispute.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => handleReview(dispute)} className="text-sm font-semibold bg-white border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100">{t('disputeResolution.reviewCase')}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DisputeResolution;