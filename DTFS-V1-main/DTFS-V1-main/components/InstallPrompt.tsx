import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IconX } from '../constants.tsx';

const InstallPrompt: React.FC = () => {
    const { t } = useTranslation();
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null);
                setIsVisible(false);
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-4 right-4 md:bottom-6 md:left-auto md:right-6 z-[100] animate-fade-in-up">
            <div className="bg-white rounded-xl shadow-2xl p-4 border border-primary-100 flex items-center gap-4 max-w-sm ml-auto">
                <div className="bg-primary-50 p-2.5 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-600">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-4 4 4h-3v4h-2z"/>
                    </svg>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">{t('pwa.installTitle')}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{t('pwa.installDescription')}</p>
                </div>
                <button 
                    onClick={handleInstallClick} 
                    className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                    {t('pwa.installButton')}
                </button>
                <button 
                    onClick={() => setIsVisible(false)} 
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <IconX className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default InstallPrompt;