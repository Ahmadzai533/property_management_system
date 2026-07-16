import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Eye,
  Pencil,
  UserCheck,
  LogOut,
  CheckCircle2,
  Copy,
  Printer,
  FileDown,
  Trash2,
} from "lucide-react";
import PageHeader from "../../components/Shared/PageHeader";
import BookingStats from "../../components/Booking/BookingStats";
import BookingFilters from "../../components/Booking/BookingFilters";
import BookingTable from "../../components/Booking/BookingTable";
import BookingDrawer from "../../components/Booking/BookingDrawer";
import DeleteBookingModal from "../../components/Booking/DeleteBookingModal";
import { useToast } from "../../hooks/useToast";
import { useLocalization } from "../../hooks/useLocalization";

const bookingSeed = [
  {
    id: 1,
    bookingNumber: "BK-1042",
    guest: "Ava Thompson",
    property: "Sunset Residence",
    unit: "A-204",
    bookingDate: "2026-06-18",
    checkIn: "2026-07-08",
    checkOut: "2026-07-12",
    duration: 4,
    guests: 2,
    amount: 3200,
    paymentStatus: "Paid",
    status: "Confirmed",
    source: "Direct",
    assignedStaff: "Nadia",
    createdBy: "Ayesha",
    updatedAt: "2h ago",
  },
  {
    id: 2,
    bookingNumber: "BK-1043",
    guest: "Liam Patel",
    property: "Marina Bay",
    unit: "P-101",
    bookingDate: "2026-06-22",
    checkIn: "2026-07-10",
    checkOut: "2026-07-14",
    duration: 4,
    guests: 3,
    amount: 4800,
    paymentStatus: "Pending",
    status: "Pending",
    source: "OTA",
    assignedStaff: "Jules",
    createdBy: "Mina",
    updatedAt: "4h ago",
  },
  {
    id: 3,
    bookingNumber: "BK-1044",
    guest: "Sofia Hassan",
    property: "Rosewood Villa",
    unit: "V-08",
    bookingDate: "2026-06-24",
    checkIn: "2026-07-09",
    checkOut: "2026-07-15",
    duration: 6,
    guests: 2,
    amount: 6100,
    paymentStatus: "Partial",
    status: "Checked In",
    source: "Corporate",
    assignedStaff: "Tara",
    createdBy: "Noah",
    updatedAt: "1d ago",
  },
  {
    id: 4,
    bookingNumber: "BK-1045",
    guest: "Daniel Reed",
    property: "Sunset Residence",
    unit: "B-310",
    bookingDate: "2026-06-26",
    checkIn: "2026-07-16",
    checkOut: "2026-07-19",
    duration: 3,
    guests: 4,
    amount: 2800,
    paymentStatus: "Paid",
    status: "Cancelled",
    source: "Direct",
    assignedStaff: "Nadia",
    createdBy: "Ayesha",
    updatedAt: "3h ago",
  },
];

const BookingListPage = () => {
  const { t } = useLocalization();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBookings(bookingSeed);
      setIsLoading(false);
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const haystack =
        `${booking.bookingNumber} ${booking.guest} ${booking.property}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      const matchesProperty =
        !propertyFilter || booking.property === propertyFilter;
      const matchesStatus = !statusFilter || booking.status === statusFilter;
      const matchesPayment =
        !paymentFilter || booking.paymentStatus === paymentFilter;
      const matchesSource = !sourceFilter || booking.source === sourceFilter;
      return (
        matchesSearch &&
        matchesProperty &&
        matchesStatus &&
        matchesPayment &&
        matchesSource
      );
    });
  }, [
    bookings,
    searchTerm,
    propertyFilter,
    statusFilter,
    paymentFilter,
    sourceFilter,
  ]);

  const handleReset = () => {
    setSearchTerm("");
    setPropertyFilter("");
    setStatusFilter("");
    setPaymentFilter("");
    setSourceFilter("");
  };

  const handleAction = (type, booking) => {
    setSelectedBooking(booking);
    switch (type) {
      case "view":
        toast.info(t("booking.messages.viewingBooking", { bookingNumber: booking.bookingNumber }));
        break;
      case "edit":
        toast.info(t("booking.messages.editingBooking", { bookingNumber: booking.bookingNumber }));
        break;
      case "checkin":
        toast.success(t("booking.messages.checkedIn", { bookingNumber: booking.bookingNumber }));
        break;
      case "checkout":
        toast.success(t("booking.messages.checkedOut", { bookingNumber: booking.bookingNumber }));
        break;
      case "confirm":
        toast.success(t("booking.messages.confirmed", { bookingNumber: booking.bookingNumber }));
        break;
      case "cancel":
        toast.warning(t("booking.messages.cancelled", { bookingNumber: booking.bookingNumber }));
        break;
      case "duplicate":
        toast.info(t("booking.messages.duplicated", { bookingNumber: booking.bookingNumber }));
        break;
      case "print":
        toast.info(t("booking.messages.preparingPrint", { bookingNumber: booking.bookingNumber }));
        break;
      case "pdf":
        toast.success(t("booking.messages.downloadingPdf", { bookingNumber: booking.bookingNumber }));
        break;
      case "delete":
        setDeleteTarget(booking);
        break;
      default:
        break;
    }
  };

  const confirmDelete = () => {
    setBookings((current) =>
      current.filter((item) => item.id !== deleteTarget.id),
    );
    toast.success(t("booking.messages.deleted", { bookingNumber: deleteTarget.bookingNumber }));
    setDeleteTarget(null);
  };

  const stats = useMemo(() => [
    {
      key: "bookings",
      label: t("booking.stats.bookings"),
      value: "128",
      trend: 12,
      caption: t("booking.stats.vsLastMonth"),
      progress: 88,
    },
    {
      key: "active",
      label: t("booking.stats.active"),
      value: "47",
      trend: 8,
      caption: t("booking.stats.inProgress"),
      progress: 74,
    },
    {
      key: "pending",
      label: t("booking.stats.pending"),
      value: "18",
      trend: -3,
      caption: t("booking.stats.awaitingReview"),
      progress: 48,
    },
    {
      key: "confirmed",
      label: t("booking.stats.confirmed"),
      value: "86",
      trend: 10,
      caption: t("booking.stats.guaranteedStays"),
      progress: 82,
    },
    {
      key: "checkedIn",
      label: t("booking.stats.checkedIn"),
      value: "22",
      trend: 5,
      caption: t("booking.stats.today"),
      progress: 65,
    },
  ], [t]);

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <PageHeader
        breadcrumbItems={[
          { label: t("navigation.dashboard"), href: "/" },
          { label: t("navigation.bookings") },
        ]}
        title={t("booking.title")}
        subtitle={t("booking.subtitle")}
        buttonText={t("booking.actions.create")}
        onButtonClick={() => toast.info(t("booking.messages.createFormOpened"))}
      />

      <BookingStats stats={stats} isLoading={isLoading} />

      <div className="mt-6 space-y-4">
        <BookingFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          propertyFilter={propertyFilter}
          onPropertyFilterChange={setPropertyFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          paymentFilter={paymentFilter}
          onPaymentFilterChange={setPaymentFilter}
          sourceFilter={sourceFilter}
          onSourceFilterChange={setSourceFilter}
          onReset={handleReset}
          onExport={() => toast.success(t("booking.messages.exported"))}
          onPrint={() => toast.info(t("booking.messages.printViewOpened"))}
          onRefresh={() => toast.info(t("booking.messages.refreshed"))}
        />

        <BookingTable
          bookings={filteredBookings}
          isLoading={isLoading}
          onAction={handleAction}
        />
      </div>

      <BookingDrawer
        isOpen={Boolean(selectedBooking) && !deleteTarget}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
      />

      <AnimatePresence>
        <DeleteBookingModal
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          booking={deleteTarget}
        />
      </AnimatePresence>
    </div>
  );
};

export default BookingListPage;