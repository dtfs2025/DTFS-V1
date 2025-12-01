
import React from 'react';
import { IconLogo } from '../constants.tsx';

const SplashScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden">
            {/* Background Effects - Subtle and Premium */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-50/80 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-50/80 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Container with Reveal Animation */}
                <div className="relative animate-fade-in-up duration-1000 ease-out">
                    {/* Glow behind logo */}
                    <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full transform scale-110"></div>
                    
                    {/* The Logo */}
                    <IconLogo className="w-48 h-auto drop-shadow-xl relative z-10" />
                    
                    {/* Shimmer Overlay */}
                    <div className="absolute inset-0 z-20 overflow-hidden rounded-lg pointer-events-none">
                        <div className="absolute top-0 bottom-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-[-20deg] animate-shimmer-slide"></div>
                    </div>
                </div>

                {/* Tagline with staggered animation */}
                <div className="mt-6 overflow-hidden text-center">
                    <p className="text-slate-500 text-sm font-medium tracking-[0.2em] uppercase opacity-0 animate-slide-up-reveal" style={{ animationDelay: '0.6s' }}>
                        Digital Trade Facilitation System
                    </p>
                </div>
                
                {/* Loading indicator */}
                <div className="mt-12 flex gap-2 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                </div>
            </div>

            {/* Powered By Footer */}
            <div className="absolute bottom-10 left-0 right-0 text-center opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                    Powered by <span className="text-slate-600 font-bold">Nexus X Industries</span>
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;