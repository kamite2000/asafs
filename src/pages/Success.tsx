import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Heart, Share2, ArrowRight, Download } from 'lucide-react';
import Footer from '@/components/ui/Footer';
import { useTranslation } from 'react-i18next';

const Success = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <main className="pt-24 pb-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Success Icon Animation */}
                    <div className="relative mb-10 inline-block">
                        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full animate-pulse" />
                        <div className="relative z-10 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/40">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-tight">
                        {t('success.title')}
                    </h1>
                    
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        {t('success.subtitle')}
                    </p>

                    {/* Impact Card */}
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 mb-12 border border-slate-100 dark:border-slate-800 text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full transition-all group-hover:scale-150" />
                        
                        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                                <Heart className="w-10 h-10 text-white fill-current" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 uppercase">{t('success.impact_title')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                                    {t('success.impact_desc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions Grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all">
                            <Download className="w-4 h-4" />
                            {t('success.btn_receipt')}
                        </button>
                        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black uppercase text-sm tracking-widest hover:border-blue-500 transition-all">
                            <Share2 className="w-4 h-4" />
                            {t('success.btn_share')}
                        </button>
                    </div>

                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[11px] group"
                    >
                        {t('success.return_home')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Success;
