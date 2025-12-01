
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconChevronRight, IconChevronLeft } from '../constants.tsx';

interface CourseCardProps {
    courseKey: 'exportMastery' | 'customsRegs' | 'tradeFinance';
    progress: number;
    hours: number;
    imageUrl: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const CourseCard: React.FC<CourseCardProps> = ({ courseKey, progress, hours, imageUrl, level }) => {
    const { t } = useTranslation();
    const levelColor = {
        Beginner: 'bg-green-100 text-green-800',
        Intermediate: 'bg-yellow-100 text-yellow-800',
        Advanced: 'bg-red-100 text-red-800',
    };
    
    const levelKey = level.toLowerCase() as 'beginner' | 'intermediate' | 'advanced';

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img src={imageUrl} alt={t(`training.courses.${courseKey}.title`)} className="w-full h-48 object-cover" />
                <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full ${levelColor[level]}`}>{t(`training.levels.${levelKey}`)}</span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800">{t(`training.courses.${courseKey}.title`)}</h3>
                <p className="text-gray-500 mt-2 flex-grow">{t(`training.courses.${courseKey}.description`)}</p>
                <div className="mt-4">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                        <span>{t('training.progress')}</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-secondary-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                    <span>{t('training.hours', { count: hours })}</span>
                    <span>{t('training.certificate')}</span>
                </div>
            </div>
        </div>
    );
};

const Training: React.FC = () => {
    const { t } = useTranslation();
    const courses: Omit<CourseCardProps, 'title' | 'description'>[] = [
        {
            courseKey: "exportMastery",
            progress: 65,
            hours: 4,
            imageUrl: "https://picsum.photos/seed/course1/400/300",
            level: 'Beginner'
        },
        {
            courseKey: "customsRegs",
            progress: 25,
            hours: 6,
            imageUrl: "https://picsum.photos/seed/course2/400/300",
            level: 'Intermediate'
        },
        {
            courseKey: "tradeFinance",
            progress: 0,
            hours: 8,
            imageUrl: "https://picsum.photos/seed/course3/400/300",
            level: 'Advanced'
        }
    ];

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('training.title')}</h1>
                    <p className="text-gray-500 mt-1">{t('training.description')}</p>
                </div>
                <a href="#" className="flex items-center font-semibold text-primary-600 hover:text-primary-800">
                    {t('training.viewAll')}
                    <IconChevronRight className="w-5 h-5 ml-1" />
                </a>
            </div>

            <div className="relative mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
                 <button className="absolute top-1/2 -translate-y-1/2 -left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 disabled:opacity-50 hidden md:block">
                    <IconChevronLeft className="w-6 h-6 text-gray-600"/>
                </button>
                <button className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hidden md:block">
                    <IconChevronRight className="w-6 h-6 text-gray-600"/>
                </button>
            </div>
        </div>
    );
};

export default Training;
