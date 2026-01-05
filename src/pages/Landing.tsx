import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/ui/Footer';
import { useTranslation } from 'react-i18next';
import Header from '@/components/ui/header';

const Landing = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-white transition-colors duration-300">
            <Header />
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <span className="inline-block px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-400 text-[10px] font-black tracking-widest uppercase mb-4">
                        {t('landing.badge')}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 uppercase">
                        {t('landing.hero_title')}
                    </h1>
                    <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10 font-medium whitespace-pre-line">
                        {t('landing.hero_subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/auth/register" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-black uppercase text-xs tracking-widest transition-transform transform hover:scale-105">
                            {t('landing.btn_start')}
                        </Link>
                        <Link to="/auth/login" className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 rounded-full font-black uppercase text-xs tracking-widest transition-transform transform hover:scale-105">
                            {t('landing.btn_login')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features / Overview Section */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t('landing.features_title')}</h2>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium uppercase text-xs tracking-widest italic">{t('landing.features_subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white uppercase tracking-tight">{t('landing.f1_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {t('landing.f1_desc')}
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white uppercase tracking-tight">{t('landing.f2_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {t('landing.f2_desc')}
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white uppercase tracking-tight">{t('landing.f3_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {t('landing.f3_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-blue-600 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">{t('landing.cta_title')}</h2>
                    <p className="text-xl mb-10 font-medium opacity-90">
                        {t('landing.cta_subtitle')}
                    </p>
                    <Link to="/auth/register" className="inline-block px-10 py-4 bg-white text-blue-600 rounded-full font-black uppercase text-sm tracking-widest shadow-lg hover:bg-gray-100 transition-all hover:scale-105">
                        {t('landing.btn_register')}
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;
