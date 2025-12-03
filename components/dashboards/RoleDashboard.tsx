
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardConfig, Page, Product } from '../../types.ts';
import { useAuth } from '../../hooks/useAuth.ts';
import { VisibleProducts } from './VisibleProducts.tsx';
import { ProductModal } from '../ProductModal.tsx';
import { IconLeaf } from '../../constants.tsx';
import ESGScore from '../shared/ESGScore.tsx';

interface RoleDashboardProps {
  config: DashboardConfig;
  setActivePage: (page: Page) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Generic Trend Component for standard widgets
const TrendIndicator: React.FC<{ trend: number }> = ({ trend }) => {
    const isPositive = trend >= 0;
    return (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
    );
};

// Standard Widget for non-exporter roles
const WidgetCard: React.FC<{ title: string; icon: React.ReactNode; description: string; trend?: number }> = ({ title, icon, description, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 border border-gray-100 flex flex-col h-full justify-between group hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-primary-500/30">
                {icon}
            </div>
            {trend !== undefined && <TrendIndicator trend={trend} />}
        </div>
        <div>
            <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
            <p className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">{description}</p>
        </div>
    </div>
);

// Premium Widget for Exporters (Wallet Style)
const ExporterWidgetCard: React.FC<{ title: string; icon: React.ReactNode; description: string; trend: number; gradient: string }> = ({ title, icon, description, trend, gradient }) => (
    <div className={`p-6 rounded-[1.5rem] shadow-xl text-white bg-gradient-to-br ${gradient} relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group flex flex-col justify-between h-full min-h-[160px]`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/15 transition-colors"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black/10 blur-xl"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm text-white shadow-inner border border-white/10">
                    {icon}
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-sm ${trend >= 0 ? 'bg-emerald-400/20 text-emerald-50' : 'bg-rose-400/20 text-rose-50'}`}>
                        {trend >= 0 ? '↗' : '↘'} {Math.abs(trend)}%
                    </div>
                )}
            </div>
            
            <div className="mt-4">
                <h3 className="text-white/80 font-medium text-sm mb-1 tracking-wide uppercase opacity-90">{title}</h3>
                <p className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
                    {description}
                </p>
            </div>
        </div>
    </div>
);

const QuickActionCard: React.FC<{ title: string; icon: React.ReactNode; onClick: () => void; }> = ({ title, icon, onClick }) => (
    <button 
        onClick={onClick} 
        className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-primary-100 transition-all duration-300 w-full group h-full"
    >
        <div className="p-4 rounded-full bg-primary-50 text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm">
            {icon}
        </div>
        <span className="text-sm font-bold text-gray-700 group-hover:text-primary-700 transition-colors text-center">{title}</span>
    </button>
);


const RoleDashboard: React.FC<RoleDashboardProps> = ({ config, setActivePage, products, setProducts }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  
  const handleQuickActionClick = (page: Page) => {
    setActivePage(page);
  };

  if (!user) return null;
  
  const handleAddNewProduct = () => {
    setProductModalOpen(true);
  };

  const handleSaveProduct = (productToSave: Product) => {
    setProducts(prev => [...prev, productToSave]);
    setProductModalOpen(false);
  };

  const visibleProducts = products.filter(p => p.exporterId === user.id && p.status === 'Active');

  // Mock gradients for exporter dashboard to match wallet style
  const exporterGradients = [
      "from-blue-600 via-blue-700 to-indigo-800",
      "from-violet-600 via-purple-600 to-fuchsia-800",
      "from-emerald-500 via-teal-600 to-cyan-700",
      "from-amber-500 via-orange-600 to-red-700"
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {isProductModalOpen && user.role === 'Exporter' && (
          <ProductModal 
            product={null}
            onClose={() => setProductModalOpen(false)}
            onSave={handleSaveProduct}
            exporterId={user.id}
          />
      )}
      
      <section>
        <div className="flex items-center justify-between mb-8">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t(`dashboard.${user.role.toLowerCase()}.title` as any) || t('dashboard.title')}</h2>
                <p className="text-gray-500 mt-1">Overview of your activities and performance.</p>
             </div>
             {/* Date Range Filter Mock */}
             <div className="hidden md:flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">7D</button>
                <button className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-900 rounded-md shadow-sm">30D</button>
                <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">3M</button>
             </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.widgets.map((widget, index) => {
            // Mock trend data based on index for visualization
            const trends = [12.5, -2.4, 8.1, 0]; 
            
            if (user.role === 'Exporter') {
                return (
                    <ExporterWidgetCard
                        key={index}
                        title={t(widget.title)}
                        icon={<widget.icon className="w-6 h-6"/>}
                        description={t(widget.description, widget.values || {})}
                        trend={trends[index]}
                        gradient={exporterGradients[index % exporterGradients.length]}
                    />
                );
            }

            return (
                <WidgetCard 
                    key={index} 
                    title={t(widget.title)} 
                    icon={<widget.icon className="w-6 h-6"/>} 
                    description={t(widget.description, widget.values || {})}
                    trend={undefined}
                />
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-6 flex items-center gap-2">
            {t('dashboard.quickActions')}
            <span className="text-gray-400 text-sm font-normal ml-2 hidden sm:inline-block"> // Frequently used tools</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {config.quickActions.map((action, index) => (
                <QuickActionCard 
                    key={index} 
                    title={t(action.title)} 
                    icon={<action.icon className="w-7 h-7"/>} 
                    onClick={() => handleQuickActionClick(action.page)} 
                />
            ))}
        </div>
      </section>

      {/* ESG Score Section for Exporters */}
      {user.role === 'Exporter' && user.esgMetrics && (
          <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100 p-6 sm:p-8 relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2.5 bg-white/60 text-emerald-600 rounded-xl shadow-sm backdrop-blur-sm">
                      <IconLeaf className="w-6 h-6" />
                  </div>
                  <div>
                      <h2 className="text-xl font-bold text-emerald-900 tracking-tight">{t('dashboard.exporter.widgets.esgStatus.title')}</h2>
                      <p className="text-emerald-700 text-xs font-medium uppercase tracking-wide">{t('wallet.passport.esgTitle')}</p>
                  </div>
              </div>
              
              <div className="relative z-10">
                <ESGScore esgMetrics={user.esgMetrics} />
              </div>

              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl"></div>
          </section>
      )}

       {user.role === 'Exporter' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-1">
              <div className="p-5 sm:p-8">
                <VisibleProducts 
                    products={visibleProducts}
                    setActivePage={setActivePage}
                    setProducts={setProducts}
                    onAddNewProduct={handleAddNewProduct}
                />
              </div>
          </div>
      )}
    </div>
  );
};

export default RoleDashboard;
