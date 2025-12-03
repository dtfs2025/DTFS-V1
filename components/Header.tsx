
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IconSearch, IconChevronDown, IconBell, IconUser } from '../constants.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import { Notification, Page, Product, Order, Shipment, User } from '../types.ts';
import NotificationDropdown from './NotificationDropdown.tsx';
import useDebounce from '../hooks/useDebounce.ts';
import GlobalSearch from './GlobalSearch.tsx';
import { performGlobalSearch } from '../services/geminiService.ts';

interface HeaderProps {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    setActivePage: (page: Page) => void;
    products: Product[];
    orders: Order[];
    shipments: Shipment[];
    users: Omit<User, 'permissions'>[];
}

const Header: React.FC<HeaderProps> = ({ notifications, setNotifications, setActivePage, products, orders, shipments, users }) => {
    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any>({ products: [], orders: [], shipments: [], users: [] });
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const searchDataRef = useRef({ products, orders, shipments, users });
    useEffect(() => {
        searchDataRef.current = { products, orders, shipments, users };
    });

    const languages: Record<string, {name: string, flag: string}> = {
        en: { name: t('header.languages.en'), flag: '🇬🇧' },
        fr: { name: t('header.languages.fr'), flag: '🇫🇷' },
        sw: { name: t('header.languages.sw'), flag: '🇰🇪' },
        ar: { name: t('header.languages.ar'), flag: '🇸🇦' },
        pt: { name: t('header.languages.pt'), flag: '🇵🇹' },
        ha: { name: t('header.languages.ha'), flag: '🇳🇬' },
        yo: { name: t('header.languages.yo'), flag: '🇳🇬' },
        ig: { name: t('header.languages.ig'), flag: '🇳🇬' },
    };
    
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsLangOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) setIsLangOpen(false);
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) setIsNotificationsOpen(false);
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) setIsSearchOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (debouncedSearchQuery) {
            const runSearch = async () => {
                setIsSearchLoading(true);
                setIsSearchOpen(true);
                setSearchResults({ products: [], orders: [], shipments: [], users: [] });

                try {
                    const currentData = searchDataRef.current;
                    const resultIds = await performGlobalSearch(debouncedSearchQuery, currentData);
                    
                    const newResults = {
                        products: currentData.products.filter(p => resultIds.products.includes(p.id.toString())),
                        orders: currentData.orders.filter(o => resultIds.orders.includes(o.id)),
                        shipments: currentData.shipments.filter(s => resultIds.shipments.includes(s.id)),
                        users: currentData.users.filter(u => resultIds.users.includes(u.id)),
                    };
                    setSearchResults(newResults);
                } catch (error) {
                    console.error("Global AI search failed:", error);
                } finally {
                    setIsSearchLoading(false);
                }
            };
            runSearch();
        } else {
            setIsSearchOpen(false);
            setSearchResults({ products: [], orders: [], shipments: [], users: [] });
        }
    }, [debouncedSearchQuery]);
    
    const handleMarkAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    return (
        <header className="sticky top-0 z-40 w-full h-20 px-4 sm:px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-gray-100/50 transition-all duration-200 shadow-sm">
            {/* Search Area */}
            <div ref={searchRef} className="relative w-full max-w-md hidden md:block group">
                <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? 'shadow-lg ring-2 ring-primary-100' : 'shadow-sm'} bg-white rounded-2xl border border-gray-200 overflow-hidden`}>
                    <div className="pl-4 text-gray-400 group-focus-within:text-primary-500 transition-colors">
                        <IconSearch className="w-5 h-5" />
                    </div>
                    <input 
                        type="text" 
                        placeholder={t('header.searchPlaceholder')} 
                        className="w-full py-2.5 px-3 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => { if(searchQuery) setIsSearchOpen(true) }}
                    />
                    <div className="pr-2">
                        <span className="px-2 py-1 text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-100 rounded-md">⌘ K</span>
                    </div>
                </div>
                {isSearchOpen && (
                    <GlobalSearch 
                        query={debouncedSearchQuery}
                        results={searchResults}
                        isLoading={isSearchLoading}
                        onClose={() => setIsSearchOpen(false)}
                        setActivePage={setActivePage}
                    />
                )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center ml-auto space-x-3 lg:space-x-5 rtl:space-x-reverse">
                
                {/* Status Indicator (Mobile hidden) */}
                <div className="hidden lg:flex items-center bg-emerald-50/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-700 text-xs font-bold tracking-wide uppercase">{t(`nav.${user?.role}` as any) || user?.role}</span>
                </div>

                <div className="h-8 w-px bg-gray-200 hidden lg:block"></div>

                {/* Language Switcher */}
                 <div className="relative" ref={langDropdownRef}>
                    <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50 hover:text-gray-900 text-gray-500 transition-all focus:outline-none active:scale-95">
                        <span className="text-xl leading-none">{languages[i18n.language]?.flag || '🇬🇧'}</span>
                    </button>
                    {isLangOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up z-50 ring-1 ring-black/5">
                             {Object.keys(languages).map((lng) => (
                                <button 
                                    key={lng} 
                                    onClick={() => changeLanguage(lng)} 
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50/80 transition-colors ${i18n.language === lng ? 'bg-primary-50/50 text-primary-700 font-medium' : 'text-gray-600'}`}
                                >
                                    <span className="text-lg">{languages[lng].flag}</span>
                                    <span>{languages[lng].name}</span>
                                    {i18n.language === lng && <span className="ml-auto text-primary-600 text-xs font-bold">✓</span>}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Notifications */}
                 <div className="relative" ref={notificationsRef}>
                    <button onClick={() => setIsNotificationsOpen(o => !o)} className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all focus:outline-none active:scale-95 ${isNotificationsOpen ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                        <IconBell className="w-[1.35rem] h-[1.35rem]"/>
                         {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 ring-2 ring-white"></span>
                            </span>
                        )}
                    </button>
                    {isNotificationsOpen && (
                        <NotificationDropdown 
                            notifications={notifications}
                            onClose={() => setIsNotificationsOpen(false)}
                            onMarkAllRead={handleMarkAllRead}
                            onMarkAsRead={handleMarkAsRead}
                            setActivePage={setActivePage}
                        />
                    )}
                </div>

                {/* Profile Trigger (Desktop) */}
                {user && (
                    <div onClick={() => setActivePage('Profile')} className="hidden md:flex items-center space-x-3 cursor-pointer group pl-2">
                         <div className="relative">
                            <img className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shadow-sm group-hover:ring-primary-200 transition-all" src={user.avatar} alt={user.name} />
                            <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
