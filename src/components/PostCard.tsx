import React from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Calendar, ArrowRight } from "lucide-react";
import { Post } from "@/hooks/usePosts";

interface PostCardProps {
  post: Post;
  t: (key: string, options?: any) => string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, t }) => {
  return (
    <Dialog key={post.id}>
      <DialogTrigger asChild>
        <div className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
          <div className="text-blue-600 dark:text-blue-400 text-[10px] font-black mb-4 uppercase flex items-center gap-2">
            <Calendar className="w-3 h-3" /> {post.date}
          </div>
          
          {post.imageUrl && (
            <div className="relative h-44 overflow-hidden rounded-2xl mb-4">
              <img 
                src={post.imageUrl} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={post.title} 
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md rounded-full text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest shadow-sm">
                {post.category ? t(`categories.${post.category}`, { defaultValue: post.category }) : t('about.cat_general')}
              </div>
            </div>
          )}

          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 uppercase tracking-tight">
            {post.title}
          </h3>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 line-clamp-3 flex-grow">
            {post.content}
          </p>
          <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition-transform mt-auto">
            {t('about.read_more')} <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl border border-slate-800/10 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="h-44 relative">
            {post.imageUrl ? (
                <img src={post.imageUrl} className="w-full h-full object-cover" alt={post.title} />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-950 text-white font-black text-2xl uppercase">ASAFS</div>
            )}
            <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="p-8 overflow-y-auto max-h-[60vh]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase">
                    <Calendar className="w-3 h-3" /> {post.date}
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                    {post.category ? t(`categories.${post.category}`, { defaultValue: post.category }) : t('about.cat_general')}
                </span>
            </div>
            <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">{post.title}</DialogTitle>
            <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-wrap pr-2">
                {post.content}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
