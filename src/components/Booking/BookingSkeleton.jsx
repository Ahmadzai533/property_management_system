const BookingSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="h-24 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

export default BookingSkeleton;