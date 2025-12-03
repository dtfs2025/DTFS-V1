
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IconChevronDown, IconX, IconTrendingUp, IconShieldCheck, IconAlertTriangle, IconBuildingBank, IconCheckCircle, IconLeaf } from '../constants.tsx';
import { WalletTab, EscrowAgreement, Order, EscrowStatus, Notification, ESGMetrics } from '../types.ts';
import { useAuth } from '../hooks/useAuth.ts';
import { USERS } from '../constants.tsx';
import ESGScore from './shared/ESGScore.tsx';

interface WalletProps {
    escrowAgreements: EscrowAgreement[];
    orders: Order[];
    onCreateEscrow: (order: Order) => void;
    onUpdateEscrowStatus: (escrowId: string, status: EscrowStatus) => void;
    setToasts: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const ConnectWalletModal: React.FC<{ onClose: () => void; onConnect: (walletName: string) => void; wallets: any[] }> = ({ onClose, onConnect, wallets }) => {
    const { t } = useTranslation();
    return (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 animate-fade-in p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-fade-in-up shadow-2xl border border-white/20">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">{t('wallet.connectWallet')}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors"><IconX className="w-6 h-6" /></button>
                </div>
                <div className="space-y-3">
                    {wallets.map(wallet => (
                        <button key={wallet.name} onClick={() => onConnect(wallet.name)} className="w-full flex items-center p-4 text-left rounded-xl hover:bg-gray-50 border border-gray-100 transition-all group">
                            <img src={wallet.img} alt={t(wallet.name)} className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform"/>
                            <span className="font-semibold text-gray-700 group-hover:text-primary-600">{t(wallet.name)}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ title: string; value: string; subtext: React.ReactNode; gradient: string }> = ({ title, value, subtext, gradient }) => (
    <div className={`p-8 rounded-[1.5rem] shadow-xl text-white bg-gradient-to-br ${gradient} relative overflow-hidden transition-all hover:scale-[1.01] duration-300 group`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-white/10 blur-3xl group-hover:bg-white/15 transition-colors"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 rounded-full bg-black/10 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
                <h3 className="font-medium text-white/80 text-sm tracking-wide uppercase">{title}</h3>
                <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                    <IconBuildingBank className="w-5 h-5 text-white" />
                </div>
            </div>
            <div className="mt-6">
                <p className="text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm">{value}</p>
                <div className="mt-3 flex items-center text-sm font-medium text-white/90 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    {subtext}
                </div>
            </div>
        </div>
    </div>
);

const WalletButton: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'secondary'; onClick?: () => void }> = ({ children, variant = 'secondary', onClick }) => (
    <button 
        onClick={onClick} 
        className={`flex-1 flex items-center justify-center gap-2 font-bold px-6 py-4 rounded-2xl shadow-sm transition-all duration-200 text-sm tracking-wide ${
            variant === 'primary' 
            ? 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5' 
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md'
        }`}
    >
        {children}
    </button>
);

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void, icon?: React.ReactNode }> = ({ label, active, onClick, icon }) => (
    <button onClick={onClick} className={`relative flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 shrink-0 ${active ? 'text-primary-700 bg-primary-50 ring-1 ring-primary-200 shadow-sm' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
        {icon}
        {label}
    </button>
);

const Wallet: React.FC<WalletProps> = (props) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<WalletTab>('Overview');
    
    const TABS: WalletTab[] = ['Overview', 'Trade Passport', 'Escrow', 'Transactions', 'Exchange', 'Wallets', 'PAPSS', 'Settings'];
    const TABS_TRANSLATION_KEYS: Record<WalletTab, string> = {
        Overview: 'wallet.overview',
        Transactions: 'wallet.transactions',
        Exchange: 'wallet.exchange',
        Wallets: 'wallet.wallets.title',
        PAPSS: 'wallet.papss.title',
        Escrow: 'wallet.escrow.title',
        'Trade Passport': 'wallet.tabs.tradePassport',
        Settings: 'wallet.settings',
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'Trade Passport':
                return (
                    <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 animate-fade-in">
                        {user?.esgMetrics ? (
                            <>
                                <h3 className="text-xl font-bold text-gray-800 mb-6">{t('wallet.passport.esgTitle')}</h3>
                                <ESGScore esgMetrics={user.esgMetrics} />
                            </>
                        ) : (
                            <div className="p-6 text-center text-gray-500">{t('wallet.passport.noData')}</div>
                        )}
                    </div>
                );
            case 'Overview':
                 return <div className="p-16 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 animate-fade-in flex-col gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center"><IconBuildingBank className="w-8 h-8 text-gray-300" /></div>
                        <p>{t(TABS_TRANSLATION_KEYS[activeTab])} Content Coming Soon</p>
                    </div>
            default:
                return <div className="p-16 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 animate-fade-in flex-col gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center"><IconBuildingBank className="w-8 h-8 text-gray-300" /></div>
                        <p>{t(TABS_TRANSLATION_KEYS[activeTab])} Content Coming Soon</p>
                    </div>
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-10 animate-fade-in">
            <div>
                <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3 py-1 rounded-full border border-primary-100 ring-1 ring-primary-500/10 shadow-sm">{t('nav.Wallet')}</span>
                <h1 className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">{t('wallet.pageTitle')}</h1>
                <p className="text-gray-500 mt-2 max-w-2xl text-lg">{t('wallet.pageDescription')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <StatCard 
                    title={t('wallet.totalBalance')} 
                    value="$49,397.75" 
                    subtext={<span className="flex items-center gap-1"><span>+2.5%</span> <span className="opacity-70">this month</span></span>} 
                    gradient="from-blue-600 via-blue-700 to-indigo-800" 
                />
                <StatCard 
                    title={t('wallet.inEscrow')} 
                    value="$16,000.00" 
                    subtext={t('wallet.activeTrades', { count: 1 })} 
                    gradient="from-violet-600 via-purple-600 to-fuchsia-800" 
                />
                <StatCard 
                    title={t('wallet.monthlyProfit')} 
                    value="$1,250.00" 
                    subtext={<span className="flex items-center gap-1"><IconTrendingUp className="w-4 h-4"/> +10.2%</span>} 
                    gradient="from-emerald-500 via-teal-600 to-cyan-700" 
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-1">
                <WalletButton onClick={() => {}} variant="primary">
                    {t('wallet.deposit')}
                </WalletButton>
                <WalletButton onClick={() => {}}>
                    {t('wallet.send')}
                </WalletButton>
                <WalletButton>
                    {t('wallet.swap')}
                </WalletButton>
                 <WalletButton>
                    {t('wallet.bridge')}
                </WalletButton>
            </div>
            
            <div className="w-full overflow-x-auto pb-2 pt-2">
                <div className="flex items-center gap-3 min-w-max">
                    {TABS.map(tab => (
                        <TabButton key={tab} label={t(TABS_TRANSLATION_KEYS[tab])} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
                    ))}
                </div>
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
    );
};
export default Wallet;
