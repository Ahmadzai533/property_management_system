import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

const routeNameMap = {
  owner: "Owner",
  tenant: "Tenant",
  list: "List",
  add: "Add",
  edit: "Edit",
  settings: "Settings",
  help: "Help",
  properties: "Property",
  listed: "All Property",
  portfolio: "All Unit",
  "own-property": "Own Property",
  "lease-property": "Lease Property",
  units: "Units",
  users: "Users",
  maintainers: "Maintainers",
  finance: "Finance",
  agreements: "Agreements",
  bookings: "Bookings",
  feedback: "Feedback",
  notices: "Notices",
  reports: "Reports",
  admin: "Admin",
};

const Breadcrumb = ({ white = false }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs =
    pathSegments.length === 0
      ? [{ name: "Dashboard" }]
      : [{ name: "Dashboard", to: "/" }];

  if (pathSegments.length > 0) {
    pathSegments.forEach((segment, index) => {
      const to = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const name =
        routeNameMap[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        name,
        to: index < pathSegments.length - 1 ? to : null,
      });
    });
  }

  // If white prop is true, always use white text (for gradient backgrounds)
  // Otherwise use dark/light mode colors
  const styles = white ? {
    link: "text-white/70 hover:text-white",
    active: "text-white font-medium",
    separator: "text-white/50",
  } : {
    link: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200",
    active: "text-gray-900 dark:text-white font-medium",
    separator: "text-gray-400 dark:text-gray-500",
  };

  return (
    <nav className="text-sm pl-3" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {breadcrumbs.map((crumb, index) => (
          <li
            key={`${crumb.name}-${index}`}
            className="flex items-center gap-2"
          >
            {index > 0 && (
              <span className={styles.separator}>
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            )}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className={styles.link + " transition-colors"}
              >
                {crumb.name}
              </Link>
            ) : (
              <span className={styles.active}>
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;