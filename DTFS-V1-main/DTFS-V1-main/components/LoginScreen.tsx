
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth.ts';
import { USERS, IconLogo, IconGoogle, IconApple, IconPhone, IconChevronLeft, IconShieldCheck, IconBox, IconUsers, IconShipmentManagement, IconUserHeadset } from '../constants.tsx';
import { User, UserRole } from '../types.ts';

type AuthScreen = 'main' | 'email' | 'phone' | 'otp' | 'register' | 'forgotPassword' | 'guestSelection' | 'roleSelection';

const SocialButton: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void, isLoading?: boolean }> = ({ icon, label, onClick, isLoading }) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 p-3.5 text-sm font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
    >
        {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        ) : icon}
        {label}
    </button>
);

const RoleCard: React.FC<{ 
    role: UserRole; 
    icon: React.ElementType; 
    title: string; 
    description: string; 
    onClick: () => void;
}> = ({ role, icon: Icon, title, description, onClick }) => (
    <button 
        onClick={onClick}
        className="flex items-start gap-4 p-4 w-full text-left bg-white border border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-md transition-all group"
    >
        <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-primary-50 transition-colors shrink-0">
            <Icon className="w-6 h-6 text-gray-600 group-hover:text-primary-600" />
        </div>
        <div>
            <h4 className="font-bold text-gray-900 group-hover:text-primary-700">{title}</h4>
            <p className="text-sm text-gray-500 mt-1 leading-snug">{description}</p>
        </div>
    </button>
);

const RoleSelectionView: React.FC<{ socialData: any, onRegister: (role: UserRole) => void, onBack: () => void }> = ({ socialData, onRegister, onBack }) => {
    const { t } = useTranslation();
    
    return (
        <div className="animate-fade-in space-y-6">
            <button onClick={onBack} className="group flex items-center gap-2 mb-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"><IconChevronLeft className="w-4 h-4" /></div> {t('common.back')}
            </button>

            <div className="text-center">
                <img src={socialData.avatar} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-sm" />
                <h3 className="text-2xl font-bold text-gray-900">{t('login.welcome')}, {socialData.name.split(' ')[0]}!</h3>
                <p className="text-gray-500 text-sm mt-1">To finish setting up your account, please select your primary role on the platform.</p>
            </div>

            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                <RoleCard 
                    role="Exporter"
                    icon={IconBox}
                    title={t('nav.Exporter')}
                    description="I want to sell products to international buyers."
                    onClick={() => onRegister('Exporter')}
                />
                <RoleCard 
                    role="Buyer"
                    icon={IconUsers}
                    title={t('nav.Buyer')}
                    description="I want to source products from verified suppliers."
                    onClick={() => onRegister('Buyer')}
                />
                <RoleCard 
                    role="Logistics"
                    icon={IconShipmentManagement}
                    title={t('nav.Logistics')}
                    description="I provide transportation and shipping services."
                    onClick={() => onRegister('Logistics')}
                />
                <RoleCard 
                    role="Agent"
                    icon={IconUserHeadset}
                    title={t('nav.Agent')}
                    description="I facilitate trades and support users locally."
                    onClick={() => onRegister('Agent')}
                />
            </div>
        </div>
    );
};

const GuestSelectionView: React.FC<{ setScreen: (screen: AuthScreen) => void }> = ({ setScreen }) => {
    const { login } = useAuth();
    const { t } = useTranslation();

    return (
        <div className="animate-fade-in space-y-6">
            <button onClick={() => setScreen('main')} className="group flex items-center gap-2 mb-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"><IconChevronLeft className="w-4 h-4" /></div> {t('common.back')}
            </button>
            
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('login.guestSelection.title')}</h3>
                <p className="text-gray-500 text-sm">{t('login.guestSelection.description')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => login('U00-EXP')} 
                    className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all group"
                >
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3 group-hover:bg-primary-100 group-hover:text-primary-600">
                        <IconBox className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-gray-800 group-hover:text-primary-700">{t('login.guestSelection.exporter')}</span>
                    <span className="text-xs text-gray-500 mt-1 text-center">{t('login.guestSelection.exporterDesc')}</span>
                </button>

                <button 
                    onClick={() => login('U00-BUY')} 
                    className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all group"
                >
                    <div className="p-3 bg-green-100 text-green-600 rounded-full mb-3 group-hover:bg-primary-100 group-hover:text-primary-600">
                        <IconUsers className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-gray-800 group-hover:text-primary-700">{t('login.guestSelection.importer')}</span>
                    <span className="text-xs text-gray-500 mt-1 text-center">{t('login.guestSelection.importerDesc')}</span>
                </button>
            </div>
            
            <button 
                onClick={() => login('U00')} 
                className="w-full p-3 text-sm font-medium text-gray-500 hover:text-gray-800 hover:underline"
            >
                {t('login.guestSelection.generic')}
            </button>
        </div>
    );
};

const MainView: React.FC<{
    setScreen: (screen: AuthScreen) => void;
    onSocialLogin: (provider: 'google' | 'apple') => void;
    isSocialLoading: string | null;
}> = ({ setScreen, onSocialLogin, isSocialLoading }) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
                <button
                    onClick={() => setScreen('phone')}
                    className="w-full flex items-center justify-center gap-3 p-4 text-base font-bold text-white transition-all duration-200 bg-primary-600 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/30 active:scale-[0.98] ring-1 ring-primary-500"
                >
                    <IconPhone className="w-5 h-5" />
                    {t('login.continueWithPhone')}
                </button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">{t('login.continueWith')}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <SocialButton 
                    icon={<IconGoogle className="w-5 h-5" />} 
                    label="Google" 
                    onClick={() => onSocialLogin('google')} 
                    isLoading={isSocialLoading === 'google'}
                />
                <SocialButton 
                    icon={<IconApple className="w-5 h-5" />} 
                    label="Apple" 
                    onClick={() => onSocialLogin('apple')} 
                    isLoading={isSocialLoading === 'apple'}
                />
            </div>

            <div className="text-center text-sm pt-4">
                <button onClick={() => setScreen('email')} className="font-bold text-primary-600 hover:text-primary-700 hover:underline transition-colors">{t('login.alreadyMember')}</button>
                <span className="text-gray-300 mx-3">|</span>
                <button onClick={() => setScreen('guestSelection')} className="font-medium text-gray-500 hover:text-gray-800 transition-colors">{t('login.browseGuest')}</button>
            </div>
        </div>
    );
};

const EmailLoginView: React.FC<{ setScreen: (screen: AuthScreen) => void }> = ({ setScreen }) => {
    const { login, users } = useAuth();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const userToLogin = users.find((u: Omit<User, 'permissions'>) => u.email === email);
        if (userToLogin) {
            login(userToLogin.id, rememberMe);
        } else {
            alert('User not found. Try kwame@export.com');
        }
    };

    return (
        <div className="animate-fade-in">
            <button onClick={() => setScreen('main')} className="group flex items-center gap-2 mb-8 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"><IconChevronLeft className="w-4 h-4" /></div> {t('common.back')}
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('login.logIn')}</h3>
            <p className="text-gray-500 mb-8 text-sm">Enter your credentials to access your account.</p>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.emailAddress')}</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none" placeholder="kwame@export.com" required/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.password')}</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none" required/>
                </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">{t('login.rememberMe')}</label>
                    </div>
                    <div className="text-sm">
                        <button type="button" onClick={() => setScreen('forgotPassword')} className="font-semibold text-primary-600 hover:text-primary-700 hover:underline">{t('login.forgotPassword')}</button>
                    </div>
                </div>
                <button type="submit" className="w-full p-4 font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all duration-200 active:scale-[0.98] ring-1 ring-primary-500">{t('login.logIn')}</button>
            </form>
        </div>
    )
};

const PhoneViews: React.FC<{ setScreen: (screen: AuthScreen) => void }> = ({ setScreen }) => {
    const { t } = useTranslation();
    const [view, setView] = useState<'phone' | 'otp'>('phone');
    
    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setView('otp');
    }

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setScreen('register');
    }

    return (
         <div className="animate-fade-in">
            <button onClick={() => setScreen('main')} className="group flex items-center gap-2 mb-8 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"><IconChevronLeft className="w-4 h-4" /></div> {t('common.back')}
            </button>
            {view === 'phone' ? (
                <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('login.getStarted')}</h3>
                    <p className="text-gray-500 mb-8 text-sm">Enter your phone number to receive a verification code.</p>
                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.phoneNumber')}</label>
                            <input type="tel" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none" placeholder="+1 (555) 000-0000" required/>
                        </div>
                        <button type="submit" className="w-full p-4 font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98] ring-1 ring-primary-500">{t('login.sendCode')}</button>
                    </form>
                </>
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('login.enterCode')}</h3>
                    <p className="text-gray-500 mb-8 text-sm">We sent a code to your phone. Please enter it below.</p>
                     <form onSubmit={handleOtpSubmit} className="space-y-6">
                        <div>
                            <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6} className="w-full p-4 border border-gray-200 rounded-xl text-center text-3xl tracking-[0.5em] font-mono focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none bg-gray-50 focus:bg-white" required/>
                        </div>
                        <button type="submit" className="w-full p-4 font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98] ring-1 ring-primary-500">{t('login.verify')}</button>
                    </form>
                </>
            )}
        </div>
    )
};

const RegisterView: React.FC<{ setScreen: (screen: AuthScreen) => void }> = ({ setScreen }) => {
    const { register } = useAuth();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Exporter' as UserRole,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register(formData);
    };

    return (
        <div className="animate-fade-in">
            <button onClick={() => setScreen('main')} className="group flex items-center gap-2 mb-8 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"><IconChevronLeft className="w-4 h-4" /></div> {t('common.back')}
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('login.register.title')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.register.nameLabel')}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none" required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.register.emailLabel')}</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.register.roleLabel')}</label>
                    <div className="relative">
                        <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3.5 border border-gray-200 rounded-xl appearance-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none">
                            <option value="Exporter">{t('nav.Exporter')}</option>
                            <option value="Buyer">{t('nav.Buyer')}</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <IconChevronLeft className="w-4 h-4 text-gray-500 -rotate-90" />
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full p-4 font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98] ring-1 ring-primary-500">{t('login.register.createButton')}</button>
            </form>
        </div>
    );
};

const ForgotPasswordView: React.FC<{ setScreen: (screen: AuthScreen) => void }> = ({ setScreen }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="animate-fade-in text-center py-8">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{t('login.resetLinkSentTitle')}</h3>
                <p className="text-sm text-gray-600 mb-8">{t('login.resetLinkSentDescription', { email })}</p>
                <button onClick={() => setScreen('email')} className="w-full p-4 font-bold text-primary-700 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">{t('login.backToLogin')}</button>
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            <button onClick={() => setScreen('email')} className="group flex items-center gap-2 mb-8 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"><IconChevronLeft className="w-4 h-4" /></div> {t('common.back')}
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('login.forgotPasswordTitle')}</h3>
            <p className="text-sm text-gray-500 mb-8">{t('login.forgotPasswordDescription')}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.emailAddress')}</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none" placeholder="your@email.com" required/>
                </div>
                <button type="submit" className="w-full p-4 font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98] ring-1 ring-primary-500">{t('login.sendResetLink')}</button>
            </form>
        </div>
    )
}

const LoginScreen: React.FC = () => {
    const { loginWithSocial, register } = useAuth();
    const { t } = useTranslation();
    const [screen, setScreen] = useState<AuthScreen>('main');
    const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);
    const [tempSocialUser, setTempSocialUser] = useState<any>(null);

    const handleSocialLogin = async (provider: 'google' | 'apple') => {
        setIsSocialLoading(provider);
        try {
            const result = await loginWithSocial(provider);
            if (result.status === 'success') {
                // Login happens automatically in context for existing users
            } else if (result.status === 'new_user' && result.socialData) {
                setTempSocialUser(result.socialData);
                setScreen('roleSelection');
            }
        } catch (error) {
            console.error("Social login failed", error);
        } finally {
            setIsSocialLoading(null);
        }
    };

    const handleRoleSelection = (role: UserRole) => {
        if (tempSocialUser) {
            register({
                name: tempSocialUser.name,
                email: tempSocialUser.email,
                role: role,
                avatar: tempSocialUser.avatar
            });
        }
    };

    const renderScreen = () => {
        switch(screen) {
            case 'email':
                return <EmailLoginView setScreen={setScreen} />
            case 'phone':
            case 'otp':
                return <PhoneViews setScreen={setScreen} />
            case 'register':
                return <RegisterView setScreen={setScreen} />;
            case 'forgotPassword':
                return <ForgotPasswordView setScreen={setScreen} />;
            case 'guestSelection':
                return <GuestSelectionView setScreen={setScreen} />;
            case 'roleSelection':
                return <RoleSelectionView socialData={tempSocialUser} onRegister={handleRoleSelection} onBack={() => setScreen('main')} />;
            case 'main':
            default:
                return <MainView setScreen={setScreen} onSocialLogin={handleSocialLogin} isSocialLoading={isSocialLoading} />
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 md:p-8 overflow-hidden relative">
            {/* Abstract background shapes */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-primary-200/30 to-transparent blur-[120px] animate-pulse-slow"></div>
                <div className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-secondary-200/30 to-transparent blur-[100px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                <div className="absolute -bottom-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-t from-blue-200/20 to-transparent blur-[80px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="w-full max-w-[420px] z-10 flex flex-col">
                <div className="flex flex-col items-center mb-10 animate-fade-in-up">
                    {/* Logo acts as the main branding */}
                    <IconLogo className="h-20 w-auto mb-6 object-contain" />
                    <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">Digital Trade Facilitation System</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-white/50 ring-1 ring-gray-100 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                    {renderScreen()}
                </div>
                
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400 font-medium flex items-center justify-center gap-2">
                        <IconShieldCheck className="w-4 h-4" />
                        Secure & Encrypted Connection
                    </p>
                    <div className="mt-6">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                            Powered by <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent font-bold">Nexus X Industries</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;