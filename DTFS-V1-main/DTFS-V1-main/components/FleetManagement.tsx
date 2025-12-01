
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Vehicle, Driver } from '../types.ts';
import { IconX } from '../constants.tsx';

interface FleetManagementProps {
    vehicles: Vehicle[];
    onSaveVehicle: (vehicle: Vehicle) => void;
    onDeleteVehicle: (vehicleId: string) => void;
    drivers: Driver[];
    onSaveDriver: (driver: Driver) => void;
    onDeleteDriver: (driverId: string) => void;
}

const VehicleModal: React.FC<{
    vehicle: Vehicle | null;
    onClose: () => void;
    onSave: (vehicle: Vehicle) => void;
}> = ({ vehicle, onClose, onSave }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Omit<Vehicle, 'id' | 'currentLocation'>>({
        name: vehicle?.name || '',
        type: vehicle?.type || 'Truck',
        status: vehicle?.status || 'Available',
        driverId: vehicle?.driverId || undefined
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newVehicle: Vehicle = {
            ...formData,
            id: vehicle?.id || `VHC-${Date.now().toString().slice(-4)}`,
            currentLocation: vehicle?.currentLocation || 'Logistics Hub',
        };
        onSave(newVehicle);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{vehicle ? t('fleetManagement.modal.editVehicle') : t('fleetManagement.modal.addVehicle')}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IconX className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder={t('fleetManagement.modal.placeholders.vehicleName')} className="w-full p-2 border rounded" required />
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded bg-white">
                        <option>Truck</option><option>Van</option><option>Ship</option><option>Plane</option>
                    </select>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded bg-white">
                        <option>Available</option><option>On Route</option><option>Maintenance</option><option>Inactive</option>
                    </select>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border hover:bg-gray-50">{t('common.cancel')}</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">{t('fleetManagement.modal.saveVehicle')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DriverModal: React.FC<{
    driver: Driver | null;
    onClose: () => void;
    onSave: (driver: Driver) => void;
}> = ({ driver, onClose, onSave }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Omit<Driver, 'id'>>({
        name: driver?.name || '',
        licenseNumber: driver?.licenseNumber || '',
        status: driver?.status || 'Available'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newDriver: Driver = {
            ...formData,
            id: driver?.id || `DRV-${Date.now().toString().slice(-4)}`,
        };
        onSave(newDriver);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{driver ? t('fleetManagement.modal.editDriver') : t('fleetManagement.modal.addDriver')}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IconX className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder={t('fleetManagement.modal.placeholders.driverName')} className="w-full p-2 border rounded" required />
                    <input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder={t('fleetManagement.modal.placeholders.license')} className="w-full p-2 border rounded" required />
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded bg-white">
                        <option>Available</option><option>On Duty</option><option>Off Duty</option>
                    </select>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border hover:bg-gray-50">{t('common.cancel')}</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">{t('fleetManagement.modal.saveDriver')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const FleetManagement: React.FC<FleetManagementProps> = ({ vehicles, onSaveVehicle, onDeleteVehicle, drivers, onSaveDriver, onDeleteDriver }) => {
    const { t } = useTranslation();
    const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [isDriverModalOpen, setDriverModalOpen] = useState(false);
    const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

    const handleEditVehicle = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        setVehicleModalOpen(true);
    };

    const handleEditDriver = (driver: Driver) => {
        setEditingDriver(driver);
        setDriverModalOpen(true);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isVehicleModalOpen && <VehicleModal vehicle={editingVehicle} onClose={() => setVehicleModalOpen(false)} onSave={onSaveVehicle} />}
            {isDriverModalOpen && <DriverModal driver={editingDriver} onClose={() => setDriverModalOpen(false)} onSave={onSaveDriver} />}
            
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">{t('fleetManagement.title')}</h1>
                <p className="text-gray-500 mt-1">{t('fleetManagement.description')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">{t('fleetManagement.vehicles', { count: vehicles.length })}</h2>
                        <button onClick={() => { setEditingVehicle(null); setVehicleModalOpen(true); }} className="text-sm font-semibold bg-primary-600 text-white px-3 py-1.5 rounded-md hover:bg-primary-700">{t('fleetManagement.addVehicle')}</button>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <table className="w-full text-left min-w-[500px]">
                           <thead className="text-sm text-gray-500"><tr><th className="p-2 font-semibold">{t('fleetManagement.tableHeaders.vehicleName')}</th><th className="p-2 font-semibold">{t('fleetManagement.tableHeaders.type')}</th><th className="p-2 font-semibold">{t('common.status')}</th><th className="p-2 font-semibold">{t('common.actions')}</th></tr></thead>
                           <tbody>{vehicles.map(v => <tr key={v.id} className="border-b last:border-b-0">
                               <td className="p-2 font-semibold">{v.name}</td><td className="p-2">{v.type}</td><td className="p-2">{v.status}</td>
                               <td className="p-2 space-x-2"><button onClick={() => handleEditVehicle(v)} className="text-xs text-blue-600 font-semibold">{t('common.edit')}</button><button onClick={() => onDeleteVehicle(v.id)} className="text-xs text-red-600 font-semibold">{t('common.delete')}</button></td>
                           </tr>)}</tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">{t('fleetManagement.drivers', { count: drivers.length })}</h2>
                        <button onClick={() => { setEditingDriver(null); setDriverModalOpen(true); }} className="text-sm font-semibold bg-primary-600 text-white px-3 py-1.5 rounded-md hover:bg-primary-700">{t('fleetManagement.addDriver')}</button>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <table className="w-full text-left min-w-[500px]">
                           <thead className="text-sm text-gray-500"><tr><th className="p-2 font-semibold">{t('fleetManagement.tableHeaders.driverName')}</th><th className="p-2 font-semibold">{t('fleetManagement.tableHeaders.license')}</th><th className="p-2 font-semibold">{t('common.status')}</th><th className="p-2 font-semibold">{t('common.actions')}</th></tr></thead>
                           <tbody>{drivers.map(d => <tr key={d.id} className="border-b last:border-b-0">
                               <td className="p-2 font-semibold">{d.name}</td><td className="p-2">{d.licenseNumber}</td><td className="p-2">{d.status}</td>
                               <td className="p-2 space-x-2"><button onClick={() => handleEditDriver(d)} className="text-xs text-blue-600 font-semibold">{t('common.edit')}</button><button onClick={() => onDeleteDriver(d.id)} className="text-xs text-red-600 font-semibold">{t('common.delete')}</button></td>
                           </tr>)}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FleetManagement;
