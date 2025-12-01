import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconUserHeadset, IconX } from '../constants.tsx';
import { SupportTicket, Client } from '../types.ts';

interface LocalSupportProps {
    agentId: string;
    tickets: SupportTicket[];
    clients: Client[];
    onCreateTicket: (ticketData: Omit<SupportTicket, 'id'|'dateCreated'|'conversation'>) => void;
}

const CreateTicketModal: React.FC<{
    clients: Client[];
    onClose: () => void;
    onSubmit: (data: { clientId: string, issue: string }) => void;
}> = ({ clients, onClose, onSubmit }) => {
    const { t } = useTranslation();
    const [clientId, setClientId] = useState('');
    const [issue, setIssue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientId || !issue) return;
        onSubmit({ clientId, issue });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{t('localSupport.modal.title')}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IconX className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="font-medium text-gray-700">{t('localSupport.modal.selectClient')}</label>
                        <select value={clientId} onChange={e => setClientId(e.target.value)} className="w-full mt-1 p-2 border rounded bg-white" required>
                            <option value="" disabled>{t('localSupport.modal.chooseClient')}</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">{t('localSupport.modal.describeIssue')}</label>
                        <textarea value={issue} onChange={e => setIssue(e.target.value)} rows={5} className="w-full mt-1 p-2 border rounded" required placeholder={t('localSupport.modal.issuePlaceholder')}></textarea>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border hover:bg-gray-50">{t('common.cancel')}</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">{t('localSupport.createTicket')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const LocalSupport: React.FC<LocalSupportProps> = ({ agentId, tickets, clients, onCreateTicket }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateTicket = (data: { clientId: string, issue: string }) => {
        const client = clients.find(c => c.id === data.clientId);
        if (!client) return;
        onCreateTicket({
            clientId: data.clientId,
            clientName: client.name,
            issue: data.issue,
            agentId: agentId,
            status: 'Open',
        });
        setIsModalOpen(false);
    };
    
    const getStatusColor = (status: SupportTicket['status']) => {
        switch (status) {
            case 'Open': return 'bg-red-100 text-red-700';
            case 'In Progress': return 'bg-yellow-100 text-yellow-700';
            case 'Resolved': return 'bg-green-100 text-green-700';
        }
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && <CreateTicketModal clients={clients} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateTicket} />}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('localSupport.title')}</h1>
                    <p className="text-gray-500 mt-1">{t('localSupport.description')}</p>
                </div>
                 <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm self-start sm:self-center">
                    {t('localSupport.createTicket')}
                </button>
            </div>
             <div className="bg-white rounded-2xl shadow-lg">
                <div className="p-4 border-b border-gray-200">
                     <h2 className="text-xl font-bold text-gray-800">{t('localSupport.myTickets', { count: tickets.length })}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[768px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('localSupport.ticketId')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('localSupport.client')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('localSupport.issue')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('common.date')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('common.status')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <tr key={ticket.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                    <td className="p-4 font-semibold text-gray-800">{ticket.id}</td>
                                    <td className="p-4 text-gray-700">{ticket.clientName}</td>
                                    <td className="p-4 text-gray-700 truncate max-w-sm">{ticket.issue}</td>
                                    <td className="p-4 text-gray-700">{ticket.dateCreated}</td>
                                    <td className="p-4"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>{ticket.status}</span></td>
                                    <td className="p-4"><button className="text-sm font-semibold text-primary-600">{t('common.viewDetails')}</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {tickets.length === 0 && (
                        <div className="text-center p-12">
                             <IconUserHeadset className="w-12 h-12 mx-auto text-gray-300" />
                             <h3 className="mt-4 text-xl font-semibold text-gray-800">{t('localSupport.noTicketsTitle')}</h3>
                             <p className="mt-1 text-gray-500">{t('localSupport.noTicketsDescription')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocalSupport;