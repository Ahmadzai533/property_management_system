import { Download, Printer, FileSpreadsheet, FileText } from "lucide-react";
import Button from "../common/Button";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

export function ExportMenu({
  onExportPdf,
  onExportExcel,
  onExportCsv,
  onPrint,
}) {
  const { t } = useLocalization();
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        size="sm"
        icon={FileText}
        onClick={onExportPdf}
      >
        {t("reports.export.pdf")}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        icon={FileSpreadsheet}
        onClick={onExportExcel}
      >
        {t("reports.export.excel")}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        icon={Download}
        onClick={onExportCsv}
      >
        {t("reports.export.csv")}
      </Button>
      <Button variant="secondary" size="sm" icon={Printer} onClick={onPrint}>
        {t("reports.actions.print")}
      </Button>
    </div>
  );
}