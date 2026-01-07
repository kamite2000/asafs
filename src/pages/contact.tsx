import React from 'react';
import Footer from '@/components/ui/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
           <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />
           <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-block px-4 py-1.5 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-400 text-sm font-bold tracking-widest uppercase mb-6">
            {t('nav.contact')}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 dark:border-slate-800">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 font-bold">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('contact.office_title')}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {t('contact.office_address')}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 dark:border-slate-800">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('contact.email_phone', { defaultValue: 'Email & Phone' })}</h3>
              <div className="space-y-2">
                <a href="mailto:contact@asafs.org" className="block text-slate-500 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors italic">contact@asafs.org</a>
                <a href="tel:+243123456789" className="block text-slate-900 dark:text-slate-200 font-black">+243 123 456 789</a>
              </div>
            </div>

            <div className="bg-slate-900 dark:bg-slate-900/50 p-8 rounded-[2.5rem] shadow-2xl text-white border border-transparent dark:border-slate-800">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 font-bold">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('contact.availability_title')}</h3>
              <p className="text-slate-400 dark:text-slate-400 text-sm font-medium leading-relaxed">
                {t('contact.availability_weekdays')} <br />
                {t('contact.availability_saturday')}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-blue-900/10 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                   <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('contact.title')}</h2>
                   <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Nous vous répondrons sous 24h à 48h.</p>
                </div>
              </div>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = Object.fromEntries(formData.entries());
                  
                  if (!data.name || !data.email || !data.message) return;
                  
                  try {
                    const btn = e.currentTarget.querySelector('button');
                    if (btn) btn.disabled = true;
                    
                    const { default: api } = await import('@/services/api');
                    const { toast } = await import('sonner');
                    
                    await api.post('/contact', data);
                    toast.success(t('contact.success_send', { defaultValue: 'Message envoyé avec succès !' }));
                    (e.target as HTMLFormElement).reset();
                  } catch (error) {
                    const { toast } = await import('sonner');
                    toast.error(t('contact.error_send', { defaultValue: 'Erreur lors de l\'envoi du message' }));
                  } finally {
                    const btn = e.currentTarget.querySelector('button');
                    if (btn) btn.disabled = false;
                  }
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('contact.name')}</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      placeholder="Jean Dupont"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:text-white transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('contact.email')}</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="jean@example.com"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:text-white transition-all" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('contact.subject')}</label>
                  <input 
                    name="subject"
                    type="text" 
                    required
                    placeholder={t('contact.placeholder_subject', { defaultValue: 'Sujet de votre message' })}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:text-white transition-all" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('contact.message')}</label>
                  <textarea 
                    name="message"
                    required
                    rows={6} 
                    placeholder={t('contact.placeholder_message', { defaultValue: 'Comment pouvons-nous vous aider ?' })}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:text-white transition-all resize-none" 
                  />
                </div>

                <button type="submit" className="flex items-center justify-center gap-3 w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/20 transition-all group disabled:opacity-50">
                  {t('contact.send')}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;