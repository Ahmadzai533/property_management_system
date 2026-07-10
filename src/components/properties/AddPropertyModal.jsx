import { useState } from "react";
import { X, Upload } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";

const AddPropertyModal = ({ isOpen, onClose, onAdd }) => {
  const { t } = useLocalization();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    image: "",
    status: "vacant",
    type: "apartment",
    monthlyRent: "",
    owner: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image") {
      setImagePreview(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      monthlyRent: Number(formData.monthlyRent),
    });
    setFormData({
      name: "",
      address: "",
      image: "",
      status: "vacant",
      type: "apartment",
      monthlyRent: "",
      owner: "",
    });
    setImagePreview("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              {t('properties.addProperty', 'Add New Property')}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('properties.addPropertyDesc', 'Fill in the details to add a new property to your portfolio.')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label={t('common.close', 'Close')}
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('properties.propertyName', 'Property Name')} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder={t('properties.propertyNamePlaceholder', 'e.g., Sunset Apartments')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('properties.address', 'Address')} *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder={t('properties.addressPlaceholder', 'e.g., 742 Evergreen Terrace, Springfield, IL')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('properties.imageUrl', 'Image URL')}
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder={t('properties.imageUrlPlaceholder', 'https://example.com/image.jpg')}
              />
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                aria-label={t('common.upload', 'Upload')}
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">{t('common.upload', 'Upload')}</span>
              </button>
            </div>
            {imagePreview && (
              <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
                <img
                  src={imagePreview}
                  alt={t('properties.propertyPreview', 'Property preview')}
                  className="h-32 w-full object-cover"
                  onError={() => setImagePreview("")}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('properties.statusLabel', 'Status')} *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="vacant">{t('properties.status.vacant', 'Vacant')}</option>
                <option value="occupied">{t('properties.status.occupied', 'Occupied')}</option>
                <option value="leased">{t('properties.status.leased', 'Leased')}</option>
                <option value="listed">{t('properties.status.listed', 'Listed')}</option>
                <option value="maintenance">{t('properties.status.maintenance', 'Maintenance')}</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('properties.propertyType', 'Property Type')} *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="apartment">{t('properties.types.apartment', 'Apartment')}</option>
                <option value="condo">{t('properties.types.condo', 'Condo')}</option>
                <option value="house">{t('properties.types.house', 'House')}</option>
                <option value="studio">{t('properties.types.studio', 'Studio')}</option>
                <option value="townhouse">{t('properties.types.townhouse', 'Townhouse')}</option>
                <option value="commercial">{t('properties.types.commercial', 'Commercial')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('properties.monthlyRent', 'Monthly Rent')} ($) *
              </label>
              <input
                type="number"
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleChange}
                required
                min="0"
                step="50"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder={t('properties.monthlyRentPlaceholder', 'e.g., 2450')}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('properties.owner', 'Owner')} *
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder={t('properties.ownerPlaceholder', 'e.g., Jane Smith')}
              />
            </div>
          </div>

          <div className="flex gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:shadow-lg active:scale-95"
            >
              {t('properties.addProperty', 'Add Property')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;