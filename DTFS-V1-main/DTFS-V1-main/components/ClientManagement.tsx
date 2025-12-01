import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Client } from '../types.ts';
import { IconSearch, IconUsers, IconDotsVertical, IconX } from '../constants.tsx';

interface ClientManagementProps {
    clients: Client[];
    onSaveClient: (client: Client) => void;
    agentId: string;
}

const ClientModal: React.FC<{
    client: Client | null;
    onClose: () => void;
    onSave: (client: Client) => void;
    agentId: string;
}> = ({ client, onClose, onSave, agentId }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Omit<Client, 'id' | 'agentId'>>({
        name: client?.name || '',
        type: client?.type || 'Exporter',
        status: client?.status || 'Pending Verification',
        location: client?.location || '',
        joinDate: client?.joinDate || new Date().toISOString().split('T')[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newClient: Client = {
            ...formData,
            id: client?.id || `CLT-${Date.now().toString().slice(-5)}`,
            agentId: agentId,
        };
        onSave(newClient);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{client ? t('clientManagement.modal.editTitle') : t('clientManagement.modal.addTitle')}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IconX className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="font-medium text-gray-700">{t('clientManagement.modal.clientName')}</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
                    </div>
                     <div>
                        <label className="font-medium text-gray-700">{t('clientManagement.modal.clientType')}</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full mt-1 p-2 border rounded bg-white">
                            <option value="Exporter">{t('clientManagement.modal.types.exporter')}</option>
                            <option value="Buyer">{t('clientManagement.modal.types.buyer')}</option>
                            <option value="Farmer">{t('clientManagement.modal.types.farmer')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">{t('clientManagement.location')}</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border hover:bg-gray-50">{t('common.cancel')}</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">{t('clientManagement.modal.saveClient')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ClientManagement: React.FC<ClientManagementProps> = ({ clients, onSaveClient, agentId }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleAddNew = () => {
        setEditingClient(null);
        setIsModalOpen(true);
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setIsModalOpen(true);
    };

    const handleSave = (client: Client) => {
        onSaveClient(client);
        setIsModalOpen(false);
    }
    
    const getStatusColor = (status: Client['status']) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Pending Verification': return 'bg-yellow-100 text-yellow-700';
            case 'Inactive': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
    
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && <ClientModal client={editingClient} onClose={() => setIsModalOpen(false)} onSave={handleSave} agentId={agentId} />}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('clientManagement.title')}</h1>
                    <p className="text-gray-500 mt-1">{t('clientManagement.description')}</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm self-start sm:self-center">
                    {t('clientManagement.addClient')}
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative w-full max-w-sm">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('clientManagement.searchPlaceholder')}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                         />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[768px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('clientManagement.name')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('clientManagement.type')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('common.status')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('clientManagement.location')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('clientManagement.joinDate')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map(client => (
                                <tr key={client.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-semibold text-gray-800">{client.name}</td>
                                    <td className="p-4 text-gray-700">{client.type}</td>
                                    <td className="p-4"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(client.status)}`}>{client.status}</span></td>
                                    <td className="p-4 text-gray-700">{client.location}</td>
                                    <td className="p-4 text-gray-700">{client.joinDate}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleEdit(client)} className="text-sm font-semibold text-primary-600">{t('common.edit')}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {filteredClients.length === 0 && (
                <div className="text-center p-12 bg-white rounded-2xl shadow-lg mt-4">
                     <IconUsers className="w-12 h-12 mx-auto text-gray-300" />
                     <h3 className="mt-4 text-xl font-semibold text-gray-800">{t('clientManagement.noClientsTitle')}</h3>
                     <p className="mt-1 text-gray-500">{t('clientManagement.noClientsDescription')}</p>
                </div>
            )}
        </div>
    );
};

export default ClientManagement;