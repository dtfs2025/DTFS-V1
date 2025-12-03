import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shipment, Vehicle, Driver } from '../types.ts';
import { IconRoutePlanning, IconX, IconAIAssistant } from '../constants.tsx';
import { optimizeRoutes } from '../services/geminiService.ts';

interface RoutePlanningProps {
    shipments: Shipment[];
    setShipments: React.Dispatch<React.SetStateAction<Shipment[]>>;
    vehicles: Vehicle[];
    drivers: Driver[];
}

const AssignRouteModal: React.FC<{
    shipment: Shipment;
    vehicles: Vehicle[];
    drivers: Driver[];
    onClose: () => void;
    onSave: (shipmentId: string, vehicleId: string, driverId: string) => void;
}> = ({ shipment, vehicles, drivers, onClose, onSave }) => {
    const { t } = useTranslation();
    const [vehicleId, setVehicleId] = useState('');
    const [driverId, setDriverId] = useState('');
    
    const availableVehicles = vehicles.filter(v => v.status === 'Available');
    const availableDrivers = drivers.filter(d => d.status === 'Available');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(shipment.id, vehicleId, driverId);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">{t('routePlanning.modal.title', { shipmentId: shipment.id })}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><IconX className="w-6 h-6" /></button>
                </div>
                <p className="text-slate-500 mb-4">{t('routePlanning.modal.route')} <span className="font-semibold">{shipment.origin} &rarr; {shipment.destination}</span></p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="font-medium text-slate-700">{t('routePlanning.modal.selectVehicle')}</label>
                        <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-lg bg-white" required>
                            <option value="" disabled>{t('routePlanning.modal.chooseVehicle')}</option>
                            {availableVehicles.map(v => <option key={v.id} value={v.id}>{v.name} ({v.type})</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-slate-700">{t('routePlanning.modal.selectDriver')}</label>
                        <select value={driverId} onChange={e => setDriverId(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-lg bg-white" required>
                            <option value="" disabled>{t('routePlanning.modal.chooseDriver')}</option>
                            {availableDrivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border hover:bg-slate-50 transition-colors">{t('common.cancel')}</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">{t('routePlanning.assignRoute')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const RoutePlanning: React.FC<RoutePlanningProps> = ({ shipments, setShipments, vehicles, drivers }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [suggestedAssignments, setSuggestedAssignments] = useState<{ shipment: Shipment; vehicle: Vehicle; driver: Driver; }[]>([]);

    const shipmentsToPlan = shipments.filter(s => s.status === 'Pending Pickup' && !s.driverId);
    
    const handleOpenModal = (shipment: Shipment) => {
        setSelectedShipment(shipment);
        setIsModalOpen(true);
    };

    const handleAssignRoute = (shipmentId: string, vehicleId: string, driverId: string) => {
        setShipments(prev => prev.map(s => 
            s.id === shipmentId ? { ...s, vehicleId, driverId, status: 'In Transit' } : s
        ));
        setIsModalOpen(false);
        setSelectedShipment(null);
    };

    const handleOptimize = async () => {
        setIsOptimizing(true);
        setSuggestedAssignments([]);
        const availableVehicles = vehicles.filter(v => v.status === 'Available');
        const availableDrivers = drivers.filter(d => d.status === 'Available');
        try {
            const assignments = await optimizeRoutes(shipmentsToPlan, availableVehicles, availableDrivers);
            
            const suggestionsWithData = assignments.map(a => ({
                shipment: shipments.find(s => s.id === a.shipmentId),
                vehicle: vehicles.find(v => v.id === a.vehicleId),
                driver: drivers.find(d => d.id === a.driverId)
            })).filter(s => s.shipment && s.vehicle && s.driver) as { shipment: Shipment; vehicle: Vehicle; driver: Driver; }[];
            
            setSuggestedAssignments(suggestionsWithData);

        } catch (error) {
            console.error("Failed to optimize routes:", error);
        } finally {
            setIsOptimizing(false);
        }
    };

    const handleConfirmSuggestions = () => {
        setShipments(prevShipments => {
            let updatedShipments = [...prevShipments];
            suggestedAssignments.forEach(assignment => {
                updatedShipments = updatedShipments.map(s =>
                    s.id === assignment.shipment.id
                    ? { ...s, vehicleId: assignment.vehicle.id, driverId: assignment.driver.id, status: 'In Transit' }
                    : s
                );
            });
            return updatedShipments;
        });
        setSuggestedAssignments([]);
        // In a real app, we'd also update vehicle and driver statuses here
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && selectedShipment && (
                <AssignRouteModal 
                    shipment={selectedShipment}
                    vehicles={vehicles}
                    drivers={drivers}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAssignRoute}
                />
            )}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-slate-800">{t('routePlanning.title')}</h1>
                    <p className="text-slate-500 mt-1">{t('routePlanning.description')}</p>
                </div>
                <button
                    onClick={handleOptimize}
                    disabled={isOptimizing || shipmentsToPlan.length === 0}
                    className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm disabled:bg-primary-300 self-center sm:self-auto"
                >
                    <IconAIAssistant className="w-5 h-5" />
                    {isOptimizing ? t('routePlanning.optimizing') : t('routePlanning.optimizeWithAI')}
                </button>
            </div>

            {isOptimizing && (
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-slate-500 font-semibold">{t('routePlanning.optimizing')}</p>
                </div>
            )}

            {suggestedAssignments.length > 0 && (
                 <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border-2 border-primary-400">
                    <h2 className="text-xl font-bold text-slate-800">{t('routePlanning.aiSuggestedPlan')}</h2>
                    <p className="text-sm text-slate-500 mb-4">{t('routePlanning.aiPlanDescription')}</p>
                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-2">
                        {suggestedAssignments.map(({ shipment, vehicle, driver }) => (
                            <div key={shipment.id} className="p-3 bg-slate-50 rounded-lg border">
                                <p className="font-semibold text-slate-800">{t('routePlanning.modal.route')} {shipment.origin} &rarr; {shipment.destination}</p>
                                <p className="text-sm text-slate-600">{t('routePlanning.modal.selectVehicle')}: {vehicle.name}, {t('routePlanning.modal.selectDriver')}: {driver.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-4">
                        <button onClick={() => setSuggestedAssignments([])} className="px-4 py-2 rounded-lg border font-semibold hover:bg-slate-50">{t('routePlanning.discard')}</button>
                        <button onClick={handleConfirmSuggestions} className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700">{t('routePlanning.confirmPlan')}</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">{t('routePlanning.awaitingRoute')}</h2>
                    <div className="space-y-3">
                        {shipmentsToPlan.length > 0 ? shipmentsToPlan.map(shipment => (
                             <div key={shipment.id} className="p-4 border rounded-lg flex justify-between items-center">
                                 <div>
                                     <p className="font-semibold">{shipment.id}</p>
                                     <p className="text-sm text-slate-500">{shipment.origin} &rarr; {shipment.destination}</p>
                                 </div>
                                 <button onClick={() => handleOpenModal(shipment)} className="text-sm font-semibold bg-primary-100 text-primary-700 px-3 py-1 rounded-md hover:bg-primary-200">{t('routePlanning.assignRoute')}</button>
                             </div>
                        )) : (
                            <p className="text-slate-500 text-center py-4">{suggestedAssignments.length > 0 ? t('routePlanning.noAwaitingAfterAI') : t('routePlanning.noAwaiting')}</p>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">{t('routePlanning.activeRoutes')}</h2>
                     <div className="space-y-3">
                        {shipments.filter(s => s.driverId).map(shipment => (
                            <div key={shipment.id} className="p-4 border rounded-lg">
                                 <p className="font-semibold">{shipment.id} ({shipment.status})</p>
                                 <p className="text-sm text-slate-500">{t('routePlanning.modal.route')} {shipment.origin} &rarr; {shipment.destination}</p>
                                 <p className="text-sm text-slate-500">{t('routePlanning.modal.selectDriver')}: {drivers.find(d=>d.id === shipment.driverId)?.name}</p>
                                 <p className="text-sm text-slate-500">{t('routePlanning.modal.selectVehicle')}: {vehicles.find(v=>v.id === shipment.vehicleId)?.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoutePlanning;