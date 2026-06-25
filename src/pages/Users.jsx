import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb";

const pageTitleMap = {
  list: "Users List",
  roles: "Roles & Permissions",
  history: "Logged History",
};

const Users = () => {
  const location = useLocation();
  const segment = location.pathname.split("/").filter(Boolean)[1] || "list";
  const title = pageTitleMap[segment] || "Users";
  const description =
    segment === "roles"
      ? "Manage user roles and permissions."
      : segment === "history"
        ? "Review user activity and login history."
        : "View and manage your user accounts.";

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
          This is the users section. Use the sidebar links to switch between
          user views.
        </p>
      </div>
    </div>
  );
};

export default Users;
