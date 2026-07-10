import { Download, Printer, FileSpreadsheet, FileText } from "lucide-react";
import Button from "../common/Button";

export function ExportMenu({
  onExportPdf,
  onExportExcel,
  onExportCsv,
  onPrint,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        size="sm"
        icon={FileText}
        onClick={onExportPdf}
      >
        PDF
      </Button>
      <Button
        variant="secondary"
        size="sm"
        icon={FileSpreadsheet}
        onClick={onExportExcel}
      >
        Excel
      </Button>
      <Button
        variant="secondary"
        size="sm"
        icon={Download}
        onClick={onExportCsv}
      >
        CSV
      </Button>
      <Button variant="secondary" size="sm" icon={Printer} onClick={onPrint}>
        Print
      </Button>
    </div>
  );
}
