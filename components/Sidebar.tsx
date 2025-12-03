
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, NavItemType } from '../types.ts';
import { getNavItemsForRole, IconChevronLeft, IconLogo, IconLogout } from '../constants.tsx';
import { useAuth } from '../hooks/useAuth.ts';

interface SidebarProps {
    activePage: Page;
    setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{ item: NavItemType, isActive: boolean, isCollapsed: boolean, onClick: () => void }> = ({ item, isActive, isCollapsed, onClick }) => {
    const { t } = useTranslation();
    return (
        <li
            onClick={onClick}
            data-page-name={item.name}
            className={`group relative flex items-center py-2.5 px-3 my-1 rounded-xl cursor-pointer transition-all duration-200 font-medium
                ${isActive
                    ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-200/50'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            <div className={`flex items-center justify-center shrink-0 transition-colors duration-200 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <item.icon className="w-[1.35rem] h-[1.35rem]" />
            </div>
            
            <div className={`flex-1 flex items-center justify-between ml-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                <span className="text-sm tracking-tight whitespace-nowrap">{t(`nav.${item.name}`)}</span>
                {item.count && (
                     <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ml-2 transition-colors ${
                        isActive ? 'bg-primary-200 text-primary-800' : 'bg-gray-100 text-gray-600'
                     }`}>
                        {item.count}
                    </span>
                )}
                {item.isNew && (
                    <span className={`w-1.5 h-1.5 rounded-full ml-2 ${isActive ? 'bg-primary-500' : 'bg-primary-400'}`}></span>
                )}
            </div>

            {isCollapsed && (
                <div className="absolute left-14 bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none border border-gray-700/50 backdrop-blur-sm">
                    {t(`nav.${item.name}`)}
                </div>
            )}
        </li>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
    const { t } = useTranslation();
    const [isCollapsed, setCollapsed] = useState(false);
    const { user, logout, hasPermission } = useAuth();
    
    const navItems = useMemo(() => {
        if (!user || !user.permissions) return [];
        return getNavItemsForRole(user.permissions).filter(item => item.name !== 'Dashboard');
    }, [user]);


    if (!user) return null;

    return (
        <div 
            className={`relative hidden md:flex bg-white h-screen flex-col border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] shrink-0 z-20
            ${isCollapsed ? 'w-[4.5rem]' : 'w-72'}`}
        >
            {/* Header */}
            <div className={`flex items-center h-20 px-4 transition-all ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
                <button
                    onClick={() => hasPermission('dashboard:view') && setActivePage('Dashboard')}
                    className={`flex items-center gap-3 group focus:outline-none ${isCollapsed ? 'justify-center w-full' : ''}`}
                    aria-label={t('nav.Dashboard')}
                >
                    <div className={`flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'scale-90' : 'scale-100'}`}>
                         {/* Logo image replaces text as well */}
                         <IconLogo className={`object-contain transition-all duration-300 ${isCollapsed ? 'h-8 w-auto' : 'h-10 w-auto'}`} />
                    </div>
                </button>
            </div>

            {/* Toggle Button */}
            <button 
                onClick={() => setCollapsed(!isCollapsed)} 
                className="absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-200 shadow-sm transition-all z-30 hover:scale-110"
            >
                <IconChevronLeft className={`w-3.5 h-3.5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>

            {/* Navigation List */}
            <div className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden custom-scrollbar space-y-6">
                <div>
                    {!isCollapsed && <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t('nav.mainMenu')}</p>}
                    <ul className="space-y-0.5">
                        <NavItem
                            item={{ name: 'Dashboard', icon: getNavItemsForRole(user.permissions).find(i => i.name === 'Dashboard')?.icon || IconLogo } as any}
                            isActive={activePage === 'Dashboard'}
                            isCollapsed={isCollapsed}
                            onClick={() => setActivePage('Dashboard')}
                        />
                    </ul>
                </div>
                
                <div>
                    {!isCollapsed && <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t('nav.menu')}</p>}
                    <ul className="space-y-0.5">
                        {navItems.map(item => (
                            <NavItem
                                key={item.name}
                                item={item}
                                isActive={activePage === item.name}
                                isCollapsed={isCollapsed}
                                onClick={() => setActivePage(item.name)}
                            />
                        ))}
                    </ul>
                </div>
            </div>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-gray-50 bg-gray-50/30">
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''} p-2 rounded-xl transition-colors hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-gray-100 cursor-pointer group`}>
                    <div className="relative">
                        <img className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm" src={user.avatar} alt={user.name} />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-primary-700 transition-colors">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{t(`nav.${user.role}` as any)}</p>
                        </div>
                    )}
                    
                    {!isCollapsed && (
                        <button onClick={(e) => { e.stopPropagation(); logout(); }} className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                            <IconLogout className="w-4.5 h-4.5"/>
                        </button>
                    )}
                </div>
                 {isCollapsed && (
                     <button onClick={logout} className="mt-3 w-full flex justify-center text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50">
                        <IconLogout className="w-5 h-5"/>
                    </button>
                 )}
                 {!isCollapsed && (
                    <div className="mt-4 pt-2 border-t border-gray-200 text-center">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                            Powered by <span className="text-primary-600 font-bold">Nexus X Industries</span>
                        </p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default Sidebar;