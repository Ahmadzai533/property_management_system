import { Plus } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";

const FloatingActionButton = ({ onClick }) => {
  const { t } = useLocalization();

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all hover:scale-110 hover:bg-blue-700 hover:shadow-2xl active:scale-95 lg:hidden"
      aria-label={t('properties.addProperty', 'Add Property')}
      title={t('properties.addProperty', 'Add Property')}
    >
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default FloatingActionButton;