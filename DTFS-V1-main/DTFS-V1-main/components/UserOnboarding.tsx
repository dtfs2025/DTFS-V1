import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserRole } from '../types.ts';
import { IconCheckCircle, IconUserPlus } from '../constants.tsx';
import { useAuth } from '../hooks/useAuth.ts';

interface KycDocument {
    id: string;
    nameKey: string;
    status: 'Pending' | 'Uploading' | 'Uploaded';
}

const Step: React.FC<{ number: number; label: string; active?: boolean }> = ({ number, label, active }) => (
    <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${active ? 'bg-primary-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500'}`}>
            {number}
        </div>
        <p className={`ml-3 font-semibold hidden md:block ${active ? 'text-primary-600' : 'text-slate-500'}`}>{label}</p>
    </div>
);

interface UserOnboardingProps {
    onComplete: () => void;
}

const UserOnboarding: React.FC<UserOnboardingProps> = ({ onComplete }) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [kycDocs, setKycDocs] = useState<KycDocument[]>([
        { id: 'bizReg', nameKey: 'userOnboarding.kycDocs.bizReg', status: 'Pending' },
        { id: 'idProof', nameKey: 'userOnboarding.kycDocs.idProof', status: 'Pending' },
        { id: 'addrProof', nameKey: 'userOnboarding.kycDocs.addrProof', status: 'Pending' },
        { id: 'taxCert', nameKey: 'userOnboarding.kycDocs.taxCert', status: 'Pending' },
    ]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleDocUpload = (docId: string) => {
        setKycDocs(prev => prev.map(doc => doc.id === docId ? { ...doc, status: 'Uploading' } : doc));
        setTimeout(() => {
            setKycDocs(prev => prev.map(doc => doc.id === docId ? { ...doc, status: 'Uploaded' } : doc));
        }, 1500); // Simulate upload time
    };

    const allDocsUploaded = kycDocs.every(doc => doc.status === 'Uploaded');
    
    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    if (!user) return null;

    if(isSubmitted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="text-center animate-fade-in max-w-2xl">
                    <IconCheckCircle className="w-24 h-24 text-green-500 mx-auto" />
                    <h1 className="text-3xl font-bold text-slate-800 mt-4">{t('userOnboarding.successTitle')}</h1>
                    <p className="text-slate-500 mt-2">{t('userOnboarding.successDescription', { name: user.name })}</p>
                    <button 
                        onClick={onComplete}
                        className="mt-6 bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition shadow-sm"
                    >
                        {t('userOnboarding.goToDashboard')}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <div className="text-center">
                <IconUserPlus className="w-16 h-16 mx-auto text-primary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4">{t('userOnboarding.title')}</h1>
                <p className="text-slate-500 mt-2">{t('userOnboarding.description')}</p>
            </div>
            
            <div className="flex justify-center items-center my-8">
                <Step number={1} label={t('userOnboarding.step1')} active={step === 1} />
                <div className={`flex-1 h-0.5 mx-4 ${step > 1 ? 'bg-primary-500' : 'bg-slate-200'}`}></div>
                <Step number={2} label={t('userOnboarding.step2')} active={step === 2} />
                <div className={`flex-1 h-0.5 mx-4 ${step > 2 ? 'bg-primary-500' : 'bg-slate-200'}`}></div>
                <Step number={3} label={t('userOnboarding.step3')} active={step === 3} />
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">{t('userOnboarding.formTitle')}</h2>
                        <div className="mt-4 space-y-4 p-4 bg-slate-50 rounded-lg border">
                             <div><strong className="text-slate-500">{t('userOnboarding.nameLabel')}:</strong><p className="font-semibold">{user.name}</p></div>
                             <div><strong className="text-slate-500">{t('userOnboarding.emailLabel')}:</strong><p className="font-semibold">{user.email}</p></div>
                             <div><strong className="text-slate-500">{t('userOnboarding.roleLabel')}:</strong><p className="font-semibold">{t(`nav.${user.role}` as any)}</p></div>
                        </div>
                        <div className="text-right mt-6">
                            <button onClick={() => setStep(2)} className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold">{t('common.next')}: {t('userOnboarding.step2')}</button>
                        </div>
                    </div>
                )}
                
                {step === 2 && (
                     <div>
                         <h2 className="text-xl font-bold text-slate-800 mb-4">{t('userOnboarding.kycTitle')}</h2>
                         <div className="space-y-4">
                            {kycDocs.map(doc => (
                                <div key={doc.id} className="flex items-center p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-700">{t(doc.nameKey)}</p>
                                        <p className={`text-sm font-medium ${doc.status === 'Uploaded' ? 'text-green-600' : 'text-slate-500'}`}>{doc.status}</p>
                                    </div>
                                    {doc.status === 'Pending' && <button onClick={() => handleDocUpload(doc.id)} className="px-4 py-1.5 text-sm font-semibold text-primary-600 bg-primary-100 rounded-md hover:bg-primary-200">Upload</button>}
                                    {doc.status === 'Uploading' && <div className="w-5 h-5 border-2 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>}
                                    {doc.status === 'Uploaded' && <IconCheckCircle className="w-6 h-6 text-green-500"/>}
                                </div>
                            ))}
                         </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                            <button onClick={() => setStep(1)} className="px-6 py-2 rounded-lg border font-semibold w-full sm:w-auto">{t('common.back')}</button>
                            <button onClick={() => setStep(3)} disabled={!allDocsUploaded} className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold disabled:bg-slate-300 w-full sm:w-auto">{t('common.next')}: {t('userOnboarding.step3')}</button>
                        </div>
                    </div>
                )}
                
                 {step === 3 && (
                     <div>
                         <h2 className="text-xl font-bold text-slate-800 mb-4">{t('userOnboarding.reviewTitle')}</h2>
                         <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                             <div><strong className="text-slate-500">{t('userOnboarding.nameLabel')}:</strong><p className="font-semibold">{user.name}</p></div>
                             <div><strong className="text-slate-500">{t('userOnboarding.emailLabel')}:</strong><p className="font-semibold">{user.email}</p></div>
                             <div><strong className="text-slate-500">{t('userOnboarding.roleLabel')}:</strong><p className="font-semibold">{t(`nav.${user.role}` as any)}</p></div>
                             <div>
                                 <strong className="text-slate-500">{t('userOnboarding.step2')}:</strong>
                                 <ul className="list-disc list-inside">
                                     {kycDocs.map(doc => <li key={doc.id} className="text-green-600">{t('userOnboarding.docsUploaded', { name: t(doc.nameKey) })}</li>)}
                                 </ul>
                             </div>
                         </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                            <button onClick={() => setStep(2)} className="px-6 py-2 rounded-lg border font-semibold w-full sm:w-auto">{t('common.back')}</button>
                            <button onClick={handleSubmit} className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold w-full sm:w-auto">{t('userOnboarding.submitVerification')}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default UserOnboarding;