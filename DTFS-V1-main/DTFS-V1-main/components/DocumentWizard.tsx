

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconSearch, IconClock, IconTrendingUp, IconFile, IconPrint, IconShare } from '../constants.tsx';
import { generateDocument } from '../services/geminiService.ts';
import { FormField as FormFieldType } from '../types.ts';

// --- DATA STRUCTURES ---

interface Template {
    id: string;
    title: string;
    description: string;
    category: 'Trade Finance' | 'Shipping' | 'Legal' | 'Commercial';
    timeInMinutes: number;
    popularity: number;
    fields: FormFieldType[];
}

const documentTemplates: Template[] = [
    {
        id: 'invoice',
        title: 'Invoice',
        description: 'Generate a professional invoice for your sales, based on a standard template.',
        category: 'Commercial',
        timeInMinutes: 7,
        popularity: 98,
        fields: [
            { id: 'companyName', label: 'docWizard.fields.companyName', type: 'text', required: true, placeholder: 'docWizard.placeholders.companyName', gridCols: 3, section: 'company' },
            { id: 'companySlogan', label: 'docWizard.fields.companySlogan', type: 'text', required: false, placeholder: 'docWizard.placeholders.companySlogan', gridCols: 3, section: 'company' },
            { id: 'companyAddress', label: 'docWizard.fields.companyAddress', type: 'text', required: true, gridCols: 3, section: 'company' },
            { id: 'companyCity', label: 'docWizard.fields.companyCity', type: 'text', required: true, gridCols: 3, section: 'company' },
            { id: 'companyPhone', label: 'docWizard.fields.companyPhone', type: 'text', required: true, gridCols: 3, section: 'company' },
            { id: 'companyFax', label: 'docWizard.fields.companyFax', type: 'text', required: false, gridCols: 3, section: 'company' },
            
            { id: 'invoiceNumber', label: 'docWizard.fields.invoiceNumber', type: 'text', required: true, placeholder: '100', gridCols: 3, section: 'invoiceInfo' },
            { id: 'invoiceDate', label: 'docWizard.fields.date', type: 'date', required: true, gridCols: 3, section: 'invoiceInfo' },

            { id: 'toName', label: 'docWizard.fields.toName', type: 'text', required: true, gridCols: 3, section: 'billTo' },
            { id: 'toCompany', label: 'docWizard.fields.toCompany', type: 'text', required: false, gridCols: 3, section: 'billTo' },
            { id: 'toAddress', label: 'docWizard.fields.toAddress', type: 'text', required: true, gridCols: 3, section: 'billTo' },
            { id: 'toCity', label: 'docWizard.fields.toCity', type: 'text', required: true, gridCols: 3, section: 'billTo' },
            { id: 'toPhone', label: 'docWizard.fields.toPhone', type: 'text', required: false, gridCols: 6, section: 'billTo' },
            
            { id: 'shipToName', label: 'docWizard.fields.shipToName', type: 'text', required: false, gridCols: 3, section: 'shipTo' },
            { id: 'shipToCompany', label: 'docWizard.fields.shipToCompany', type: 'text', required: false, gridCols: 3, section: 'shipTo' },
            { id: 'shipToAddress', label: 'docWizard.fields.shipToAddress', type: 'text', required: false, gridCols: 3, section: 'shipTo' },
            { id: 'shipToCity', label: 'docWizard.fields.shipToCity', type: 'text', required: false, gridCols: 3, section: 'shipTo' },
            { id: 'shipToPhone', label: 'docWizard.fields.shipToPhone', type: 'text', required: false, gridCols: 6, section: 'shipTo' },
            
            { id: 'salesperson', label: 'docWizard.fields.salesperson', type: 'text', required: false, gridCols: 2, section: 'details' },
            { id: 'poNumber', label: 'docWizard.fields.poNumber', type: 'text', required: false, gridCols: 2, section: 'details' },
            { id: 'requisitioner', label: 'docWizard.fields.requisitioner', type: 'text', required: false, gridCols: 2, section: 'details' },
            { id: 'shippedVia', label: 'docWizard.fields.shippedVia', type: 'text', required: false, gridCols: 3, section: 'details' },
            { id: 'fobPoint', label: 'docWizard.fields.fobPoint', type: 'text', required: false, gridCols: 3, section: 'details' },

            { id: 'lineItems', label: 'docWizard.fields.lineItems', type: 'textarea', required: true, placeholder: 'docWizard.placeholders.lineItemsInvoice', gridCols: 6, section: 'summary' },
            
            { id: 'subtotal', label: 'docWizard.fields.subtotal', type: 'number', required: true, placeholder: '0.00', gridCols: 3, section: 'summary' },
            { id: 'salesTax', label: 'docWizard.fields.salesTax', type: 'number', required: false, placeholder: '0.00', gridCols: 3, section: 'summary' },
            { id: 'shippingHandling', label: 'docWizard.fields.shippingHandling', type: 'number', required: false, placeholder: '0.00', gridCols: 3, section: 'summary' },
            { id: 'totalDue', label: 'docWizard.fields.totalDue', type: 'number', required: true, placeholder: '0.00', gridCols: 3, section: 'summary' },

            { id: 'comments', label: 'docWizard.fields.comments', type: 'textarea', required: false, gridCols: 6, section: 'footer' },
            { id: 'contactInfo', label: 'docWizard.fields.contactInfo', type: 'text', required: false, placeholder: 'docWizard.placeholders.contactInfo', gridCols: 6, section: 'footer' },
        ]
    },
    {
        id: 'commercial-invoice',
        title: 'Commercial Invoice',
        description: 'Create professional invoices for international trade transactions',
        category: 'Trade Finance',
        timeInMinutes: 5,
        popularity: 95,
        fields: [
            { id: 'shipperName', label: 'docWizard.fields.shipperName', type: 'text', required: true, section: 'shipperExporter', gridCols: 3 },
            { id: 'shipperAddress', label: 'docWizard.fields.shipperAddress', type: 'textarea', required: true, section: 'shipperExporter', gridCols: 3 },
            { id: 'consigneeName', label: 'docWizard.fields.consigneeName', type: 'text', required: true, section: 'consignee', gridCols: 3 },
            { id: 'consigneeAddress', label: 'docWizard.fields.consigneeAddress', type: 'textarea', required: true, section: 'consignee', gridCols: 3 },
            { id: 'invoiceNumber', label: 'docWizard.fields.invoiceNumber', type: 'text', required: true, section: 'invoiceInfo', gridCols: 2 },
            { id: 'invoiceDate', label: 'docWizard.fields.invoiceDate', type: 'date', required: true, section: 'invoiceInfo', gridCols: 2 },
            { id: 'orderNumber', label: 'docWizard.fields.orderNumber', type: 'text', required: false, section: 'invoiceInfo', gridCols: 2 },
            { id: 'termsOfSale', label: 'docWizard.fields.termsOfSale', type: 'select', options: ['EXW', 'FCA', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF'], required: true, section: 'shippingInfo', gridCols: 3 },
            { id: 'reasonForExport', label: 'docWizard.fields.reasonForExport', type: 'text', required: true, placeholder: 'docWizard.placeholders.reasonForExport', section: 'shippingInfo', gridCols: 3 },
            { id: 'lineItems', label: 'docWizard.fields.lineItemsCommercial', type: 'textarea', required: true, placeholder: 'docWizard.placeholders.lineItemsCommercial', gridCols: 6, section: 'productDetails' },
            { id: 'subtotal', label: 'docWizard.fields.subtotal', type: 'number', required: true, section: 'summary', gridCols: 3 },
            { id: 'freightCharges', label: 'docWizard.fields.freightCharges', type: 'number', required: false, section: 'summary', gridCols: 3 },
            { id: 'insurance', label: 'docWizard.fields.insurance', type: 'number', required: false, section: 'summary', gridCols: 3 },
            { id: 'totalAmount', label: 'docWizard.fields.totalAmount', type: 'number', required: true, section: 'summary', gridCols: 3 },
            { id: 'declaration', label: 'docWizard.fields.declaration', type: 'textarea', required: true, placeholder: 'docWizard.placeholders.declaration', section: 'declaration', gridCols: 6 }
        ]
    },
    {
        id: 'letter-of-credit',
        title: 'Letter of Credit Application',
        description: 'Apply for letter of credit for secure international payments',
        category: 'Trade Finance',
        timeInMinutes: 10,
        popularity: 90,
        fields: [
            { id: 'applicantName', label: 'docWizard.fields.applicantName', type: 'text', required: true, section: 'applicant', gridCols: 3 },
            { id: 'applicantAddress', label: 'docWizard.fields.applicantAddress', type: 'textarea', required: true, section: 'applicant', gridCols: 3 },
            { id: 'beneficiaryName', label: 'docWizard.fields.beneficiaryName', type: 'text', required: true, section: 'beneficiary', gridCols: 3 },
            { id: 'beneficiaryAddress', label: 'docWizard.fields.beneficiaryAddress', type: 'textarea', required: true, section: 'beneficiary', gridCols: 3 },
            { id: 'issuingBank', label: 'docWizard.fields.issuingBank', type: 'text', required: true, section: 'issuingBank', gridCols: 3 },
            { id: 'advisingBank', label: 'docWizard.fields.advisingBank', type: 'text', required: false, section: 'advisingBank', gridCols: 3 },
            { id: 'creditAmount', label: 'docWizard.fields.creditAmount', type: 'number', required: true, section: 'creditDetails', gridCols: 2 },
            { id: 'currency', label: 'docWizard.fields.currency', type: 'select', options: ['USD', 'EUR', 'GBP'], required: true, section: 'creditDetails', gridCols: 2 },
            { id: 'expiryDate', label: 'docWizard.fields.expiryDate', type: 'date', required: true, section: 'creditDetails', gridCols: 2 },
            { id: 'goodsDescription', label: 'docWizard.fields.goodsDescription', type: 'textarea', required: true, section: 'goods', gridCols: 6 },
            { id: 'requiredDocs', label: 'docWizard.fields.requiredDocs', type: 'textarea', required: true, placeholder: 'docWizard.placeholders.requiredDocs', section: 'documentRequirements', gridCols: 6 }
        ]
    },
    {
        id: 'packing-list',
        title: 'Packing List',
        description: 'Generate detailed packing list for shipment documentation',
        category: 'Shipping',
        timeInMinutes: 8,
        popularity: 88,
        fields: [
            { id: 'shipperName', label: 'docWizard.fields.shipperName', type: 'text', required: true, section: 'shipper', gridCols: 3 },
            { id: 'shipperAddress', label: 'docWizard.fields.shipperAddress', type: 'textarea', required: true, section: 'shipper', gridCols: 3 },
            { id: 'consigneeName', label: 'docWizard.fields.consigneeName', type: 'text', required: true, section: 'consignee', gridCols: 3 },
            { id: 'consigneeAddress', label: 'docWizard.fields.consigneeAddress', type: 'textarea', required: true, section: 'consignee', gridCols: 3 },
            { id: 'invoiceNumber', label: 'docWizard.fields.invoiceNumber', type: 'text', required: true, section: 'shipmentDetails', gridCols: 3 },
            { id: 'dateOfShipment', label: 'docWizard.fields.dateOfShipment', type: 'date', required: true, section: 'shipmentDetails', gridCols: 3 },
            { id: 'packageDetails', label: 'docWizard.fields.packageDetails', type: 'textarea', required: true, placeholder: 'docWizard.placeholders.packageDetails', gridCols: 6, section: 'productDetails' },
            { id: 'totalPackages', label: 'docWizard.fields.totalPackages', type: 'number', required: true, section: 'packageSummary', gridCols: 2 },
            { id: 'totalNetWeight', label: 'docWizard.fields.totalNetWeight', type: 'number', required: true, section: 'packageSummary', gridCols: 2 },
            { id: 'totalGrossWeight', label: 'docWizard.fields.totalGrossWeight', type: 'number', required: true, section: 'packageSummary', gridCols: 2 }
        ]
    },
    {
        id: 'export-license',
        title: 'Export License Application',
        description: 'Apply for export license for regulated goods',
        category: 'Legal',
        timeInMinutes: 12,
        popularity: 75,
        fields: [
            { id: 'applicantName', label: 'docWizard.fields.applicantName', type: 'text', required: true, section: 'applicantInfo', gridCols: 3 },
            { id: 'applicantAddress', label: 'docWizard.fields.applicantAddress', type: 'textarea', required: true, section: 'applicantInfo', gridCols: 3 },
            { id: 'productDescription', label: 'docWizard.fields.productDescription', type: 'textarea', required: true, section: 'productInfo', gridCols: 6 },
            { id: 'hsCode', label: 'docWizard.fields.hsCode', type: 'text', required: true, section: 'productInfo', gridCols: 3 },
            { id: 'quantity', label: 'docWizard.fields.quantity', type: 'number', required: true, section: 'productInfo', gridCols: 3 },
            { id: 'destinationCountry', label: 'docWizard.fields.destinationCountry', type: 'text', required: true, section: 'destinationInfo', gridCols: 3 },
            { id: 'endUserName', label: 'docWizard.fields.endUserName', type: 'text', required: true, section: 'endUserInfo', gridCols: 3 },
            { id: 'endUserAddress', label: 'docWizard.fields.endUserAddress', type: 'textarea', required: true, section: 'endUserInfo', gridCols: 6 }
        ]
    },
    {
        id: 'trade-contract',
        title: 'Trade Contract Agreement',
        description: 'Create comprehensive trade agreements between parties',
        category: 'Legal',
        timeInMinutes: 15,
        popularity: 82,
        fields: [
            { id: 'sellerName', label: 'docWizard.fields.sellerName', type: 'textarea', required: true, section: 'parties', gridCols: 3 },
            { id: 'buyerName', label: 'docWizard.fields.buyerName', type: 'textarea', required: true, section: 'parties', gridCols: 3 },
            { id: 'goodsDescription', label: 'docWizard.fields.goodsDescription', type: 'textarea', required: true, section: 'goods', gridCols: 6 },
            { id: 'qualitySpecs', label: 'docWizard.fields.qualitySpecs', type: 'text', required: true, section: 'goods', gridCols: 3 },
            { id: 'quantity', label: 'docWizard.fields.quantity', type: 'text', required: true, section: 'goods', gridCols: 3 },
            { id: 'price', label: 'docWizard.fields.price', type: 'text', required: true, section: 'payment', gridCols: 3 },
            { id: 'paymentTerms', label: 'docWizard.fields.paymentTerms', type: 'text', required: true, placeholder: 'docWizard.placeholders.paymentTerms', section: 'payment', gridCols: 3 },
            { id: 'deliveryTerms', label: 'docWizard.fields.deliveryTerms', type: 'text', required: true, section: 'delivery', gridCols: 3 },
            { id: 'shipmentDate', label: 'docWizard.fields.shipmentDate', type: 'date', required: true, section: 'delivery', gridCols: 3 },
            { id: 'governingLaw', label: 'docWizard.fields.governingLaw', type: 'text', required: true, section: 'clauses', gridCols: 6 }
        ]
    }
];

// --- COMPONENTS ---

const TemplateCard: React.FC<{
    template: Template;
    isSelected: boolean;
    onSelect: () => void;
}> = ({ template, isSelected, onSelect }) => {
    const { t } = useTranslation();
    return (
        <div 
            onClick={onSelect}
            className={`bg-white p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${isSelected ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-gray-200 hover:shadow-lg hover:border-primary-300'}`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600">{t(`docWizard.templates.${template.id}.title` as any) || template.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{t(`docWizard.templates.${template.id}.description` as any) || template.description}</p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 mt-1 transition-all" style={{borderColor: isSelected ? '#0ea5e9' : '#e2e8f0'}}>
                  {isSelected && <div className="w-3 h-3 bg-primary-500 rounded-full"></div>}
                </div>
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-4 space-x-4">
                <div className="flex items-center"><IconClock className="w-4 h-4 mr-1"/><span>{t('docWizard.minutes', { count: template.timeInMinutes })}</span></div>
                <div className="flex items-center"><IconTrendingUp className="w-4 h-4 mr-1"/><span>{template.popularity}% {t('docWizard.popularity')}</span></div>
            </div>
        </div>
    );
};

const FormField: React.FC<{
    field: FormFieldType;
    value: any;
    onChange: (id: string, value: string) => void;
}> = ({ field, value, onChange }) => {
    const { t } = useTranslation();
    const commonClasses = "w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500";
    const placeholderText = field.placeholder ? t(field.placeholder) : undefined;
    
    switch(field.type) {
        case 'textarea':
            return (
                <div style={{ gridColumn: `span ${field.gridCols || 6} / span ${field.gridCols || 6}` }}>
                    <label className="font-medium text-gray-700">{t(field.label)}</label>
                    <textarea value={value} onChange={e => onChange(field.id, e.target.value)} required={field.required} placeholder={placeholderText} rows={4} className={commonClasses}></textarea>
                </div>
            )
        case 'select':
             return (
                <div style={{ gridColumn: `span ${field.gridCols || 6} / span ${field.gridCols || 6}` }}>
                    <label className="font-medium text-gray-700">{t(field.label)}</label>
                    <select value={value} onChange={e => onChange(field.id, e.target.value)} required={field.required} className={`${commonClasses} bg-white`}>
                         <option value="" disabled>{t('common.selectOption')}</option>
                         {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            )
        default:
            return (
                <div style={{ gridColumn: `span ${field.gridCols || 6} / span ${field.gridCols || 6}` }}>
                    <label className="font-medium text-gray-700">{t(field.label)}</label>
                    <input type={field.type} value={value} onChange={e => onChange(field.id, e.target.value)} required={field.required} placeholder={placeholderText} className={commonClasses} />
                </div>
            )
    }
}

// --- MAIN WIZARD ---

const DocumentWizard: React.FC = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [generatedDocument, setGeneratedDocument] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    
    const sections = useMemo(() => {
        if (!selectedTemplate) return [];
        const sectionSet = new Set(selectedTemplate.fields.map(f => f.section));
        return Array.from(sectionSet);
    }, [selectedTemplate]);

    const handleSelectTemplate = (template: Template) => {
        setSelectedTemplate(template);
        setFormData({}); // Reset form data
        setStep(2);
    };
    
    const handleFormChange = (id: string, value: string) => {
        setFormData(prev => ({...prev, [id]: value}));
    }

    const handleGenerate = async () => {
        if (!selectedTemplate) return;
        setIsGenerating(true);
        try {
            const doc = await generateDocument(selectedTemplate.title, JSON.stringify(formData));
            setGeneratedDocument(doc);
            setStep(3);
        } catch (error) {
            console.error("Error generating document:", error);
            // Handle error state in UI
        } finally {
            setIsGenerating(false);
        }
    }

    const startOver = () => {
        setStep(1);
        setSelectedTemplate(null);
        setFormData({});
        setGeneratedDocument('');
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="text-center">
                <span className="text-sm font-semibold bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{t('nav.Document Wizard')}</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-4">{t('docWizard.pageTitle')}</h1>
                <p className="text-gray-500 mt-2 max-w-3xl mx-auto">{t('docWizard.pageDescription')}</p>
            </div>

            {/* Main Wizard Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('docWizard.chooseTemplate')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {documentTemplates.map(template => (
                                <TemplateCard 
                                    key={template.id}
                                    template={template}
                                    isSelected={false}
                                    onSelect={() => handleSelectTemplate(template)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && selectedTemplate && (
                    <div className="animate-fade-in">
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{t('docWizard.fillInfo')}</h2>
                                <p className="text-gray-500">{t(`docWizard.templates.${selectedTemplate.id}.title` as any)}</p>
                            </div>
                            <button onClick={() => setStep(1)} className="text-sm font-semibold text-primary-600 hover:underline self-start md:self-center">{t('docWizard.changeTemplate')}</button>
                        </div>
                        <div className="space-y-6">
                            {sections.map(section => (
                                <div key={section}>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4 capitalize">{t(`docWizard.sections.${section}` as any)}</h3>
                                    <div className="grid grid-cols-6 gap-4">
                                        {selectedTemplate.fields.filter(f => f.section === section).map(field => (
                                            <FormField key={field.id} field={field} value={formData[field.id] || ''} onChange={handleFormChange}/>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className="flex justify-end mt-8">
                            <button onClick={handleGenerate} disabled={isGenerating} className="bg-primary-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-700 transition shadow-sm disabled:bg-primary-300">
                                {isGenerating ? t('common.generating') : t('docWizard.generateButton')}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                     <div className="animate-fade-in">
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                            <h2 className="text-2xl font-bold text-gray-800">{t('docWizard.reviewAndGenerate')}</h2>
                             <div className="flex gap-2">
                                <button onClick={startOver} className="text-sm font-semibold text-primary-600 hover:underline">{t('common.startOver')}</button>
                                <button className="flex items-center gap-2 font-semibold bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"><IconPrint className="w-5 h-5"/> {t('common.print')}</button>
                                <button className="flex items-center gap-2 font-semibold bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"><IconShare className="w-5 h-5"/> {t('common.share')}</button>
                            </div>
                        </div>
                        <div className="prose max-w-none p-6 border rounded-lg bg-gray-50/50 h-[60vh] overflow-y-auto" dangerouslySetInnerHTML={{ __html: generatedDocument }}>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentWizard;
