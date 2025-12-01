
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconCheckCircle, IconLogout, IconAIAssistant, IconLeaf } from '../constants.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import { Badge } from './TradeBadges.tsx';
import { Order, Product } from '../types.ts';
import { generateProfileSummary } from '../services/geminiService.ts';
import ESGScore from './shared/ESGScore.tsx';

interface ProfileProps {
    orders: Order[];
    products: Product[];
}

const Profile: React.FC<ProfileProps> = ({ orders, products }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const userStats = useMemo(() => {
    if (!user) return { totalProducts: 0, totalOrders: 0 };
    if (user.role === 'Exporter') {
        return {
            totalProducts: products.filter(p => p.exporterId === user.id).length,
            totalOrders: orders.filter(o => o.exporterId === user.id && o.status === 'Delivered').length,
        };
    }
    if (user.role === 'Buyer') {
         return {
            totalProducts: 0, // Buyers don't have products
            totalOrders: orders.filter(o => o.buyerId === user.id && o.status === 'Delivered').length,
        };
    }
    return { totalProducts: 0, totalOrders: 0 };
  }, [user, products, orders]);

  const earnedBadges = useMemo(() => {
      const badges = [];
      if (!user) return [];
      
      // A mock logic for earning badges
      badges.push({ key: 'verified', label: t('profile.badges.verified'), color: 'teal', icon: <IconCheckCircle className="w-4 h-4" />});

      if (user.role === 'Exporter') {
          if(userStats.totalOrders > 0) badges.push({ key: 'topSeller', label: t('profile.badges.topSeller'), color: 'indigo' });
          if(userStats.totalProducts > 2) badges.push({ key: 'crossBorder', label: t('profile.badges.crossBorder'), color: 'purple' });
      }
      
      if (user.role === 'Buyer' && userStats.totalOrders > 1) {
          badges.push({ key: 'compliant', label: t('profile.badges.compliant'), color: 'orange' });
      }

      badges.push({ key: 'financeApproved', label: t('profile.badges.financeApproved'), color: 'blue' });

      return badges;
  }, [user, userStats, t]);

  const handleGenerateSummary = async () => {
      if (!user) return;
      setIsGenerating(true);
      setSummary('');
      try {
          const badgeNames = earnedBadges.map(b => b.label);
          const result = await generateProfileSummary(user, { ...userStats, badges: badgeNames });
          setSummary(result);
      } catch (error) {
          console.error("Failed to generate profile summary:", error);
          setSummary(t('profile.summaryError'));
      } finally {
          setIsGenerating(false);
      }
  };

  if(!user) return null;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
              <img className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" src={user.avatar} alt={user.name} />
              <div>
                  <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
                  <p className="text-slate-500 mt-1">{t('profile.role')} <span className="font-semibold text-slate-700">{t(`nav.${user.role}` as any) || user.role}</span></p>
              </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors">
              <IconLogout className="w-5 h-5"/>
              {t('header.logout')}
          </button>
      </div>

      {/* ESG Score Section */}
      {user.esgMetrics && (
        <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-sm border border-emerald-100 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-white/80 text-emerald-600 rounded-xl shadow-sm backdrop-blur-md">
                        <IconLeaf className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-emerald-900 tracking-tight">{t('dashboard.exporter.widgets.esgStatus.title')}</h2>
                        <p className="text-emerald-700 text-xs font-medium uppercase tracking-wide">{t('wallet.passport.esgTitle')}</p>
                    </div>
                </div>
                <ESGScore esgMetrics={user.esgMetrics} />
            </div>
        </div>
      )}

      {/* Trade Badges Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-slate-800">{t('profile.badgesTitle')}</h2>
        <p className="text-slate-500 mt-1">{t('profile.badgesDescription')}</p>
        {earnedBadges.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-4">
                {earnedBadges.map(badge => (
                     <Badge key={badge.key} label={badge.label} color={badge.color as any} icon={badge.icon} />
                ))}
            </div>
        ) : (
            <p className="mt-4 text-slate-500 italic">{t('profile.noBadges')}</p>
        )}
      </div>

      {/* AI Summary Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-xl font-bold text-slate-800">{t('profile.summaryTitle')}</h2>
                <p className="text-slate-500 mt-1">{t('profile.summaryDescription')}</p>
            </div>
            <button onClick={handleGenerateSummary} disabled={isGenerating} className="flex items-center gap-2 font-semibold bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg disabled:bg-primary-300 self-start sm:self-center shrink-0 transition-colors shadow-sm">
                <IconAIAssistant className="w-5 h-5"/>
                {isGenerating ? t('common.generating') : t('profile.generateSummary')}
            </button>
        </div>
        {(isGenerating || summary) && (
            <div className="mt-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                {isGenerating ? (
                     <div className="space-y-3 py-1">
                        <div className="h-4 bg-slate-200 rounded-full w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-slate-200 rounded-full w-4/6 animate-pulse [animation-delay:0.2s]"></div>
                    </div>
                ) : (
                    <p className="text-slate-700 italic text-lg leading-relaxed">"{summary}"</p>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
