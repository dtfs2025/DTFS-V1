import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, NavItemType } from '../types.ts';
import { useAuth } from '../hooks/useAuth.ts';
import { getNavItemsForRole, IconDotsVertical, IconX, IconChevronRight } from '../constants.tsx';

const NavButton: React.FC<{ item: NavItemType, isActive: boolean, onClick: () => void }> = ({ item, isActive, onClick }) => {
    const { t } = useTranslation();
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-primary-600' : 'text-gray-500'}`}>
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium mt-1">{t(`nav.${item.name}`)}</span>
        </button>
    )
};

const MoreMenu: React.FC<{
    items: NavItemType[],
    setActivePage: (page: Page) => void,
    onClose: () => void
}> = ({ items, setActivePage, onClose }) => {
    const { t } = useTranslation();

    const handleSelect = (page: Page) => {
        setActivePage(page);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col justify-end animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-t-2xl p-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{t('nav.menu')}</h3>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <IconX className="w-6 h-6"/>
                    </button>
                </div>
                <ul className="space-y-1 max-h-[50vh] overflow-y-auto">
                    {items.map(item => (
                        <li key={item.name} onClick={() => handleSelect(item.name)} className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <item.icon className="w-6 h-6 mr-4 text-gray-600" />
                            <span className="font-semibold text-gray-800 flex-grow">{t(`nav.${item.name}`)}</span>
                            <IconChevronRight className="w-5 h-5 text-gray-400" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const BottomNav: React.FC<{ activePage: Page, setActivePage: (page: Page) => void }> = ({ activePage, setActivePage }) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

    const allNavItems = useMemo(() => {
        if (!user || !user.permissions) return [];
        return getNavItemsForRole(user.permissions);
    }, [user]);

    const mobileItems = useMemo(() => allNavItems.filter(item => item.mobile), [allNavItems]);
    const moreItems = useMemo(() => allNavItems.filter(item => !item.mobile || mobileItems.indexOf(item) >= 4), [allNavItems, mobileItems]);
    const mainItems = useMemo(() => mobileItems.slice(0, 4), [mobileItems]);

    const isMoreActive = useMemo(() => {
      return moreItems.some(item => item.name === activePage);
    }, [activePage, moreItems])

    return (
        <>
            <footer className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden z-50">
                <div className="flex justify-around items-center h-full">
                    {mainItems.map(item => (
                        <NavButton 
                            key={item.name}
                            item={item}
                            isActive={activePage === item.name}
                            onClick={() => setActivePage(item.name)}
                        />
                    ))}
                    {moreItems.length > 0 && (
                         <button onClick={() => setMoreMenuOpen(true)} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isMoreMenuOpen || isMoreActive ? 'text-primary-600' : 'text-gray-500'}`}>
                            <IconDotsVertical className="w-6 h-6" />
                            <span className="text-xs font-medium mt-1">{t('nav.menu')}</span>
                        </button>
                    )}
                </div>
            </footer>
            {isMoreMenuOpen && (
                <MoreMenu items={moreItems} setActivePage={setActivePage} onClose={() => setMoreMenuOpen(false)} />
            )}
        </>
    )
}

export default BottomNav;
