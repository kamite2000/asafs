import React from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '@/lib/ContentContext';
import { ProgramCard } from '@/components/programCard';
import Footer from '@/components/ui/Footer';
import { useTranslation } from 'react-i18next';

export const Programs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { getPublishedPostsByType } = useContent();
  const programmePosts = getPublishedPostsByType('programme');

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
        {/* Core Programs - Focused Feed */}
        <div className="space-y-12">
          <ProgramCard
            image="https://images.unsplash.com/photo-1544650030-3c997b712911?q=80&w=2070&auto=format&fit=crop"
            title={t('programs.p1_title')}
            subtitle={t('programs.p1_subtitle')}
            description={t('programs.p1_desc')}
          />

          <ProgramCard
            image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
            title={t('programs.p2_title')}
            subtitle={t('programs.p2_subtitle')}
            description={t('programs.p2_desc')}
            imagePosition="right"
          />
        </div>

        {/* Dynamic Programs - Modern Grid */}
        {programmePosts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter uppercase">
                {t('programs.other_pre')} <span className="text-blue-600 italic">{t('programs.other_highlight')}</span>
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {programmePosts.map((post) => (
                <div key={post.id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                  <div className="aspect-[21/9] relative overflow-hidden bg-slate-100">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200 uppercase font-black tracking-tighter">ASAFS</div>
                    )}
                    <div className="absolute top-4 left-4">
                       <span className="px-3 py-1 bg-white/95 backdrop-blur-sm shadow-sm rounded-lg text-[9px] font-black text-blue-600 uppercase tracking-widest">
                          {post.date}
                       </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{post.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4 font-medium">{post.content}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                       <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">{post.author || t('programs.team')}</span>
                       <button className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase hover:underline">{t('programs.details')} →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Programs;