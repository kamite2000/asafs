import React from 'react';
import { Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useContent } from "@/lib/ContentContext";
import Footer from '@/components/ui/Footer';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

function EventCard({ date, title, description }: { date: string; title: string; description: string }) {
    const getEventStatus = (eventDate: string) => {
        const now = new Date();
        const event = new Date(eventDate);

        now.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);

        if (event < now) {
            return 'past';
        } else if (event.getTime() === now.getTime()) {
            return 'current';
        } else {
            return 'future';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'past':
                return 'bg-red-500';
            case 'current':
                return 'bg-yellow-500';
            case 'future':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'past':
                return 'Passé';
            case 'current':
                return 'En cours';
            case 'future':
                return 'À venir';
            default:
                return '';
        }
    };

    const getTextColorClass = (status: string) => {
        switch (status) {
            case 'past':
                return 'text-red-500';
            case 'current':
                return 'text-yellow-600';
            case 'future':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };

    const status = getEventStatus(date);
    const statusColor = getStatusColor(status);
    const statusText = getStatusText(status);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex gap-6 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer text-left w-full group">
                    <div className="w-48 h-32 bg-gray-200 flex-shrink-0" />
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-2 text-blue-600">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${statusColor}`} />
                                <span className={`text-sm font-medium ${getTextColorClass(status)}`}>
                                    {statusText}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
                        <p className="text-gray-600 line-clamp-2">{description}</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-2">{title}</DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${statusColor}`} />
                            <span className={`font-medium ${getTextColorClass(status)}`}>
                                {statusText}
                            </span>
                        </div>
                    </div>
                </DialogHeader>
                <div className="mt-4">
                    <div className="w-full h-64 bg-gray-200 mb-6 rounded-lg" />
                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {description}
                        </p>
                        <p className="text-gray-700 leading-relaxed text-lg mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function Events() {
    const location = useLocation();
    console.log(location.state);

    const { getPublishedPostsByType } = useContent();
    const events = getPublishedPostsByType('evenement');

    return (
        <>
            {/* Hero Section - Minimalist */}
            <div className="relative py-12 mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-slate-950">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent z-10" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <span className="inline-block px-2.5 py-0.5 bg-blue-600/30 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-300 text-[9px] font-black tracking-widest uppercase mb-3">
                        Calendrier
                    </span>
                    <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tighter uppercase">
                        NOS <span className="text-blue-500 italic">ÉVÉNEMENTS</span>
                    </h1>
                    <p className="text-sm text-slate-400 max-w-xl leading-relaxed font-medium">
                        Découvrez nos activités et participez à nos prochaines rencontres solidaires.
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
                                            <div className="text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase mb-1">📅 {event.date}</div>
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors uppercase truncate tracking-tight">
                                                {event.title}
                                            </h3>
                                            <p className="text-[12px] text-slate-500 dark:text-slate-400 line-clamp-2 font-medium leading-snug">
                                                {event.content}
                                            </p>
                                            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-50 dark:border-slate-800/50">
                                                 <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{event.author || 'ASAFS'}</span>
                                                 <span className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase group-hover:translate-x-1 transition-transform">Détails →</span>
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
                                             <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-md text-[9px] font-black uppercase tracking-wider">📅 {event.date}</span>
                                        </div>
                                        <h2 className="text-lg font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">{event.title}</h2>
                                        <div className="prose prose-slate prose-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-wrap line-clamp-6">
                                            {event.content}
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                             <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[10px] italic">Aucun événement.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
