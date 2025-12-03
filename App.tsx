import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import Chat from './components/Chat.tsx';
import DocumentWizard from './components/DocumentWizard.tsx';
import TradeFinance from './components/TradeFinance.tsx';
import Marketplace from './components/Marketplace.tsx';
import Training from './components/Training.tsx';
import Wallet from './components/Wallet.tsx';
import ProductManagement from './components/ProductManagement.tsx';
import OrderManagement from './components/OrderManagement.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import { Page, Product, Order, Supplier, Contract, Shipment, Vehicle, Driver, LogisticsDocument, Quote, InsuranceClaim, CustomsFiling, CommunicationMessage, Client, Commission, User, Dispute, ContentItem, SystemSettings, SupportTicket, UserRole, EscrowAgreement, EscrowStatus, Notification } from './types.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { useAuth } from './hooks/useAuth.ts';
import AIProductRecommendation from './components/ProductDiscovery.tsx';
import SupplierManagement from './components/SupplierManagement.tsx';
import OrderPlacement from './components/OrderPlacement.tsx';
import QualityControl from './components/QualityControl.tsx';
import RequestInspection from './components/RequestInspection.tsx';
import ContractManagement from './components/ContractManagement.tsx';
import ShipmentManagement from './components/ShipmentManagement.tsx';
import RoutePlanning from './components/RoutePlanning.tsx';
import FleetManagement from './components/FleetManagement.tsx';
import LogisticsDocumentation from './components/LogisticsDocumentation.tsx';
import Communication from './components/Communication.tsx';
import PricingAndQuotes from './components/PricingAndQuotes.tsx';
import InsuranceManagement from './components/InsuranceManagement.tsx';
import CustomsClearance from './components/CustomsClearance.tsx';
import ClientManagement from './components/ClientManagement.tsx';
import CommissionTracking from './components/CommissionTracking.tsx';
import LocalSupport from './components/LocalSupport.tsx';
import MarketDevelopment from './components/MarketDevelopment.tsx';
import BasicAnalytics from './components/BasicAnalytics.tsx';
import UserOnboarding from './components/UserOnboarding.tsx';
import UserManagement from './components/UserManagement.tsx';
import RoleManagement from './components/RoleManagement.tsx';
import SystemConfiguration from './components/SystemConfiguration.tsx';
import ContentModeration from './components/ContentModeration.tsx';
import DisputeResolution from './components/DisputeResolution.tsx';
import FinancialOversight from './components/FinancialOversight.tsx';
import AnalyticsAccess from './components/AnalyticsAccess.tsx';
import SecurityManagement from './components/SecurityManagement.tsx';
import ComplianceMonitoring from './components/ComplianceMonitoring.tsx';
import SystemMaintenance from './components/SystemMaintenance.tsx';
import Profile from './components/Profile.tsx';
import ESG from './components/ESG.tsx';
import { 
    PRODUCTS, ORDERS, SUPPLIERS, CONTRACTS, 
    SHIPMENTS, VEHICLES, DRIVERS, LOGISTICS_DOCUMENTS, 
    QUOTES, INSURANCE_CLAIMS, CUSTOMS_FILINGS, COMMUNICATIONS,
    CLIENTS, COMMISSIONS, DISPUTES, CONTENT_QUEUE, IconSystemMaintenance,
    ESCROW_AGREEMENTS, NOTIFICATIONS, DYNAMIC_NOTIFICATIONS,
    PAGE_PERMISSIONS
} from './constants.tsx';
import { useTranslation } from 'react-i18next';
import BottomNav from './components/BottomNav.tsx';
import ToastContainer from './components/ToastContainer.tsx';
import InstallPrompt from './components/InstallPrompt.tsx';


const initialSystemSettings: SystemSettings = {
    registrationsEnabled: true,
    emailVerificationRequired: true,
    strongPasswordsEnforced: false,
    papssEnabled: true,
    maintenanceMode: false,
    maintenanceMessage: 'The platform is currently undergoing scheduled maintenance. We apologize for any inconvenience and will be back online shortly.',
};

const AppContent: React.FC = () => {
    const { isAuthenticated, user, users: allUsers, hasPermission, completeKyc } = useAuth();
    const { t, i18n } = useTranslation();
    const [activePage, _setActivePage] = useState<Page>('Dashboard');
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Hide splash screen after 3.5 seconds
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.dir(i18n.language);
    }, [i18n, i18n.language]);

    // Enhanced RBAC Security Check
    const setActivePage = (page: Page) => {
        const requiredPermission = PAGE_PERMISSIONS[page];
        
        // If the page requires a specific permission and the user doesn't have it, deny access.
        if (requiredPermission && !hasPermission(requiredPermission)) {
            console.warn(`Access Denied: User role '${user?.role}' missing permission '${requiredPermission}' for page '${page}'.`);
            
            // Optional: You could show a toast here using the toast system
            // For now, we just redirect to dashboard or do nothing
            // _setActivePage('Dashboard'); 
            return;
        }
        
        _setActivePage(page);
    };
    
    useEffect(() => {
        if (isAuthenticated) {
            _setActivePage('Dashboard');
        }
    }, [isAuthenticated]);

    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [orders, setOrders] = useState<Order[]>(ORDERS);
    const [suppliers, setSuppliers] = useState<Supplier[]>(SUPPLIERS);
    const [contracts, setContracts] = useState<Contract[]>(CONTRACTS);
    const [shipments, setShipments] = useState<Shipment[]>(SHIPMENTS);
    const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES);
    const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);
    const [logisticsDocuments, setLogisticsDocuments] = useState<LogisticsDocument[]>(LOGISTICS_DOCUMENTS);
    const [quotes, setQuotes] = useState<Quote[]>(QUOTES);
    const [insuranceClaims, setInsuranceClaims] = useState<InsuranceClaim[]>(INSURANCE_CLAIMS);
    const [customsFilings, setCustomsFilings] = useState<CustomsFiling[]>(CUSTOMS_FILINGS);
    const [communications, setCommunications] = useState<CommunicationMessage[]>(COMMUNICATIONS);
    const [clients, setClients] = useState<Client[]>(CLIENTS);
    const [commissions, setCommissions] = useState<Commission[]>(COMMISSIONS);
    const [disputes, setDisputes] = useState<Dispute[]>(DISPUTES);
    const [contentQueue, setContentQueue] = useState<ContentItem[]>(CONTENT_QUEUE);
    const [systemSettings, setSystemSettings] = useState<SystemSettings>(initialSystemSettings);
    const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
    const [escrowAgreements, setEscrowAgreements] = useState<EscrowAgreement[]>(ESCROW_AGREEMENTS);
    const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
    const [toasts, setToasts] = useState<Notification[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isAuthenticated && notifications.length < 10) { // Limit notifications and only show when logged in
                const randomNotification = DYNAMIC_NOTIFICATIONS[Math.floor(Math.random() * DYNAMIC_NOTIFICATIONS.length)];
                const newNotification: Notification = {
                    ...randomNotification,
                    id: `notif-${Date.now()}`,
                    timestamp: t('common.justNow'),
                    isRead: false,
                    title: t(randomNotification.title),
                    description: t(randomNotification.description)
                };
                setNotifications(prev => [newNotification, ...prev]);
                setToasts(prev => [...prev, newNotification]);
            }
        }, 30000); // every 30 seconds
        return () => clearInterval(interval);
    }, [notifications, t, isAuthenticated]);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const markNotificationAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    if (showSplash) {
        return <SplashScreen />;
    }

    if (!isAuthenticated) {
        return (
            <>
                <LoginScreen />
                <InstallPrompt />
            </>
        );
    }

    if (user && !user.kycCompleted) {
        return <UserOnboarding onComplete={completeKyc} />;
    }

    if (systemSettings.maintenanceMode && user?.role !== 'Admin') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
                <IconSystemMaintenance className="w-24 h-24 text-primary-500 mb-4" />
                <h1 className="text-3xl font-bold text-gray-800">{t('maintenance.title')}</h1>
                <p className="text-gray-600 mt-2 max-w-md">{systemSettings.maintenanceMessage}</p>
            </div>
        );
    }

    const renderPage = () => {
        switch (activePage) {
            case 'Dashboard':
                return <Dashboard setActivePage={setActivePage} products={products} setProducts={setProducts} orders={orders} suppliers={suppliers} escrowAgreements={escrowAgreements} />;
            case 'Chat':
                return <Chat />;
            case 'Document Wizard':
                return <DocumentWizard />;
            case 'Request Finance':
                return <TradeFinance />;
            case 'Marketplace':
                return <Marketplace products={products} />;
            case 'Training':
                return <Training />;
            case 'Wallet':
                return <Wallet escrowAgreements={escrowAgreements} orders={orders} onCreateEscrow={() => {}} onUpdateEscrowStatus={() => {}} setToasts={setToasts} />;
            case 'Profile':
                return <Profile orders={orders} products={products} />;
            case 'ESG':
                return <ESG setActivePage={setActivePage} />;
            case 'Product Management':
                return <ProductManagement products={products} setProducts={setProducts} setToasts={setToasts} />;
            case 'Order Management':
                return <OrderManagement orders={orders} setOrders={setOrders} setToasts={setToasts} />;
            case 'AI Product Recommendation':
                return <AIProductRecommendation products={products} setActivePage={setActivePage} />;
            case 'Supplier Management':
                return <SupplierManagement suppliers={suppliers} onUpdateStatus={(id, status) => setSuppliers(prev => prev.map(s => s.id === id ? {...s, status} : s))} setActivePage={setActivePage}/>
            case 'Order Placement':
                return <OrderPlacement products={products} orders={orders} setOrders={setOrders} />;
            case 'Quality Control':
                return <QualityControl orders={orders} setActivePage={setActivePage} />;
            case 'Request Inspection':
                return <RequestInspection orders={orders} setOrders={setOrders} />;
            case 'Contract Management':
                return <ContractManagement contracts={contracts} />;
            case 'Shipment Management':
                return <ShipmentManagement shipments={shipments} setShipments={setShipments} orders={orders} />;
            case 'Route Planning':
                return <RoutePlanning shipments={shipments} setShipments={setShipments} vehicles={vehicles} drivers={drivers} />;
            case 'Fleet Management':
                return <FleetManagement vehicles={vehicles} drivers={drivers} 
                            onSaveVehicle={(v) => setVehicles(p => p.find(pv => pv.id === v.id) ? p.map(pv => pv.id === v.id ? v : pv) : [...p, v])}
                            onDeleteVehicle={(id) => setVehicles(p => p.filter(v => v.id !== id))}
                            onSaveDriver={(d) => setDrivers(p => p.find(pd => pd.id === d.id) ? p.map(pd => pd.id === d.id ? d : pd) : [...p, d])}
                            onDeleteDriver={(id) => setDrivers(p => p.filter(d => d.id !== id))}
                        />;
            case 'Logistics Documentation':
                return <LogisticsDocumentation documents={logisticsDocuments} setDocuments={setLogisticsDocuments} shipments={shipments} />;
            case 'Communication':
                return <Communication shipments={shipments} messages={communications} setMessages={setCommunications} />;
            case 'Pricing & Quotes':
                return <PricingAndQuotes quotes={quotes} setQuotes={setQuotes} />;
            case 'Insurance Management':
                return <InsuranceManagement claims={insuranceClaims} setClaims={setInsuranceClaims} shipments={shipments} />;
            case 'Customs Clearance':
                return <CustomsClearance filings={customsFilings} setCustomsFilings={setCustomsFilings} shipments={shipments} />;
            case 'Client Management':
                return <ClientManagement clients={clients.filter(c => c.agentId === user?.id)} agentId={user!.id} onSaveClient={(c) => setClients(p => p.find(pc => pc.id === c.id) ? p.map(pc => pc.id === c.id ? c : pc) : [...p, c])} />;
            case 'Commission Tracking':
                return <CommissionTracking commissions={commissions.filter(c => c.agentId === user?.id)} />;
            case 'User Onboarding':
                return <UserOnboarding onComplete={() => setActivePage('Client Management')} />; // Simplified
            case 'Local Support':
                return <LocalSupport 
                            agentId={user!.id}
                            tickets={supportTickets.filter(t => t.agentId === user?.id)}
                            clients={clients.filter(c => c.agentId === user?.id)}
                            onCreateTicket={(ticket) => setSupportTickets(prev => [...prev, { ...ticket, id: `TKT-${Date.now()}`, dateCreated: new Date().toISOString().split('T')[0], conversation: [] }])}
                        />;
            case 'Market Development':
                return <MarketDevelopment />;
            case 'Basic Analytics':
                return <BasicAnalytics />;
            case 'User Management':
                return <UserManagement 
                            users={allUsers}
                            onUpdateUser={(id, role) => { console.log(`Update user ${id} to role ${role}`); }}
                            onDeleteUser={(id) => { console.log(`Delete user ${id}`); }}
                        />;
            case 'Role Management':
                return <RoleManagement />;
            case 'System Configuration':
                return <SystemConfiguration settings={systemSettings} onUpdateSettings={(key, value) => setSystemSettings(prev => ({...prev, [key]: value}))} />;
            case 'Content Moderation':
                return <ContentModeration queue={contentQueue} onAction={(id) => setContentQueue(prev => prev.filter(item => item.id !== id))} />;
            case 'Dispute Resolution':
                return <DisputeResolution disputes={disputes} orders={orders} onUpdateStatus={(id, status) => setDisputes(prev => prev.map(d => d.id === id ? {...d, status} : d))} />;
            case 'Financial Oversight':
                return <FinancialOversight />;
            case 'Analytics Access':
                return <AnalyticsAccess />;
            case 'Security Management':
                return <SecurityManagement />;
            case 'Compliance Monitoring':
                return <ComplianceMonitoring />;
            case 'System Maintenance':
                return <SystemMaintenance settings={systemSettings} onUpdateSettings={(key, value) => setSystemSettings(prev => ({...prev, [key]: value}))} />;
            default:
                return <Dashboard setActivePage={setActivePage} products={products} setProducts={setProducts} orders={orders} suppliers={suppliers} escrowAgreements={escrowAgreements} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    notifications={notifications}
                    setNotifications={setNotifications}
                    setActivePage={setActivePage}
                    products={products}
                    orders={orders}
                    shipments={shipments}
                    users={allUsers}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto pb-20 md:pb-0">
                    {renderPage()}
                </main>
            </div>
            <AIAssistant />
            <InstallPrompt />
            <BottomNav activePage={activePage} setActivePage={setActivePage} />
            <ToastContainer 
                toasts={toasts}
                removeToast={removeToast}
                setActivePage={setActivePage}
                markNotificationAsRead={markNotificationAsRead}
            />
        </div>
    );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;