import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Download, BookOpen, GraduationCap, Info, ExternalLink } from 'lucide-react';
import { dictionaryData, categories } from '../data/dictionaryData';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DictionaryPdf } from '../components/dictionary/DictionaryPdf';
import Header from '../components/ui/header';
import Footer from '../components/ui/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Dictionary = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredItems = dictionaryData.filter(item => {
        const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase">
                        <GraduationCap className="w-3 h-3" />
                        {t('dictionary.badge')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        {t('dictionary.title_pre')} <span className="text-blue-600 italic">{t('dictionary.title_highlight')}</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        {t('dictionary.subtitle')}
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white dark:bg-slate-950 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            type="text"
                            placeholder={t('dictionary.search_placeholder')}
                            className="pl-12 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl h-12 focus:ring-2 focus:ring-blue-500 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                    activeCategory === cat.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {t(`dictionary.cat_${cat.id}`)}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <PDFDownloadLink
                            document={<DictionaryPdf items={filteredItems} />}
                            fileName="dictionnaire-lsf-asafs.pdf"
                            className="flex-1 md:flex-initial"
                        >
                            {({ loading }) => (
                                <Button 
                                    disabled={loading}
                                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-2xl h-12 hover:scale-105 transition-all gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    {loading ? t('dictionary.preparing') : t('dictionary.download_pdf')}
                                </Button>
                            )}
                        </PDFDownloadLink>

                        <a 
                            href="https://www.pisourd.ch/?theme=dicocomplet" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-initial"
                        >
                            <Button 
                                variant="outline"
                                className="w-full border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black uppercase tracking-widest text-[10px] rounded-2xl h-12 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                {t('dictionary.learn_more_external')}
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 pt-8">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div 
                                key={item.id}
                                className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-1"
                            >
                                <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-3xl mb-4 flex items-center justify-center p-6 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400 group-hover:text-blue-600 transition-colors animate-in fade-in duration-500">
                                        <path
                                            d={item.svgPath}
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                        {item.label}
                                    </h3>
                                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                                        {item.category === 'alphabet' ? t('dictionary.letter', { defaultValue: 'Lettre' }) : t(`dictionary.cat_${item.category}`, { defaultValue: item.category })}
                                    </p>
                                </div>

                                {/* Tooltip on Hover */}
                                <div className="absolute inset-0 bg-blue-600 p-6 rounded-[2rem] text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center pointer-events-none">
                                    <Info className="w-6 h-6 mb-3 opacity-50" />
                                    <p className="text-xs font-bold leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto">
                                <Search className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-slate-400 font-medium italic">{t('dictionary.no_results')}</p>
                        </div>
                    )}
                </div>

                {/* Educational Note */}
                <div className="mt-20 p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-blue-600/30">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full" />
                    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shrink-0">
                            <GraduationCap className="w-10 h-10" />
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-3xl font-black uppercase tracking-tight">{t('dictionary.advice_title')}</h2>
                            <p className="text-blue-100 font-medium leading-relaxed max-w-3xl">
                                {t('dictionary.advice_text')}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dictionary;
