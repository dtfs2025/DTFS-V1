
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { User, UserRole } from '../types.ts';
import { IconSearch, IconDotsVertical, IconUserManagement, IconX } from '../constants.tsx';

interface UserManagementProps {
    users: Omit<User, 'permissions'>[];
    onUpdateUser: (userId: string, newRole: UserRole) => void;
    onDeleteUser: (userId: string) => void;
}

const UserModal: React.FC<{
    user: Omit<User, 'permissions'>;
    onClose: () => void;
    onSave: (userId: string, newRole: UserRole) => void;
}> = ({ user, onClose, onSave }) => {
    const { t } = useTranslation();
    const [role, setRole] = useState(user.role);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(user.id, role);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md animate-fade-in-up">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{t('userManagement.modal.title')}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IconX className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p>{t('userManagement.modal.editingUser')} <span className="font-semibold">{user.name}</span></p>
                    <div>
                        <label className="font-medium text-gray-700">{t('nav.Role Management')}</label>
                        <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full mt-1 p-2 border rounded bg-white">
                           {(['Exporter', 'Buyer', 'Logistics', 'Agent', 'Admin'] as UserRole[]).map(r => (
                               <option key={r} value={r}>{t(`nav.${r}` as any)}</option>
                           ))}
                        </select>
                    </div>
                     <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border hover:bg-gray-50">{t('common.cancel')}</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">{t('userManagement.modal.saveRole')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const UserManagement: React.FC<UserManagementProps> = ({ users, onUpdateUser, onDeleteUser }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Omit<User, 'permissions'> | null>(null);

    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        ), [users, searchTerm]);

    const handleEdit = (user: Omit<User, 'permissions'>) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSave = (userId: string, newRole: UserRole) => {
        onUpdateUser(userId, newRole);
        setIsModalOpen(false);
    };

    const handleDelete = (userId: string) => {
        if (window.confirm(t('userManagement.deleteConfirm'))) {
            onDeleteUser(userId);
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            {isModalOpen && editingUser && (
                <UserModal user={editingUser} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
            )}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('userManagement.title')}</h1>
                    <p className="text-gray-500 mt-1">{t('userManagement.description')}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative w-full max-w-sm">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('userManagement.searchPlaceholder')}
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
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('userManagement.tableHeaders.user')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('userManagement.tableHeaders.role')}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-700 font-medium">{t(`nav.${user.role}` as any)}</td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button onClick={() => handleEdit(user)} className="text-sm font-semibold bg-white border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100">{t('common.edit')}</button>
                                            <button className="text-sm font-semibold bg-white border border-gray-300 text-orange-600 px-3 py-1 rounded-md hover:bg-gray-100">{t('userManagement.suspend')}</button>
                                            <button onClick={() => handleDelete(user.id)} className="text-sm font-semibold bg-white border border-gray-300 text-red-600 px-3 py-1 rounded-md hover:bg-gray-100">{t('common.delete')}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {filteredUsers.length === 0 && (
                <div className="text-center p-12 bg-white rounded-2xl shadow-lg mt-4">
                     <IconUserManagement className="w-12 h-12 mx-auto text-gray-300" />
                     <h3 className="mt-4 text-xl font-semibold text-gray-800">{t('userManagement.noUsersTitle')}</h3>
                     <p className="mt-1 text-gray-500">{t('userManagement.noUsersDescription')}</p>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
