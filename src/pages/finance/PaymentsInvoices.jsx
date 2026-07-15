import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  DollarSign,
  CreditCard,
  Clock,
  AlertCircle,
  Wallet,
  TrendingUp,
  Percent,
  Plus,
  FileText,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Send,
} from "lucide-react";
import { StatCard } from "../../components/finance/StatCard";
import { FinanceTable } from "../../components/finance/FinanceTable";
import { FinanceFilters } from "../../components/finance/FinanceFilters";
import { PaymentForm } from "../../components/finance/PaymentForm";
import { CreateInvoiceForm } from "../../components/finance/CreateInvoiceForm";
import Breadcrumb from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import { useToast } from "../../hooks/useToast";
import { useFinanceData } from "../../hooks/useFinanceData";
import { useTheme } from "../../hooks/useTheme";
import DateText from "../../components/common/DateText";
import { useLocalization } from "../../hooks/useLocalization";

const breadcrumbItems = [
  { label: "Finance", href: "/finance" },
  { label: "Payments & Invoices" },
];

export default function PaymentsInvoices() {
  const { t } = useLocalization();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState(false);
  const { toast } = useToast();

  const statsData = [
    {
      title: t('finance.stats.totalRevenue'),
      value: 2847500,
      icon: <DollarSign className="w-6 h-6" />,
      trend: 12.5,
      subtitle: t('finance.stats.last30Days'),
      prefix: "$",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: t('finance.stats.paidInvoices'),
      value: 1245,
      icon: <CheckCircle className="w-6 h-6" />,
      trend: 8.3,
      subtitle: t('finance.stats.percentPaid', { percent: "87.2" }),
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: t('finance.stats.pendingInvoices'),
      value: 189,
      icon: <Clock className="w-6 h-6" />,
      trend: -3.2,
      subtitle: t('finance.stats.percentPending', { percent: "12.4" }),
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      title: t('finance.stats.overdueInvoices'),
      value: 43,
      icon: <AlertCircle className="w-6 h-6" />,
      trend: -5.7,
      subtitle: t('finance.stats.percentOverdue', { percent: "2.8" }),
      gradient: "from-red-500 to-rose-600",
    },
    {
      title: t('finance.stats.totalPayments'),
      value: 1842,
      icon: <CreditCard className="w-6 h-6" />,
      trend: 9.1,
      subtitle: t('finance.stats.thisMonth'),
      gradient: "from-purple-500 to-violet-600",
    },
    {
      title: t('finance.stats.outstandingBalance'),
      value: 324500,
      icon: <Wallet className="w-6 h-6" />,
      trend: -2.4,
      subtitle: t('finance.stats.totalDue'),
      prefix: "$",
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: t('finance.stats.collectionRate'),
      value: 94.8,
      icon: <Percent className="w-6 h-6" />,
      trend: 1.2,
      subtitle: t('finance.stats.vsLastMonth'),
      suffix: "%",
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      title: t('finance.stats.avgMonthlyIncome'),
      value: 284750,
      icon: <TrendingUp className="w-6 h-6" />,
      trend: 15.7,
      subtitle: t('finance.stats.yearToDate'),
      prefix: "$",
      gradient: "from-indigo-500 to-purple-600",
    },
  ];

  const invoiceData = [
    {
      id: "INV-2024-001",
      property: "Sunset Towers",
      unit: "A-1201",
      tenant: "John Smith",
      dueDate: "2024-01-31",
      paidDate: "2024-01-28",
      amount: 2500,
      tax: 250,
      discount: 0,
      paymentMethod: "Bank Transfer",
      paymentStatus: "Paid",
      invoiceStatus: "Paid",
    },
    {
      id: "INV-2024-002",
      property: "Ocean View",
      unit: "B-304",
      tenant: "Sarah Johnson",
      dueDate: "2024-02-15",
      paidDate: null,
      amount: 3200,
      tax: 320,
      discount: 100,
      paymentMethod: "Credit Card",
      paymentStatus: "Pending",
      invoiceStatus: "Sent",
    },
    {
      id: "INV-2024-003",
      property: "Garden Heights",
      unit: "C-502",
      tenant: "Michael Brown",
      dueDate: "2024-01-15",
      paidDate: null,
      amount: 1800,
      tax: 180,
      discount: 0,
      paymentMethod: "Cash",
      paymentStatus: "Overdue",
      invoiceStatus: "Overdue",
    },
  ];

  const columns = [
    { key: "id", header: t('finance.table.invoiceNumber'), sortable: true, sticky: true },
    { key: "property", header: t('finance.table.property'), sortable: true },
    { key: "unit", header: t('finance.table.unit') },
    { key: "tenant", header: t('finance.table.tenant'), sortable: true },
    {
      key: "dueDate",
      header: t('finance.table.dueDate'),
      sortable: true,
      accessor: (row) => <DateText value={row.dueDate} />,
    },
    {
      key: "paidDate",
      header: t('finance.table.paidDate'),
      accessor: (row) =>
        row.paidDate ? <DateText value={row.paidDate} /> : "-",
    },
    {
      key: "amount",
      header: t('finance.table.amount'),
      sortable: true,
      accessor: (row) => `$${row.amount.toLocaleString()}`,
    },
    {
      key: "paymentStatus",
      header: t('finance.table.paymentStatus'),
      accessor: (row) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            row.paymentStatus === "Paid"
              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              : row.paymentStatus === "Pending"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {t(`finance.status.${row.paymentStatus.toLowerCase()}`, row.paymentStatus)}
        </span>
      ),
    },
  ];

  const handleAction = (action, row) => {
    switch (action) {
      case "view":
        setSelectedInvoice(row);
        setIsDialogOpen(true);
        break;
      case "edit":
        toast.info(t('finance.messages.editInvoice'));
        break;
      case "send":
        toast.success(t('finance.messages.invoiceSent'));
        break;
      case "delete":
        toast.error(t('finance.messages.invoiceDeleted'));
        break;
      case "markPaid":
        toast.success(t('finance.messages.markedPaid'));
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9] p-6 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
        <Breadcrumb items={[
          { label: t('nav.finance'), href: "/finance" },
          { label: t('finance.paymentsInvoices') },
        ]} white={true} />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('finance.paymentsInvoices')}
            </h1>
            <p className="text-white/80 mt-1">
              {t('finance.paymentsInvoicesDesc')}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={() => setIsPaymentFormOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('finance.payment.new')}
            </Button>
            <Button
              onClick={() => setIsInvoiceFormOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              {t('finance.invoice.create')}
            </Button>
            <Button 
              onClick={() => toast.success(t('finance.messages.exportStarted'))}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              {t('common.export')}
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            subtitle={stat.subtitle}
            prefix={stat.prefix}
            suffix={stat.suffix}
            gradient={stat.gradient}
            isLoading={isLoading}
          />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <FinanceFilters
          searchPlaceholder={t('finance.filters.searchPayments')}
          filters={[
            {
              key: "status",
              label: t('finance.filters.paymentStatus'),
              options: [
                { value: "paid", label: t('finance.status.paid') },
                { value: "pending", label: t('finance.status.pending') },
                { value: "overdue", label: t('finance.status.overdue') },
              ],
            },
            {
              key: "property",
              label: t('finance.filters.property'),
              options: [
                { value: "sunset", label: t('finance.properties.sunsetTowers') },
                { value: "ocean", label: t('finance.properties.oceanView') },
                { value: "garden", label: t('finance.properties.gardenHeights') },
              ],
            },
          ]}
          onSearch={(value) => console.log("Search:", value)}
          onFilter={(key, value) => console.log("Filter:", key, value)}
          onDateRange={(start, end) => console.log("Date range:", start, end)}
          onReset={() => console.log("Reset filters")}
          onExport={() => toast.success(t('finance.messages.exportedSuccessfully'))}
          onPrint={() => window.print()}
        />

        <div className="mt-4">
          <FinanceTable
            columns={columns}
            data={invoiceData}
            onRowClick={(row) => {
              setSelectedInvoice(row);
              setIsDialogOpen(true);
            }}
            onSelect={(selected) => console.log("Selected:", selected)}
            onSort={(key, direction) => console.log("Sort:", key, direction)}
            isLoading={isLoading}
            stickyHeader
            stickyFirstColumn
            actions={(row) => (
              <div className="flex items-center gap-2 justify-end">
                <button
                  className="p-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded transition-all duration-300"
                  onClick={() => handleAction("view", row)}
                  aria-label={t('finance.actions.viewInvoice')}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="p-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/20 dark:hover:to-green-800/20 rounded transition-all duration-300"
                  onClick={() => handleAction("edit", row)}
                  aria-label={t('finance.actions.editInvoice')}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="p-1 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 rounded transition-all duration-300"
                  onClick={() => handleAction("send", row)}
                  aria-label={t('finance.actions.sendInvoice')}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('finance.pagination.showing', { start: 1, end: invoiceData.length, total: "1,245" })}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
              {t('common.previous')}
            </button>
            <button className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
              3
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
              {t('common.next')}
            </button>
          </div>
        </div>
      </div>

      {isDialogOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsDialogOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#6D28D9]/10 to-[#8B5CF6]/10 dark:from-[#6D28D9]/20 dark:to-[#8B5CF6]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t('finance.invoice.details')}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedInvoice.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="p-2 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-300"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      {t('finance.invoice.invoiceInfo')}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          {t('finance.invoice.amount')}:
                        </span>{" "}
                        <span className="font-medium">
                          ${selectedInvoice.amount.toLocaleString()}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          {t('finance.invoice.dueDate')}:
                        </span>{" "}
                        <DateText value={selectedInvoice.dueDate} />
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          {t('finance.table.status')}:
                        </span>{" "}
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            selectedInvoice.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : selectedInvoice.paymentStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          }`}
                        >
                          {t(`finance.status.${selectedInvoice.paymentStatus.toLowerCase()}`, selectedInvoice.paymentStatus)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      {t('finance.invoice.tenantInfo')}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        {selectedInvoice.tenant}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedInvoice.property} - {selectedInvoice.unit}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    {t('finance.invoice.paymentHistory')}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">
                          {t('finance.invoice.paymentNumber', { id: selectedInvoice.id })}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedInvoice.paymentMethod}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ${selectedInvoice.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedInvoice.paidDate
                            ? <DateText value={selectedInvoice.paidDate} />
                            : t('finance.status.pending')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
                    <Download className="w-4 h-4 inline mr-2" />
                    {t('finance.invoice.downloadPdf')}
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 transition-all duration-300">
                    <Send className="w-4 h-4 inline mr-2" />
                    {t('finance.invoice.sendEmail')}
                  </button>
                  <button 
                    className="px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => {
                      handleAction("markPaid", selectedInvoice);
                      setIsDialogOpen(false);
                    }}
                  >
                    {t('finance.invoice.markPaid')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <PaymentForm
        isOpen={isPaymentFormOpen}
        onClose={() => setIsPaymentFormOpen(false)}
        onSuccess={() => {
          toast.success(t('finance.messages.paymentCreated'));
          setIsPaymentFormOpen(false);
        }}
      />

      <CreateInvoiceForm
        isOpen={isInvoiceFormOpen}
        onClose={() => setIsInvoiceFormOpen(false)}
        onSuccess={() => {
          toast.success(t('finance.messages.invoiceCreated'));
          setIsInvoiceFormOpen(false);
        }}
      />
    </div>
  );
}