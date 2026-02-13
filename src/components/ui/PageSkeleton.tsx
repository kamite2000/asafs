import { Skeleton } from "@/components/ui/skeleton";

export const PageSkeleton = () => (
  <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
    {/* Hero Skeleton */}
    <div className="w-full h-[500px] lg:h-[600px] relative overflow-hidden bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-6 md:px-16 py-16 md:py-24 relative z-10 space-y-6">
        <Skeleton className="h-6 w-32 rounded-full" />
        <div className="space-y-4">
          <Skeleton className="h-12 md:h-16 w-3/4 md:w-1/2" />
          <Skeleton className="h-12 md:h-16 w-1/2 md:w-1/3" />
        </div>
        <Skeleton className="h-6 w-2/3 md:w-1/2" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-40 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>

    {/* Stats Skeleton */}
    <div className="py-16 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>

    {/* Content Section Skeleton */}
    <div className="py-16 container mx-auto px-6 space-y-12">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-8 md:h-10 w-64" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-3xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300">
    <div className="w-64 bg-slate-900 hidden md:block" />
    <div className="flex-1">
      <div className="h-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-8 flex items-center">
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  </div>
);
