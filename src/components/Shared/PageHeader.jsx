// src/components/shared/PageHeader.jsx
import Breadcrumb from "../common/Breadcrumb";
import Button from "../common/Button";
import { Plus } from "lucide-react";

export default function PageHeader({
  breadcrumbItems,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  buttonIcon = Plus,
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] p-6 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
      <Breadcrumb
        items={breadcrumbItems}
        className="text-white/80"
        white={true}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-white/80 mt-1">{subtitle}</p>
        </div>
        {buttonText && (
          <Button
            onClick={onButtonClick}
            icon={buttonIcon}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}