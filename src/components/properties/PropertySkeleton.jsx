const ShimmerBlock = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 ${className}`}
    aria-hidden="true"
  />
);

const PropertySkeleton = ({ className = "" }) => {
  return (
    <article
      aria-busy="true"
      aria-label="Loading property"
      className={`flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <ShimmerBlock className="h-full w-full rounded-none" />
        <ShimmerBlock className="absolute left-3 top-3 h-6 w-20 rounded-full" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="space-y-2">
          <ShimmerBlock className="h-5 w-3/4 sm:h-6" />
          <div className="flex items-start gap-1.5">
            <ShimmerBlock className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-md" />
            <div className="flex-1 space-y-1.5">
              <ShimmerBlock className="h-3.5 w-full" />
              <ShimmerBlock className="h-3.5 w-2/3" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-2">
          <div className="flex items-center gap-2.5">
            <ShimmerBlock className="h-9 w-9 flex-shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <ShimmerBlock className="h-3 w-16" />
              <ShimmerBlock className="h-4 w-20" />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ShimmerBlock className="h-9 w-9 flex-shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <ShimmerBlock className="h-3 w-12" />
              <ShimmerBlock className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <ShimmerBlock className="h-10 w-full rounded-xl sm:flex-1" />
          <ShimmerBlock className="h-10 w-full rounded-xl sm:flex-1" />
        </div>
      </div>
    </article>
  );
};

export default PropertySkeleton;
