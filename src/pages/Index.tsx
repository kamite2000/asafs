/** @format */

import * as React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import App from "@/App";
import Footer from "@/components/ui/Footer";
import {
  Carousel,
  CarouselItem,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useContent } from "@/lib/ContentContext";
import { BookOpen, Video, FileText, ChevronRight, Play, Target, Shield, Salad, Scale, HeartHandshake, ExternalLink, Users, GraduationCap, Globe, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";


import { useSettings } from "@/hooks/useAdminData";

const Index = () => {
  const { t } = useTranslation();
  const { data: settings } = useSettings();
  const { getPublishedPostsByType } = useContent();
  const carouselPosts = getPublishedPostsByType('carousel');
  const eventPosts = getPublishedPostsByType('evenement').slice(0, 2);
  const programmePosts = getPublishedPostsByType('programme').slice(0, 3);
  const partnerPosts = getPublishedPostsByType('partenaire');
  const newsPosts = getPublishedPostsByType('about');
  const [showAllNews, setShowAllNews] = React.useState(false);
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    return url;
  };

  const displayedNews = showAllNews ? newsPosts : newsPosts.slice(0, 3);

  return (
    <div className="flex overflow-hidden flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section - Professional Polish */}
      <div className="relative flex flex-col items-start px-6 md:px-16 py-16 md:py-24 w-full min-h-[500px] lg:min-h-[600px] overflow-hidden">
        <img
          loading="lazy"
          src="/hand fn.jpg"
          className="object-cover absolute inset-0 size-full scale-105"
          alt="ASAFS Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-block px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-400 text-[10px] font-black tracking-widest uppercase mb-2">
            {t('hero.badge')}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            {t('hero.title_part1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              {t('hero.title_part2')}
            </span> <br />
            {t('hero.title_part3')}
          </h1>
          
          <p className="text-base md:text-lg text-gray-300 max-w-2xl font-medium leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link to="/about" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-900/40 transition-all hover:scale-105 active:scale-95 text-center">
              {t('hero.btn_history')}
            </Link>
            <Link to="/don" className="px-8 py-3 bg-white/10 backdrop-blur-md border border-yellow-400 dark:border-yellow-400 hover:bg-white/20 hover:border-yellow-300 text-white text-sm font-bold rounded-lg transition-all text-center">
              {t('nav.donate')}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section - Clean & Compact */}
      <div className="relative py-16 bg-slate-50 dark:bg-slate-900/50 overflow-hidden border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
             <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
              {t('stats.title')} <span className="text-blue-600 italic">{t('stats.subtitle')}</span>
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: t('stats.stat1'), value: "+ 2,22 M", icon: "🌍" },
              { label: t('stats.stat2'), value: "250+", icon: "🎓" },
              { label: t('stats.stat3'), value: "±300", icon: "🤝" },
              { label: t('stats.stat4'), value: "15", icon: "✅" }
            ].map((stat, i) => (
              <div key={i} className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl hover:border-blue-100 hover:-translate-y-1">
                <div className="text-3xl mb-3 grayscale group-hover:grayscale-0 transition-all">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1 tracking-tight group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Video Section - Modern & Sharp */}
      <div className="py-20 bg-slate-900 dark:bg-slate-950 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-2.5 py-0.5 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-[9px] font-black tracking-widest uppercase mb-3">
              {t('mission.badge')}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">
              {t('mission.title')}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="group relative aspect-video bg-slate-800 dark:bg-slate-900 rounded-br-[3rem] rounded-tl-[3rem] overflow-hidden border border-white/5 shadow-2xl shadow-blue-900/20">
              <iframe
                src={getEmbedUrl(settings?.missionVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ')}
                title="Mission Video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives Section - Professional Grid */}
      <div className="py-20 bg-white dark:bg-slate-950 transition-all">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-2.5 py-0.5 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-600 text-[9px] font-black tracking-widest uppercase mb-3 text-center">
              {t('objectives.badge')}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase text-center">
              {t('objectives.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-5 h-5 text-blue-600" />,
                title: t('objectives.obj1_title'),
                content: t('objectives.obj1_desc')
              },
              {
                icon: <Target className="w-5 h-5 text-blue-600" />,
                title: t('objectives.obj2_title'),
                content: t('objectives.obj2_desc')
              },
              {
                icon: <Salad className="w-5 h-5 text-blue-600" />,
                title: t('objectives.obj3_title'),
                content: t('objectives.obj3_desc')
              },
              {
                icon: <Scale className="w-5 h-5 text-blue-600" />,
                title: t('objectives.obj4_title'),
                content: t('objectives.obj4_desc')
              },
              {
                icon: <HeartHandshake className="w-5 h-5 text-blue-600" />,
                title: t('objectives.obj5_title'),
                content: t('objectives.obj5_desc')
              },
              {
                icon: <Users className="w-5 h-5 text-blue-600" />,
                title: t('objectives.obj6_title'),
                content: t('objectives.obj6_desc')
              },
              {
                icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
                title: t('objectives.obj7_title'),
                content: t('objectives.obj7_desc')
              },
              {
                icon: <Globe className="w-5 h-5 text-blue-600" />,
                title: t('objectives.obj8_title'),
                content: t('objectives.obj8_desc')
              },
              {
                icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
                title: t('objectives.obj9_title'),
                content: t('objectives.obj9_desc')
              }
            ].map((obj, i) => (
              <div key={i} className="group relative bg-slate-50 dark:bg-slate-900 p-7 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full">
                <div className="mb-4 bg-white dark:bg-slate-800 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {obj.icon}
                </div>
                <h3 className="text-[12px] font-black text-blue-600 uppercase tracking-widest mb-3">{obj.title}</h3>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium flex-grow">
                  {obj.content}
                </p>
                <div className="mt-4 flex justify-end">
                   <div className="w-8 h-0.5 bg-blue-600/30 rounded-full group-hover:w-12 group-hover:bg-blue-600 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events Section - Quick Grid */}
      <div className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                {t('events.title')}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-xl text-base">{t('events.subtitle')}</p>
            </div>
            <Link to="/evenement" className="text-blue-600 text-sm font-bold flex items-center gap-2 group mb-1">
              {t('events.view_all')} <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventPosts.length > 0 ? (
              eventPosts.map((event) => (
                <div key={event.id} className="group relative bg-slate-900 rounded-3xl overflow-hidden shadow-xl h-[320px] border border-white/5">
                  {event.imageUrl && (
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                    <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3">
                      <span className="px-2 py-1 bg-blue-600/20 backdrop-blur-md rounded-md">📅 {event.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors uppercase">
                      {event.title}
                    </h3>
                    <p className="text-slate-300 line-clamp-2 mb-4 text-sm font-medium">
                      {event.content}
                    </p>
                    <Link to="/evenement" className="inline-block px-6 py-2 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                      {t('events.learn_more')}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-8 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-400 text-sm font-medium italic">{t('events.no_events')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sign Language Resources Section - Modern & Compact */}
      <div className="py-16 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-block px-2.5 py-0.5 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-600 text-[9px] font-black tracking-widest uppercase mb-3">
              {t('resources.badge')}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              {t('resources.title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm font-medium">
              {t('resources.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: <BookOpen className="w-5 h-5" />, 
                title: t('resources.res1_title'), 
                desc: t('resources.res1_desc'),
                btn: t('resources.res1_btn'),
                link: "/dictionnaire",
                external: false
              },
              { 
                icon: <Video className="w-5 h-5" />, 
                title: t('resources.res2_title'), 
                desc: t('resources.res2_desc'),
                btn: t('resources.res2_btn'),
                link: "https://www.youtube.com/watch?v=GP3MGXvri_Y&list=PLaxcImf_H8aDo0v2EQRiv1Ml0Jg5WTI9o",
                external: true
              },
              { 
                icon: <FileText className="w-5 h-5" />, 
                title: t('resources.res1_btn') === "Consulter" ? "Guide Pratique" : t('resources.res3_title'), 
                desc: t('resources.res3_desc'),
                btn: t('resources.res3_btn'),
                link: "https://www.lambert-lucas.com/wp-content/uploads/2018/10/petit_dictionnaire_oa_tr.pdf", 
                external: true
              },
            ].map((resource, i) => (
              <div key={i} className="group bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{resource.title}</h3>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                  {resource.desc}
                </p>
                {resource.external ? (
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 dark:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-600 transition-all"
                  >
                    {resource.btn} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <Link 
                    to={resource.link} 
                    className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 dark:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-600 transition-all"
                  >
                    {resource.btn} <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Section - Focused History */}
      <div className="py-16 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/10 blur-[120px] rounded-full" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-2 uppercase">
              {t('carousel.title')}
            </h2>
            <p className="text-slate-400 text-base">{t('carousel.subtitle')}</p>
          </div>

          {carouselPosts.length > 0 ? (
            <Carousel opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {carouselPosts.map((post, i) => (
                  <CarouselItem key={post.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden min-h-[400px] shadow-2xl mx-1 md:mx-2">
                      <div className="relative group overflow-hidden h-[250px] md:h-full">
                        <img
                          src={post.imageUrl || '/placeholder-carousel.jpg'}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-transparent" />
                      </div>
                      <div className="p-6 md:p-10 flex flex-col justify-center">
                        <span className="text-blue-500 font-mono tracking-widest text-[10px] mb-3 uppercase font-black">
                          {String(i + 1).padStart(2, '0')} / IMPACT STORY
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 font-medium">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-1 bg-blue-500 rounded-full" />
                           <span className="text-slate-500 text-xs font-bold uppercase">{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-3">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 bg-white/5 border-white/10 text-white hover:bg-blue-600 hover:border-blue-600" />
                <CarouselNext className="static translate-y-0 h-10 w-10 bg-white/5 border-white/10 text-white hover:bg-blue-600 hover:border-blue-600" />
              </div>
            </Carousel>
          ) : (
            <div className="py-16 text-center bg-white/5 rounded-3xl border border-white/10">
               <p className="text-slate-500 text-sm italic">{t('carousel.no_images')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actualités Section - Modern Feed */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-2">
                {t('about.news_pre')} <span className="text-blue-600 italic">{t('about.news_highlight')}</span>
              </h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
            </div>
            {!showAllNews && newsPosts.length > 3 && (
              <button 
                onClick={() => setShowAllNews(true)}
                className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2"
              >
                {t('about.view_all')} <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsPosts.length > 0 ? (
              displayedNews.map((post) => (
                <Dialog key={post.id}>
                  <DialogTrigger asChild>
                    <div className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <div className="text-blue-600 dark:text-blue-400 text-[10px] font-black mb-4 uppercase flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 uppercase tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 line-clamp-3">
                        {post.content}
                      </p>
                      <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                        {t('about.read_more')} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl border border-slate-800/10 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="h-44 relative">
                        {post.imageUrl ? (
                            <img src={post.imageUrl} className="w-full h-full object-cover" alt={post.title} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-950 text-white font-black text-2xl uppercase">ASAFS</div>
                        )}
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase mb-4">
                            <Calendar className="w-3 h-3" /> {post.date}
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">{post.title}</h2>
                        <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-wrap max-h-[50vh] overflow-y-auto pr-2">
                            {post.content}
                        </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                 <p className="text-slate-400 dark:text-slate-500 text-sm italic">{t('about.no_news')}</p>
              </div>
            )}
          </div>

          {newsPosts.length > 3 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAllNews(!showAllNews)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95"
              >
                {showAllNews ? t('common.show_less') : t('common.show_more')}
                <ArrowRight className={`w-3 h-3 transition-transform ${showAllNews ? '-rotate-90' : 'rotate-90'}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Partners Section - Trusted Collaborations */}
      <div className="py-16 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-widest uppercase opacity-50">
              {t('home.partners_title')}
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {partnerPosts.length > 0 ? (
              partnerPosts.map((partner) => (
                <div key={partner.id} className="group flex flex-col items-center gap-3 transition-all duration-500">
                  {partner.content && partner.content.startsWith('http') ? (
                    <a href={partner.content} target="_blank" rel="noopener noreferrer" className="relative">
                       <img 
                        src={partner.imageUrl} 
                        alt={partner.title} 
                        className="h-16 md:h-20 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                      />
                    </a>
                  ) : (
                    <img 
                      src={partner.imageUrl} 
                      alt={partner.title} 
                      className="h-16 md:h-20 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                    />
                  )}
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                      {partner.title}
                    </span>
                    {partner.category && (
                      <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-tighter">
                        {t(`categories.${partner.category}`, { defaultValue: partner.category })}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60">
                <img 
                  src="/partners/uwezo-afrika.png" 
                  alt="Uwezo Afrika" 
                  className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" 
                />
                <img 
                  src="/partners/ddc-suisse.png" 
                  alt="DDC Suisse" 
                  className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" 
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
