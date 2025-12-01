import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shipment, ShipmentStatus, Order } from '../types.ts';
import { IconSearch, IconDotsVertical, IconShipmentManagement, IconX } from '../constants.tsx';

interface ShipmentManagementProps {
    shipments: Shipment[];
    setShipments: React.Dispatch<React.SetStateAction<Shipment[]>>;
    orders: Order[];
}

const ShipmentModal: React.FC<{
    shipment: Shipment | null;
    onClose: () => void;
    onSave: (shipment: Shipment) => void;
    orders: Order[];
}> = ({ shipment, onClose, onSave, orders }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Omit<Shipment, 'id' | 'trackingNumber'>>({
        orderId: shipment?.orderId || '',
        status: shipment?.status || 'Pending Pickup',
        origin: shipment?.origin || '',
        destination: shipment?.destination || '',
        carrier: shipment?.carrier || '',
        estimatedDelivery: shipment?.estimatedDelivery || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newShipment: Shipment = {
            ...formData,
            id: shipment?.id || `SHP-${Date.now().toString().slice(-4)}`,
            trackingNumber: shipment?.trackingNumber || `TRK${Date.now().toString().slice(-8)}`,
        };
        onSave(newShipment);
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">{shipment ? t('shipmentManagement.modal.editTitle') : t('shipmentManagement.modal.addTitle')}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><IconX className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="font-medium text-slate-700">{t('shipmentManagement.modal.orderId')}</label>
                        <select name="orderId" value={formData.orderId} onChange={handleChange} className="w-full mt-1 p-2 border border-slate-300 rounded-lg bg-white" required>
                            <option value="" disabled>{t('shipmentManagement.modal.selectOrder')}</option>
                            {orders.filter(o => o.status === 'Processing' || o.status === 'Pending').map(order => (
                                <option key={order.id} value={order.id}>{order.id} - {order.productName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="font-medium text-slate-700">{t('shipmentManagement.modal.origin')}</label>
                            <input type="text" name="origin" value={formData.origin} onChange={handleChange} placeholder={t('shipmentManagement.modal.originPlaceholder')} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" required />
                        </div>
                        <div>
                            <label className="font-medium text-slate-700">{t('shipmentManagement.modal.destination')}</label>
                            <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder={t('shipmentManagement.modal.destinationPlaceholder')} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div>
                            <label className="font-medium text-slate-700">{t('shipmentManagement.modal.carrier')}</label>
                            <input type="text" name="carrier" value={formData.carrier} onChange={handleChange} placeholder={t('shipmentManagement.modal.carrierPlaceholder')} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" required />
                        </div>
                        <div>
                            <label className="font-medium text-slate-700">{t('shipmentManagement.modal.estimatedDelivery')}</label>
                            <input type="date" name="estimatedDelivery" value={formData.estimatedDelivery} onChange={handleChange} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" required />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border hover:bg-slate-50 transition-colors">{t('common.cancel')}</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">{t('shipmentManagement.modal.saveShipment')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ShipmentManagement: React.FC<ShipmentManagementProps> = ({ shipments, setShipments, orders }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);

    const filteredShipments = shipments.filter(s =>
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: ShipmentStatus) => {
        switch (status) {
            case 'Pending Pickup': return 'bg-yellow-100 text-yellow-700';
            case 'In Transit': return 'bg-blue-100 text-blue-700';
            case 'Delayed': return 'bg-orange-100 text-orange-700';
            case 'At Customs': return 'bg-purple-100 text-purple-700';
            case 'Delivered': return 'bg-green-100 text-green-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };
    
    const handleStatusChange = (shipmentId: string, newStatus: ShipmentStatus) => {
        setShipments(prev =>
            prev.map(s => s.id === shipmentId ? { ...s, status: newStatus } : s)
        );
        setOpenMenuId(null);
    };
    
    const handleSave = (shipmentToSave: Shipment) => {
        const exists = shipments.some(s => s.id === shipmentToSave.id);
        if (exists) {
            setShipments(prev => prev.map(s => s.id === shipmentToSave.id ? shipmentToSave : s));
        } else {
            setShipments(prev => [...prev, shipmentToSave]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && (
                <ShipmentModal
                    shipment={editingShipment}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    orders={orders}
                />
            )}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t('shipmentManagement.title')}</h1>
                    <p className="text-slate-500 mt-1">{t('shipmentManagement.description')}</p>
                </div>
                 <button onClick={() => { setEditingShipment(null); setIsModalOpen(true); }} className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm self-start sm:self-center">{t('shipmentManagement.createShipment')}</button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative w-full max-w-sm">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" placeholder={t('shipmentManagement.searchPlaceholder')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('shipmentManagement.shipmentOrderId')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('shipmentManagement.route')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('shipmentManagement.carrier')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('shipmentManagement.eta')}</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">{t('common.status')}</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShipments.map(shipment => (
                                <tr key={shipment.id} className="border-b last:border-b-0 hover:bg-slate-50">
                                    <td className="p-4">
                                        <p className="font-semibold text-slate-800">{shipment.id}</p>
                                        <p className="text-sm text-slate-500">{shipment.orderId}</p>
                                    </td>
                                    <td className="p-4 text-slate-700">{shipment.origin} &rarr; {shipment.destination}</td>
                                    <td className="p-4 text-slate-700">{shipment.carrier}</td>
                                    <td className="p-4 text-slate-700">{shipment.estimatedDelivery}</td>
                                    <td className="p-4"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(shipment.status)}`}>{shipment.status}</span></td>
                                    <td className="p-4 text-right">
                                        <div className="relative">
                                            <button onClick={() => setOpenMenuId(shipment.id === openMenuId ? null : shipment.id)} className="text-slate-500 p-2 rounded-full hover:bg-slate-200"><IconDotsVertical className="w-5 h-5" /></button>
                                            {openMenuId === shipment.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 animate-fade-in">
                                                    {(['In Transit', 'At Customs', 'Delivered'] as ShipmentStatus[]).map(status => (
                                                        <a key={status} onClick={() => handleStatusChange(shipment.id, status)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer">{t('orderManagement.markAs', { status: status })}</a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {filteredShipments.length === 0 && (
                <div className="text-center p-12 bg-white rounded-2xl shadow-lg mt-4">
                     <IconShipmentManagement className="w-12 h-12 mx-auto text-slate-300" />
                     <h3 className="mt-4 text-xl font-semibold text-slate-800">{t('shipmentManagement.noShipmentsTitle')}</h3>
                     <p className="mt-1 text-slate-500">{t('shipmentManagement.noShipmentsDescription')}</p>
                </div>
            )}
        </div>
    );
};

export default ShipmentManagement;