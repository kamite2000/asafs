import React from 'react';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/Footer';
import { useTranslation } from 'react-i18next';

export default function Newsletter() {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Header />
      <div className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">{t('newsletter_page.title')}</h1>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-8" />
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-12 max-w-2xl mx-auto border border-slate-100 dark:border-slate-800">
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 text-center font-medium whitespace-pre-line leading-relaxed">
              {t('newsletter_page.subtitle')}
            </p>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  {t('newsletter_page.name_label')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
                  placeholder={t('newsletter_page.placeholder_name')}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  {t('newsletter_page.email_label')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
                  placeholder={t('newsletter_page.placeholder_email')}
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-sm tracking-widest py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
              >
                {t('newsletter_page.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
