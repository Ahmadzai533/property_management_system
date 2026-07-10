import { ImageOff } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";

const PropertyGallery = ({ images = [], className = "" }) => {
  const { t } = useLocalization();
  const validImages = Array.isArray(images)
    ? images.filter((src) => typeof src === "string" && src.trim())
    : [];

  if (validImages.length === 0) {
    return (
      <div
        className={`flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 ${className}`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-800">
          <ImageOff className="h-7 w-7 text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {t('properties.noImages', 'No images available')}
        </p>
      </div>
    );
  }
  

  return (
    <div
      className={`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 ${className}`}
    >
      {validImages.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-800"
        >
          <img
            src={src}
            alt={`Property image ${index + 1}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
};

export default PropertyGallery;