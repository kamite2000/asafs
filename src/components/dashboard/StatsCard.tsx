import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    color: string;
}

export const StatsCard = ({ title, value, icon: Icon, color }: StatsCardProps) => {
    const getColorClasses = (color: string) => {
        switch (color) {
            case 'blue':
                return {
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                    text: 'text-blue-600 dark:text-blue-400',
                    iconBg: 'bg-blue-600',
                    iconText: 'text-white'
                };
            case 'purple':
                return {
                    bg: 'bg-purple-50 dark:bg-purple-900/20',
                    text: 'text-purple-600 dark:text-purple-400',
                    iconBg: 'bg-purple-600',
                    iconText: 'text-white'
                };
            case 'indigo':
                return {
                    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
                    text: 'text-indigo-600 dark:text-indigo-400',
                    iconBg: 'bg-indigo-600',
                    iconText: 'text-white'
                };
            case 'orange':
                return {
                    bg: 'bg-orange-50 dark:bg-orange-900/20',
                    text: 'text-orange-600 dark:text-orange-400',
                    iconBg: 'bg-orange-600',
                    iconText: 'text-white'
                };
            case 'green':
                return {
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    text: 'text-green-600 dark:text-green-400',
                    iconBg: 'bg-green-600',
                    iconText: 'text-white'
                };
            case 'teal':
                return {
                    bg: 'bg-teal-50 dark:bg-teal-900/20',
                    text: 'text-teal-600 dark:text-teal-400',
                    iconBg: 'bg-teal-600',
                    iconText: 'text-white'
                };
            case 'amber':
                return {
                    bg: 'bg-amber-50 dark:bg-amber-900/20',
                    text: 'text-amber-600 dark:text-amber-400',
                    iconBg: 'bg-amber-600',
                    iconText: 'text-white'
                };
            case 'pink':
                return {
                    bg: 'bg-pink-50 dark:bg-pink-900/20',
                    text: 'text-pink-600 dark:text-pink-400',
                    iconBg: 'bg-pink-600',
                    iconText: 'text-white'
                };
            case 'yellow':
                return {
                    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                    text: 'text-yellow-600 dark:text-yellow-400',
                    iconBg: 'bg-yellow-600',
                    iconText: 'text-white'
                };
            default:
                return {
                    bg: 'bg-slate-50 dark:bg-slate-900/20',
                    text: 'text-slate-600 dark:text-slate-400',
                    iconBg: 'bg-slate-600',
                    iconText: 'text-white'
                };
        }
    };

    const colorClasses = getColorClasses(color);

    return (
        <div className={`group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                        {value}
                    </div>
                </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                {title}
            </div>
        </div>
    );
};
