import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb";

const sectionTitleMap = {
  list: "All Tenants",
  roles: "Tenant History",
};

const Tenants = () => {
  const location = useLocation();
  const segment = location.pathname.split("/").filter(Boolean)[1] || "list";
  const title = sectionTitleMap[segment] || "Tenants";
  const description =
    segment === "roles"
      ? "View tenant role and activity history."
      : "View and manage your tenant records.";

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-4">
        <Breadcrumb />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {title}
          </h1>
          <p className="text-sm text-slate-500 mt-2">{description}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          This is the tenants section. Use the sidebar links to switch between
          tenant views.
        </p>
      </div>
    </div>
  );
};

export default Tenants;
