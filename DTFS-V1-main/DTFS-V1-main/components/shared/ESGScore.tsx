import React from 'react';
import { useTranslation } from 'react-i18next';
import { ESGMetrics } from '../../types.ts';

interface ESGScoreProps {
    esgMetrics: ESGMetrics;
    className?: string;
}

const ESGScore: React.FC<ESGScoreProps> = ({ esgMetrics, className = "" }) => {
    const { t } = useTranslation();
    const score = esgMetrics.score;
    const circumference = 2 * Math.PI * 45; // radius
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className={`flex flex-col md:flex-row items-center gap-8 ${className}`}>
            <div className="relative w-40 h-40 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        className="text-gray-100"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                    <circle
                        className="text-emerald-500 transition-all duration-1000 ease-out"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-gray-800 tracking-tight">{score}</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">{t('esg.statuses.Certified')}</span>
                </div>
            </div>
            <div className="flex-1 w-full space-y-4">
                <div>
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="text-gray-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            {t('wallet.passport.esgEnvironmental')}
                        </span>
                        <span className="text-emerald-700 font-bold">{esgMetrics.metrics.environmental}/100</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${esgMetrics.metrics.environmental}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="text-gray-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            {t('wallet.passport.esgSocial')}
                        </span>
                        <span className="text-blue-700 font-bold">{esgMetrics.metrics.social}/100</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${esgMetrics.metrics.social}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="text-gray-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            {t('wallet.passport.esgGovernance')}
                        </span>
                        <span className="text-purple-700 font-bold">{esgMetrics.metrics.governance}/100</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${esgMetrics.metrics.governance}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ESGScore;