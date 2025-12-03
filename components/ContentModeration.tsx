import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContentItem } from '../types.ts';
import { IconContentModeration } from '../constants.tsx';

interface ContentModerationProps {
    queue: ContentItem[];
    onAction: (itemId: string) => void;
}

const ContentModeration: React.FC<ContentModerationProps> = ({ queue, onAction }) => {
    const { t } = useTranslation();

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <IconContentModeration className="w-16 h-16 mx-auto text-primary-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">{t('contentModeration.title')}</h1>
                <p className="text-gray-500 mt-2">{t('contentModeration.description')}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('contentModeration.pendingReview', { count: queue.length })}</h2>
                {queue.length > 0 ? (
                    <div className="space-y-4">
                        {queue.map(item => (
                            <div key={item.id} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.type === 'Product Listing' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{item.type}</span>
                                    <p className="font-semibold text-gray-800 mt-1">{item.contentSummary}</p>
                                    <p className="text-sm text-gray-500">{t('contentModeration.submittedBy', { name: item.submittedBy, date: item.dateSubmitted })}</p>
                                </div>
                                <div className="flex gap-2 mt-4 sm:mt-0 flex-shrink-0">
                                    <button onClick={() => onAction(item.id)} className="px-3 py-1.5 text-sm font-semibold text-green-700 bg-green-100 rounded-md hover:bg-green-200">{t('contentModeration.approve')}</button>
                                    <button onClick={() => onAction(item.id)} className="px-3 py-1.5 text-sm font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200">{t('contentModeration.reject')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">{t('contentModeration.emptyQueue')}</p>
                )}
            </div>
        </div>
    );
};

export default ContentModeration;