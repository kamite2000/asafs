import React from 'react';
import { useContent } from '@/lib/ContentContext';
import Footer from '@/components/ui/Footer';
import { Calendar, Users, Target, Award, ArrowRight } from 'lucide-react';

const About = () => {
  const { getPublishedPostsByType } = useContent();
  const [selectedCategory, setSelectedCategory] = React.useState('Toutes');
  
  const aboutPosts = getPublishedPostsByType('about');
  const activities = getPublishedPostsByType('activite');

  const filteredActivities = activities.filter(activity => 
    selectedCategory === 'Toutes' || activity.category === selectedCategory
  );

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
            Notre Mission
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            QUI SOMMES-NOUS <span className="text-blue-500 italic">!?</span>
          </h1>
          <p className="text-lg text-gray-200 font-medium max-w-2xl mx-auto">
            Découvrez notre histoire, nos objectifs et la vision qui nous anime au quotidien.
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
                src="/MARTHE.jpg"
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
              <p className="text-blue-600 font-bold uppercase tracking-widest text-xs translate-y-[-0.5rem]">Coordinatrice Générale</p>
              
              <div className="prose prose-slate prose-sm max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                <p className="text-base md:text-lg italic">
                  "L'autonomisation des femmes sourdes n'est pas seulement un objectif, c'est un impératif de justice sociale. 
                  À travers l'ASAFS, nous bâtissons un pont entre le silence et l'opportunité."
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg shadow-sm flex items-center justify-center text-blue-600">
                     <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Vision</p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 font-bold">Inclusion Totale</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg shadow-sm flex items-center justify-center text-blue-600">
                     <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Impact</p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 font-bold">Solidarité Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Focused Vertical Style */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden border-y border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-200 dark:via-blue-900 to-transparent hidden md:block" />
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 uppercase">
              NOTRE <span className="text-blue-600 italic">PARCOURS</span>
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="space-y-16">
            {[
              { year: '2019', title: 'L\'Eveil de la Conscience', text: 'Début des actions de sensibilisation et éducation sur la problématique du genre.', image: '/Rectangle 29.png', tag: 'AUTONOMIE' },
              { year: '2020', title: 'Protection & Soutien', text: 'Création des premières cliniques juridiques pour les femmes victimes de SGBV.', image: '/Rectangle 30.png', tag: 'SOUVERAINETÉ' },
              { year: '2021', title: 'Expansion des Droits', text: 'Renforcement du réseau d\'accompagnement juridique et social provincial.', image: '/Rectangle 25.png', tag: 'MOBILISATION' },
              { year: '2023', title: 'Consolidation', text: 'Élargissement des programmes de formation pour l\'autonomisation économique.', image: '/Rectangle 27.png', tag: 'VALORISATION' }
            ].map((item, index) => (
              <div key={item.year} className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md z-10 hidden md:block" />
                
                <div className="flex-1 w-full">
                  <div className={`p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="inline-block px-3 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-full mb-3 uppercase tracking-wider">{item.tag}</span>
                    <h3 className="text-3xl md:text-5xl font-black text-blue-600 mb-2 opacity-20">{item.year}</h3>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.text}</p>
                  </div>
                </div>
                
                <div className="flex-1 w-full">
                  <div className="relative group overflow-hidden rounded-3xl h-[200px] shadow-lg">
                    <img src={item.image} alt={item.year} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section - Smart Grid */}
      <section className="py-16 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 uppercase">
              NOS <span className="text-blue-600 italic">ACTIVITÉS</span> DE TERRAIN
            </h2>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Toutes', 'Éducation', 'Plaidoyer', 'Social', 'Santé'].map((cat) => (
                <button
                  key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all border-2 ${
                    selectedCategory === cat 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-blue-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
                   {activity.imageUrl && (
                     <div className="relative h-44 overflow-hidden">
                       <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md rounded-full text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest shadow-sm">
                         {activity.category || 'Général'}
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
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <Target className="w-8 h-8 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium italic">Aucune activité dans cette catégorie.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Actualités Section - Modern Feed */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              Actualités <span className="text-blue-600 italic">Récentes</span>
            </h2>
            <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">Tout voir</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutPosts.length > 0 ? (
              aboutPosts.map((post) => (
                <div key={post.id} className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all">
                  <div className="text-blue-600 dark:text-blue-400 text-[10px] font-black mb-3 uppercase flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 line-clamp-2">
                    {post.content}
                  </p>
                  <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                    Lire <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                 <p className="text-slate-400 dark:text-slate-500 text-sm italic">Pas de nouvelles pour le moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
