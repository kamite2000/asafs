import React from 'react';
import { useContent } from '@/lib/ContentContext';
import Footer from '@/components/ui/Footer';
import { Calendar, Users, Target, Award, ArrowRight, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const About = () => {
  const { t, i18n } = useTranslation();
  const { getPublishedPostsByType } = useContent();
  const [selectedCategory, setSelectedCategory] = React.useState('Toutes');
  const [showAllActivities, setShowAllActivities] = React.useState(false);

  const aboutPosts = getPublishedPostsByType('about');
  const activities = getPublishedPostsByType('activite');
  const timelinePosts = getPublishedPostsByType('timeline');

  const filteredActivities = activities.filter(activity =>
    selectedCategory === 'Toutes' || activity.category === selectedCategory
  );

  const activitiesToShow = showAllActivities ? filteredActivities : filteredActivities.slice(0, 6);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Hero Section - Professional Polish */}
      <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/Rectangle 30.png"
          alt="ASAFS Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white dark:to-slate-950" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-block px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-400 text-[10px] font-black tracking-widest uppercase mb-4">
            {t('mission.title')}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase whitespace-pre-line">
            {t('about.hero_title')}
          </h1>
          <p className="text-lg text-gray-200 font-medium max-w-2xl mx-auto">
            {t('about.hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Profile Section - Refined Luxury Card */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 pb-16">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-10 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative shrink-0">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-10" />
              <img
                src="/MARTHE.png"
                alt="Marthe YAKANGA ONIKI"
                className="relative w-48 h-64 md:w-56 md:h-72 object-cover rounded-2xl shadow-xl z-10 border-4 border-white"
              />
              <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-4 rounded-xl shadow-lg z-20">
                < Award className="w-6 h-6" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Marthe YAKANGA ONIKI
              </h2>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-xs translate-y-[-0.5rem]">{t('about.coordinator')}</p>

              <div className="prose prose-slate prose-sm max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                <p className="text-base md:text-lg italic">
                  "{t('about.quote')}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg shadow-sm flex items-center justify-center text-blue-600">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{t('about.vision_label')}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 font-bold">{t('about.vision_value')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg shadow-sm flex items-center justify-center text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{t('about.impact_label')}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 font-bold">{t('about.impact_value')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section - Smart Grid */}
      <section className="py-16 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 uppercase">
              {t('about.activities_pre')} <span className="text-blue-600 italic">{t('about.activities_highlight')}</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Toutes', 'Éducation', 'Plaidoyer', 'Social', 'Santé'].map((cat) => (
                <button
                  key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all border-2 ${selectedCategory === cat
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-blue-200'
                    }`}
                >
                  {cat === 'Toutes' ? t('about.cat_all') : t('categories.' + cat, { defaultValue: cat })}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activitiesToShow.length > 0 ? (
              activitiesToShow.map((activity) => (
                <Dialog key={activity.id}>
                  <DialogTrigger asChild>
                    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
                      {activity.imageUrl && (
                        <div className="relative h-44 overflow-hidden">
                          <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md rounded-full text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest shadow-sm">
                            {activity.category ? t(`categories.${activity.category}`, { defaultValue: activity.category }) : t('about.cat_general')}
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-bold mb-3 uppercase">
                          <Calendar className="w-3 h-3" /> {activity.date}
                        </div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 line-clamp-2">
                          {activity.content}
                        </p>
                        <div className="w-8 h-0.5 bg-slate-100 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl border border-slate-800/10 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="h-44 relative">
                      {activity.imageUrl ? (
                        <img src={activity.imageUrl} className="w-full h-full object-cover" alt={activity.title} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-950 text-white font-black text-2xl uppercase">ASAFS</div>
                      )}
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                    <div className="p-8 overflow-y-auto max-h-[60vh]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase">
                          <Calendar className="w-3 h-3" /> {activity.date}
                        </div>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                          {activity.category ? t(`categories.${activity.category}`, { defaultValue: activity.category }) : t('about.cat_general')}
                        </span>
                      </div>
                      <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                        {activity.title}
                      </DialogTitle>
                      <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-wrap pr-2">
                        {activity.content}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <Target className="w-8 h-8 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium italic">{t('about.no_activities')}</p>
              </div>
            )}
          </div>

          {filteredActivities.length > 6 && !showAllActivities && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllActivities(true)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-full shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
              >
                {t('common.show_more')} <Plus className="w-4 h-4" />
              </button>
            </div>
          )}

          {showAllActivities && filteredActivities.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllActivities(false)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-black rounded-full transition-all uppercase tracking-widest"
              >
                Réduire <ArrowRight className="w-4 h-4 rotate-90" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section - Focused Vertical Style */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden border-y border-slate-100 dark:border-slate-800 cursor-grab">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-200 dark:via-blue-900 to-transparent hidden md:block" />

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 uppercase">
              {t('about.timeline_pre')} <span className="text-blue-600 italic">{t('about.timeline_highlight')}</span>
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="space-y-16 max-h-[600px] overflow-y-auto cursor-grab">
            {(timelinePosts.length > 0 ? timelinePosts : (t('about.timeline_items', { returnObjects: true }) as any[]))
              .sort((a: any, b: any) => {
                // Handle both dynamic posts (date string) and static objects (year string)
                const dateA = a.date || a.year;
                const dateB = b.date || b.year;
                return dateA.localeCompare(dateB);
              })
              .map((item: any, index: number) => {
                // Map dynamic post fields to the layout expected by the timeline
                const displayItem = {
                  year: item.date ? item.date.split('-')[0] : item.year,
                  tag: item.category ? t(`categories.${item.category}`, { defaultValue: item.category }) : (item.tag ? t(`categories.${item.tag}`, { defaultValue: item.tag }) : ''),
                  title: item.title,
                  text: item.content || item.text,
                  image: item.imageUrl || item.image
                };

                return (
                  <div key={index} className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} cursor-grab`}>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md z-10 hidden md:block" />

                    <div className="flex-1 w-full">
                      <div className={`p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <span className="inline-block px-3 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-full mb-3 uppercase tracking-wider">{displayItem.tag}</span>
                        <h3 className="text-3xl md:text-5xl font-black text-blue-600 mb-2 opacity-20">{displayItem.year}</h3>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{displayItem.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{displayItem.text}</p>
                      </div>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="relative group overflow-hidden rounded-3xl h-[200px] shadow-lg">
                        <img src={displayItem.image} alt={displayItem.year} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
