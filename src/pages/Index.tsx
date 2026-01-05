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
import { BookOpen, Video, FileText, ChevronRight, Play, Target, Shield, Salad, Scale, HeartHandshake } from "lucide-react";

const Index = () => {
  const { getPublishedPostsByType } = useContent();
  const carouselPosts = getPublishedPostsByType('carousel');
  const eventPosts = getPublishedPostsByType('evenement').slice(0, 2);
  const programmePosts = getPublishedPostsByType('programme').slice(0, 3);

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
            Solidarité & Impact
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            L'ACTION SOLIDAIRE POUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              L'AUTONOMISATION
            </span> <br />
            DES FEMMES SOURDES.
          </h1>
          
          <p className="text-base md:text-lg text-gray-300 max-w-2xl font-medium leading-relaxed">
            Une association inclusive, propulsée par un souffle de solidarité. 
            Ensemble, nous brisons les barrières et créons des opportunités.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link to="/about" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-900/40 transition-all hover:scale-105 active:scale-95 text-center">
              Notre Histoire
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-all text-center">
              Nous Contacter
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section - Clean & Compact */}
      <div className="relative py-16 bg-slate-50 dark:bg-slate-900/50 overflow-hidden border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
             <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
              L'IMPACT EN <span className="text-blue-600 italic">CHIFFRES</span>
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Personnes sourdes en RDC", value: "+ 2,22 M", icon: "🌍" },
              { label: "Femmes formées", value: "250+", icon: "🎓" },
              { label: "Participants aux ateliers", value: "±300", icon: "🤝" },
              { label: "Projets complétés", value: "15", icon: "✅" }
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
              Vision & Engagement
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">
              NOTRE <span className="text-blue-500 italic">MISSION</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="group relative aspect-video bg-slate-800 dark:bg-slate-900 rounded-br-[3rem] rounded-tl-[3rem] overflow-hidden border border-white/5 shadow-2xl shadow-blue-900/20">
              <img 
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop" 
                alt="Mission ASAFS" 
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest text-center">
                  Découvrez l'histoire derrière notre action
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives Section - Professional Grid */}
      <div className="py-20 bg-white dark:bg-slate-950 transition-all">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-2.5 py-0.5 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-600 text-[9px] font-black tracking-widest uppercase mb-3 text-center">
              Nos Priorités
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase text-center">
              NOS <span className="text-blue-600 italic">OBJECTIFS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-5 h-5 text-blue-600" />,
                title: "Droit & Protection",
                content: "Promouvoir, Prévenir et Défendre les droits des femmes sourdes en particulier et de la population dans les domaines de la santé, éducation et entrepreneuriat."
              },
              {
                icon: <Target className="w-5 h-5 text-blue-600" />,
                title: "Inclusion & Genre",
                content: "Promouvoir activement l'égalité des genres, l'inclusion sociale et lutter contre toute forme de discrimination au sein de la société."
              },
              {
                icon: <Salad className="w-5 h-5 text-blue-600" />,
                title: "Sécurité Alimentaire",
                content: "Lutter contre la famine en compensant le déficit alimentaire par la promotion et la diffusion de pratiques agricoles innovantes et durables."
              },
              {
                icon: <Scale className="w-5 h-5 text-blue-600" />,
                title: "Accès à la Justice",
                content: "Accompagner juridiquement les femmes sourdes, en particulier les victimes de violences, pour leur garantir un accès équitable à la justice."
              },
              {
                icon: <HeartHandshake className="w-5 h-5 text-blue-600" />,
                title: "Plaidoyer Social",
                content: "Militer pour les droits des femmes vulnérables et celles vivant avec handicap, victimes de violences sexuelles ou basées sur le genre."
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
                ÉVÉNEMENTS <span className="text-blue-600 italic">À VENIR</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-xl text-base">Découvrez nos prochaines activités et ateliers de sensibilisation.</p>
            </div>
            <Link to="/evenement" className="text-blue-600 text-sm font-bold flex items-center gap-2 group mb-1">
              Voir tout l'agenda <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                      En savoir plus
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-8 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-400 text-sm font-medium italic">Aucun événement prévu pour le moment.</p>
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
              Apprentissage & Outils
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              RESSOURCES EN <span className="text-blue-600 italic">LANGUE DES SIGNES</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm font-medium">
              Des outils interactifs conçus pour faciliter la communication et l'inclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: <BookOpen className="w-5 h-5" />, 
                title: "Dictionnaire LSF", 
                desc: "Accédez à notre dictionnaire de langue des signes française en ligne.",
                btn: "Consulter"
              },
              { 
                icon: <Video className="w-5 h-5" />, 
                title: "Cours en Ligne", 
                desc: "Apprenez la langue des signes avec nos cours vidéo interactifs.",
                btn: "Commencer"
              },
              { 
                icon: <FileText className="w-5 h-5" />, 
                title: "Guide Pratique", 
                desc: "Téléchargez notre guide pratique pour débuter en langue des signes.",
                btn: "Télécharger"
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
                <Link to="#" className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 dark:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-600 transition-all">
                  {resource.btn} <ChevronRight className="w-3 h-3" />
                </Link>
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
              NOTRE <span className="text-blue-500 italic">HISTOIRE</span> EN IMAGES
            </h2>
            <p className="text-slate-400 text-base">Moments forts et impact de notre action au quotidien.</p>
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
               <p className="text-slate-500 text-sm italic">Galerie en cours de mise à jour...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
