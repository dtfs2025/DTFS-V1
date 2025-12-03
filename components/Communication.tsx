
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shipment, CommunicationMessage } from '../types.ts';
import { IconSend, IconChat, IconChevronLeft } from '../constants.tsx';

interface CommunicationProps {
    shipments: Shipment[];
    messages: CommunicationMessage[];
    setMessages: React.Dispatch<React.SetStateAction<CommunicationMessage[]>>;
}

const Communication: React.FC<CommunicationProps> = ({ shipments, messages, setMessages }) => {
    const { t } = useTranslation();
    const [selectedShipmentId, setSelectedShipmentId] = useState<string>(shipments[0]?.id || '');
    const [newMessage, setNewMessage] = useState('');
    const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

    const activeShipments = shipments.filter(s => s.status !== 'Delivered');
    const selectedShipment = activeShipments.find(s => s.id === selectedShipmentId);
    const conversationMessages = messages.filter(m => m.shipmentId === selectedShipmentId);

    const handleSelectShipment = (id: string) => {
        setSelectedShipmentId(id);
        if (window.innerWidth < 768) { // md breakpoint
            setMobileView('chat');
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedShipment) return;

        const newComm: CommunicationMessage = {
            id: `COM-${Date.now()}`,
            shipmentId: selectedShipmentId,
            sender: 'Logistics',
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, newComm]);
        setNewMessage('');
    };

    return (
        <div className="flex h-full bg-white md:rounded-lg md:shadow-sm">
            {/* Shipment List */}
            <div className={`w-full md:w-1/3 border-r border-slate-200 flex flex-col ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">{t('communication.title')}</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {activeShipments.map(shipment => (
                        <div
                            key={shipment.id}
                            onClick={() => handleSelectShipment(shipment.id)}
                            className={`p-4 cursor-pointer border-l-4 transition-colors ${selectedShipmentId === shipment.id ? 'bg-primary-50 border-primary-600' : 'border-transparent hover:bg-slate-50'}`}
                        >
                            <p className="font-semibold text-slate-800">{shipment.id}</p>
                            <p className="text-sm text-slate-500">{shipment.origin} &rarr; {shipment.destination}</p>
                            <p className="text-sm text-slate-500">{t('common.status')}: {shipment.status}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Message View */}
            <div className={`w-full md:w-2/3 flex flex-col ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
                {selectedShipment ? (
                    <>
                        <div className="p-4 border-b border-slate-200 flex items-center">
                            <button onClick={() => setMobileView('list')} className="md:hidden mr-2 p-1 text-gray-500 hover:text-primary-600">
                                <IconChevronLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h3 className="font-bold text-slate-800">{t('communication.updatesFor', { shipmentId: selectedShipment.id })}</h3>
                                <p className="text-sm text-slate-500">{t('communication.toParties')}</p>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-4">
                             {conversationMessages.map(msg => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === 'Logistics' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'Logistics' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none shadow-sm'}`}>
                                        <p className="text-sm">{msg.content}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 mt-1">{msg.timestamp}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-slate-200 bg-white">
                            <form onSubmit={handleSendMessage} className="relative">
                                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder={t('communication.placeholder')} className="w-full bg-slate-100 border-transparent rounded-lg py-3 pl-4 pr-12 focus:ring-primary-500 focus:border-primary-500"/>
                                <button type="submit" disabled={!newMessage.trim()} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-300">
                                    <IconSend className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 hidden md:flex items-center justify-center text-slate-500 flex-col">
                        <IconChat className="w-16 h-16 text-slate-300 mb-4" />
                        <p>{t('communication.noSelection')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Communication;
