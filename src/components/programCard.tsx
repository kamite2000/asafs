interface ProgramCardProps {
    image: string;
    title: string;
    subtitle: string;
    description: string;
    imagePosition?: 'left' | 'right';
    status?: 'past' | 'current' | 'future';
  }
  
  import { useTranslation } from 'react-i18next';

  export const ProgramCard = ({
    image,
    title,
    subtitle,
    description,
    imagePosition = 'left',
    status
  }: ProgramCardProps) => {
    const { t } = useTranslation();
    
    const getStatusStyles = () => {
      switch (status) {
        case 'past': return { color: 'bg-red-500', text: t('events.status_past'), textColor: 'text-red-500' };
        case 'current': return { color: 'bg-green-500', text: t('events.status_current'), textColor: 'text-green-500' };
        case 'future': return { color: 'bg-yellow-500', text: t('events.status_future'), textColor: 'text-yellow-600' };
        default: return null;
      }
    };

    const statusStyles = getStatusStyles();

    const content = (
      <div className="space-y-2 p-6 flex-1">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase whitespace-normal truncate">{title}</h3>
            {statusStyles && (
                <div className="flex items-center gap-1.5 shrink-0 ml-4">
                    <div className={`w-2 h-2 rounded-full ${statusStyles.color}`} />
                    <span className={`text-[10px] font-black uppercase ${statusStyles.textColor}`}>
                        {statusStyles.text}
                    </span>
                </div>
            )}
        </div>
        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 tracking-widest uppercase">{subtitle}</p>
        <div className="w-8 h-1 bg-blue-600 rounded-full" />
        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium pt-2">
          {description}
        </p>
      </div>
    );
  
    return (
      <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all transition-colors duration-300">
        {imagePosition === 'left' ? (
          <>
            <div className="w-full md:w-1/2 h-56 md:h-64 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            {content}
          </>
        ) : (
          <>
            <div className="w-full md:w-1/2 h-56 md:h-64 overflow-hidden order-1 md:order-2">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="flex-1 order-2 md:order-1">
                {content}
            </div>
          </>
        )}
      </div>
    );
  };