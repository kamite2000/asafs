import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useContent } from "@/lib/ContentContext";
import Footer from '@/components/ui/Footer';
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";



export default function Events() {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const { getPublishedPostsByType } = useContent();
    const events = getPublishedPostsByType('evenement');

    const getEventStatus = (startDateStr: string, endDateStr?: string) => {
        if (!startDateStr) return 'future';
        const now = new Date();
        const startDate = new Date(startDateStr);
        const endDate = endDateStr ? new Date(endDateStr) : null;
        
        now.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        if (endDate) endDate.setHours(23, 59, 59, 999);

        if (endDate && now > endDate) return 'past';
        if (!endDate && startDate < now) return 'past';
        if (now < startDate) return 'future';
        return 'current';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'past': return 'bg-red-500';
            case 'current': return 'bg-green-500';
            case 'future': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const getTextColorClass = (status: string) => {
        switch (status) {
            case 'past': return 'text-red-500';
            case 'current': return 'text-green-500';
            case 'future': return 'text-yellow-600';
            default: return 'text-gray-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'past': return t('events.status_past');
            case 'current': return t('events.status_current');
            case 'future': return t('events.status_future');
            default: return '';
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(i18n.language === 'swa' ? 'sw-TZ' : i18n.language, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            {/* Hero Section - Minimalist */}
            <div className="relative py-12 mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-slate-950">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent z-10" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <span className="inline-block px-2.5 py-0.5 bg-blue-600/30 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-300 text-[9px] font-black tracking-widest uppercase mb-3">
                        {t('events.badge')}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tighter uppercase">
                        {t('events.hero_pre')} <span className="text-blue-500 italic">{t('events.hero_highlight')}</span>
                    </h1>
                    <p className="text-sm text-slate-400 max-w-xl leading-relaxed font-medium">
                        {t('events.hero_subtitle')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.length > 0 ? (
                        events.map((event, i) => (
                            <Dialog key={i}>
                                <DialogTrigger asChild>
                                    <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer transition-colors duration-300">
                                        <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                                            {event.imageUrl ? (
                                                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-200 text-sm font-black uppercase">ASAFS</div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase flex items-center gap-1">
                                                    📅 {event.endDate ? `${t('common.from')} ${formatDate(event.date)} ${t('common.to')} ${formatDate(event.endDate)}` : formatDate(event.date)}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(getEventStatus(event.date, event.endDate))}`} />
                                                    <span className={`text-[9px] font-black uppercase ${getTextColorClass(getEventStatus(event.date, event.endDate))}`}>
                                                        {getStatusText(getEventStatus(event.date, event.endDate))}
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors uppercase truncate tracking-tight">
                                                {event.title}
                                            </h3>
                                            <p className="text-[12px] text-slate-500 dark:text-slate-400 line-clamp-2 font-medium leading-snug">
                                                {event.content}
                                            </p>
                                            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-50 dark:border-slate-800/50">
                                                 <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{event.author || t('programs.team')}</span>
                                                 <span className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase group-hover:translate-x-1 transition-transform">{t('events.details')} →</span>
                                            </div>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl border border-slate-800/10 dark:border-slate-800 bg-white dark:bg-slate-900">
                                    <div className="h-44 relative">
                                         <img src={event.imageUrl || '/placeholder.jpg'} className="w-full h-full object-cover" alt={event.title} />
                                         <div className="absolute inset-0 bg-black/40" />
                                    </div>
                                    <div className="p-6 bg-white dark:bg-slate-900">
                                        <div className="flex items-center gap-3 mb-3">
                                             <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                                                📅 {event.endDate ? `${t('common.from')} ${formatDate(event.date)} ${t('common.to')} ${formatDate(event.endDate)}` : formatDate(event.date)}
                                             </span>
                                             <div className="flex items-center gap-1.5 ml-auto">
                                                <div className={`w-2 h-2 rounded-full ${getStatusColor(getEventStatus(event.date, event.endDate))}`} />
                                                <span className={`text-[10px] font-black uppercase ${getTextColorClass(getEventStatus(event.date, event.endDate))}`}>
                                                    {getStatusText(getEventStatus(event.date, event.endDate))}
                                                </span>
                                             </div>
                                        </div>
                                        <h2 className="text-lg font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">{event.title}</h2>
                                        <div className="prose prose-slate prose-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-wrap max-h-[40vh] overflow-y-auto">
                                            {event.content}
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                             <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[10px] italic">{t('events.no_events')}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
