
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth.ts';
import RoleDashboard from './dashboards/RoleDashboard.tsx';
import { DASHBOARD_CONFIGS } from '../constants.tsx';
import { Page, Product, Order, Supplier, EscrowAgreement } from '../types.ts';
import { IconLogout } from '../constants.tsx';

const Dashboard: React.FC<{
    setActivePage: (page: Page) => void;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    orders: Order[];
    suppliers: Supplier[];
    escrowAgreements: EscrowAgreement[];
}> = ({ setActivePage, products, setProducts, orders, suppliers, escrowAgreements }) => {
    const { user, logout } = useAuth();
    const { t } = useTranslation();

    const dynamicDashboardConfig = useMemo(() => {
        if (!user) return null;

        const staticConfig = DASHBOARD_CONFIGS[user.role];

        if (user.role === 'Buyer' || user.role === 'GuestBuyer') {
            const activeOrdersCount = orders.filter(o => o.buyerId === user.id && o.status !== 'Delivered').length;
            const pendingInspectionsCount = orders.filter(o => o.buyerId === user.id && o.qualityStatus === 'Pending').length;
            const trustedSuppliersCount = suppliers.filter(s => s.status === 'Preferred').length; // This is a simplified logic for demo
            const inEscrowAmount = escrowAgreements.filter(e => e.buyerId === user.id && (e.status === 'Funded' || e.status === 'Awaiting Funds')).reduce((sum, e) => sum + e.amount, 0);

            const dynamicWidgets = staticConfig.widgets.map(widget => {
                if (widget.title === 'dashboard.buyer.widgets.activeOrders.title') {
                    return { ...widget, values: { count: activeOrdersCount } };
                }
                if (widget.title === 'dashboard.buyer.widgets.pendingInspections.title') {
                    return { ...widget, values: { count: pendingInspectionsCount } };
                }
                if (widget.title === 'dashboard.buyer.widgets.trustedSuppliers.title') {
                    return { ...widget, values: { count: trustedSuppliersCount } };
                }
                if (widget.title === 'dashboard.buyer.widgets.inEscrow.title') {
                    return { ...widget, values: { amount: `$${inEscrowAmount.toLocaleString()}` } };
                }
                return widget;
            });
            return { ...staticConfig, widgets: dynamicWidgets };
        }
        
        if (user.role === 'Exporter' || user.role === 'GuestExporter') {
             const activeListingsCount = products.filter(p => p.exporterId === user.id && p.status === 'Active').length;
             const pendingOrdersCount = orders.filter(o => o.exporterId === user.id && o.status === 'Pending').length;
             const monthlyRevenue = orders.filter(o => o.exporterId === user.id && o.status === 'Delivered').reduce((sum, o) => sum + o.amount, 0);
             const esgScore = user.esgMetrics?.score || 0;

             const dynamicWidgets = staticConfig.widgets.map(widget => {
                if (widget.title === 'dashboard.exporter.widgets.activeListings.title') {
                    return { ...widget, values: { count: activeListingsCount } };
                }
                if (widget.title === 'dashboard.exporter.widgets.pendingOrders.title') {
                    return { ...widget, values: { count: pendingOrdersCount } };
                }
                if (widget.title === 'dashboard.exporter.widgets.monthlyRevenue.title') {
                    return { ...widget, values: { amount: `$${monthlyRevenue.toLocaleString()}` } };
                }
                if (widget.title === 'dashboard.exporter.widgets.esgStatus.title') {
                    return { ...widget, values: { score: esgScore } };
                }
                return widget;
             });
             return { ...staticConfig, widgets: dynamicWidgets };
        }

        return staticConfig;
    }, [user, orders, suppliers, escrowAgreements, products]);


    if (!user || !dynamicDashboardConfig) {
        return null;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('dashboard.welcome', { name: user.name })}</h1>
                    <p className="text-gray-500 mt-1">{t('dashboard.loggedInAs')} <span className="font-semibold text-gray-700">{t(`nav.${user.role}` as any)}</span></p>
                </div>
                <button 
                    onClick={logout} 
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors shadow-sm"
                >
                    <IconLogout className="w-5 h-5"/>
                    <span className="hidden sm:inline">{t('header.logout')}</span>
                </button>
            </div>
            
            <RoleDashboard
              config={dynamicDashboardConfig}
              setActivePage={setActivePage}
              products={products}
              setProducts={setProducts}
            />
        </div>
    );
};

export default Dashboard;
