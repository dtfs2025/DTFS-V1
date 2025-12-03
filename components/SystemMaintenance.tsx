import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconSystemMaintenance } from '../constants.tsx';
import { SystemSettings } from '../types.ts';

const Toggle: React.FC<{ 
    label: string; 
    description: string; 
    enabled: boolean;
    onToggle: () => void;
}> = ({ label, description, enabled, onToggle }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border">
        <div className="mb-2 sm:mb-0">
            <p className="font-semibold text-gray-800">{label}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button onClick={onToggle} className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${enabled ? 'bg-red-600' : 'bg-gray-300'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${enabled ? 'translate-x-6' : ''}`}></div>
        </button>
    </div>
);

interface SystemMaintenanceProps {
    settings: SystemSettings;
    onUpdateSettings: (key: keyof SystemSettings, value: boolean) => void;
}

const SystemMaintenance: React.FC<SystemMaintenanceProps> = ({ settings, onUpdateSettings }) => {
    const { t } = useTranslation();
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto animate-fade-in">
             <div className="text-center mb-8">
                <IconSystemMaintenance className="w-16 h-16 mx-auto text-primary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">{t('systemMaintenance.title')}</h1>
                <p className="text-gray-500 mt-2">{t('systemMaintenance.description')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">{t('systemMaintenance.maintenanceMode')}</h2>
                <div className="space-y-4 mt-4">
                    <Toggle 
                        label={t('systemMaintenance.enableMaintenance')} 
                        description={t('systemMaintenance.enableMaintenanceDesc')}
                        enabled={settings.maintenanceMode}
                        onToggle={() => onUpdateSettings('maintenanceMode', !settings.maintenanceMode)} 
                    />
                    <div className="p-4 bg-gray-50 rounded-lg border">
                        <label className="font-semibold text-gray-800">{t('systemMaintenance.maintenanceMessage')}</label>
                        <p className="text-sm text-gray-500 mb-2">{t('systemMaintenance.maintenanceMessageDesc')}</p>
                        <textarea rows={3} className="w-full p-2 border rounded-md" defaultValue={t('systemMaintenance.defaultMessage')}></textarea>
                    </div>
                </div>
                 <div className="text-right mt-4">
                    <button className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700">{t('systemMaintenance.saveMessage')}</button>
                </div>
            </div>
        </div>
    );
};

export default SystemMaintenance;