import { useParams } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb";

const sectionTitleMap = {
  listed: "All Property",
  portfolio: "All Unit",
  "own-property": "Own Property",
  "lease-property": "Lease Property",
  units: "Units",
};

const Properties = () => {
  const params = useParams();
  const segment = params["*"]?.split("/")[0];
  const title = sectionTitleMap[segment] || "Property";
  const description =
    segment === "listed"
      ? "View all listed properties."
      : segment === "portfolio"
        ? "Review your property portfolio."
        : segment === "own-property"
          ? "Manage your owned property units."
          : segment === "lease-property"
            ? "Manage your leased properties."
            : segment === "units"
              ? "Manage owned and leased units."
              : "Manage your property data.";

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
          This is the properties section. Use the sidebar links to switch
          between property views.
        </p>
      </div>
    </div>
  );
};

export default Properties;
