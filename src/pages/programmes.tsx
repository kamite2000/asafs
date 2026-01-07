import React from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '@/lib/ContentContext';
import { ProgramCard } from '@/components/programCard';
import Footer from '@/components/ui/Footer';
import { useTranslation } from 'react-i18next';

export const Programs = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { getPublishedPostsByType } = useContent();
  const programmePosts = getPublishedPostsByType('programme');

  const getProgramStatus = (startDateStr: string, endDateStr?: string) => {
    if (!startDateStr) return 'future';
    const now = new Date();
    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : null;
    
    now.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    if (endDate) endDate.setHours(23, 59, 59, 999);

    if (endDate && now > endDate) return 'past';
    if (!endDate && startDate < now) return 'past';
    if (now < startDate) return 'future';
    return 'current';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(i18n.language === 'swa' ? 'sw-TZ' : i18n.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section - Compact & Professional */}
      <div className="relative h-[350px] w-full mb-12">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2070&auto=format&fit=crop')]"
        >
          <div className="absolute inset-0 bg-black/60 dark:bg-black/80 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center text-white">
          <div className="inline-block px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-400 text-[10px] font-black tracking-widest uppercase mb-4 self-start">
            {t('programs.badge')}
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 uppercase">
            {t('nav.programs_pre')} <span className="text-blue-500 italic">{t('nav.programs_highlight')}</span>
          </h1>

          <div className="w-12 h-1 bg-blue-600 mb-6" />

          <p className="text-base md:text-lg max-w-2xl leading-relaxed text-gray-200 font-medium">
            {t('programs.hero_subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        {/* Dynamic Programs - Managed from Admin Dashboard */}
        <div className="space-y-20">
          {programmePosts.length > 0 ? (
            programmePosts.map((post, index) => (
              <ProgramCard
                key={post.id}
                image={post.imageUrl || "https://images.unsplash.com/photo-1544650030-3c997b712911?q=80&w=2070&auto=format&fit=crop"}
                title={post.title}
                subtitle={post.endDate ? `${t('common.from')} ${formatDate(post.date)} ${t('common.to')} ${formatDate(post.endDate)}` : `${t('common.from')} ${formatDate(post.date)}`}
                description={post.content}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
                status={getProgramStatus(post.date, post.endDate)}
              />
            ))
          ) : (
            <div className="py-24 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
               <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-sm italic">
                 {t('programs.no_content', { defaultValue: 'Aucun programme disponible pour le moment.' })}
               </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Programs;