
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserRole, Permission } from '../types.ts';
import { useAuth } from '../hooks/useAuth.ts';

const ALL_PERMISSIONS: Permission[] = [
    'dashboard:view', 'chat:read', 'chat:write', 'document:view', 'document:generate',
    'finance:view', 'finance:apply', 'marketplace:view', 'product:read',
    'product:manage', 'order:read', 'order:manage', 'training:view', 'wallet:view',
    'product:discover', 'supplier:manage', 'order:place', 'quality:control', 'inspection:request', 'contract:manage',
    'shipment:manage', 'route:plan', 'fleet:manage', 'logistics:document', 'communication:manage', 
    'pricing:quote', 'insurance:manage', 'customs:clearance',
    'client:manage', 'commission:view', 'support:provide', 'market:develop', 'analytics:view', 'user:onboard',
    'admin:user:manage', 'admin:role:manage', 'admin:system:config', 'admin:content:moderate',
    'admin:dispute:resolve', 'admin:financial:oversee', 'admin:analytics:access', 'admin:security:manage',
    'admin:compliance:monitor', 'admin:system:maintenance', 'esg:view'
];

const ALL_ROLES: UserRole[] = ['Admin', 'Exporter', 'Buyer', 'Logistics', 'Agent', 'Guest', 'GuestExporter', 'GuestBuyer'];

const RoleManagement: React.FC = () => {
    const { t } = useTranslation();
    const { rolePermissions, togglePermission } = useAuth();

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-full mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('roleManagement.title')}</h1>
                    <p className="text-gray-500 mt-1">{t('roleManagement.description')}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                        <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm border-b border-gray-200 uppercase tracking-wider bg-gray-50 sticky left-0 z-20 min-w-[200px]">{t('roleManagement.permission')}</th>
                                {ALL_ROLES.map(role => (
                                    <th key={role} className="p-4 font-semibold text-gray-600 text-sm text-center border-b border-l border-gray-200 min-w-[100px]">
                                        <div className="flex flex-col items-center">
                                            <span>{t(`nav.${role}` as any)}</span>
                                            <span className="text-[10px] font-normal text-gray-400 mt-1">{role}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ALL_PERMISSIONS.map(permission => (
                                <tr key={permission} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-3 font-mono text-xs text-gray-600 border-b border-gray-200 bg-white group-hover:bg-gray-50 sticky left-0 z-10 font-medium">
                                        {permission}
                                    </td>
                                    {ALL_ROLES.map(role => {
                                        const hasPermission = (rolePermissions[role] || []).includes(permission);
                                        return (
                                            <td key={`${role}-${permission}`} className="p-3 text-center border-b border-l border-gray-200 relative">
                                                <div className="flex justify-center">
                                                    <input 
                                                        type="checkbox"
                                                        className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer transition-all hover:scale-110 checked:bg-primary-600"
                                                        checked={hasPermission}
                                                        onChange={() => togglePermission(role, permission)}
                                                    />
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RoleManagement;
