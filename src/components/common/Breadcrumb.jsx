import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";

const routeNameMap = {
  owner: "breadcrumb.owner",
  tenant: "breadcrumb.tenant",
  list: "breadcrumb.list",
  add: "breadcrumb.add",
  edit: "breadcrumb.edit",

  settings: "nav.settings",
  help: "nav.help",

  properties: "nav.properties",
  listed: "properties.allProperty",
  portfolio: "properties.allUnits",
  "own-property": "properties.ownProperties",
  "lease-property": "properties.leaseProperty",
  units: "properties.allUnits",

  users: "nav.usersAndRoles",
  maintainers: "nav.maintainers",
  finance: "nav.finance",
  agreements: "nav.agreements",
  bookings: "nav.bookings",
  feedback: "nav.feedback",
  notices: "nav.notices",
  reports: "nav.reports",
  admin: "nav.admin",
};

const Breadcrumb = ({ white = false }) => {
  const location = useLocation();
  const { t } = useLocalization();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs =
    pathSegments.length === 0
      ? [
          {
            name: t("breadcrumb.dashboard"),
          },
        ]
      : [
          {
            name: t("breadcrumb.dashboard"),
            to: "/",
          },
        ];

  if (pathSegments.length > 0) {
    pathSegments.forEach((segment, index) => {
      const to = `/${pathSegments.slice(0, index + 1).join("/")}`;

      const translationKey = routeNameMap[segment];

      const name = translationKey
        ? t(translationKey)
        : segment.charAt(0).toUpperCase() + segment.slice(1);

      breadcrumbs.push({
        name,
        to: index < pathSegments.length - 1 ? to : null,
      });
    });
  }

  const styles = white
    ? {
        link: "text-white/70 hover:text-white",
        active: "text-white font-medium",
        separator: "text-white/50",
      }
    : {
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
              <span className={styles.active}>{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;