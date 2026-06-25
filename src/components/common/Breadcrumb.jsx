import { Link, useLocation } from "react-router-dom";

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

const Breadcrumb = () => {
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

  return (
    <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {breadcrumbs.map((crumb, index) => (
          <li
            key={`${crumb.name}-${index}`}
            className="flex items-center gap-2"
          >
            {index > 0 && <span className="text-slate-400">/</span>}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="text-slate-500 hover:text-slate-700 transition"
              >
                {crumb.name}
              </Link>
            ) : (
              <span className="font-medium text-slate-700">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
