// src/components/properties/PropertyToolbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid, // Changed from Grid3x3
  List,
  Download,
  RefreshCw,
} from "lucide-react";
import PropertySearch from "./PropertySearch";
import Button from "../common/Button";

const PropertyToolbar = ({
  onSearch,
  onFilterToggle,
  onViewChange,
  viewMode = "table",
  onExport,
  onRefresh,
  totalResults = 0,
  filters = {},
  onFilterChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = {
    status: ["All", "Active", "Under Maintenance", "Vacant", "Sold"],
    city: ["All", "New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    type: ["All", "Residential", "Commercial", "Industrial", "Land"],
    category: ["All", "Apartment", "House", "Villa", "Townhouse", "Office"],
    bedrooms: ["Any", "1", "2", "3", "4", "5+"],
    bathrooms: ["Any", "1", "2", "3", "4+"],
    parking: ["Any", "0", "1", "2", "3+"],
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 max-w-2xl">
          <PropertySearch onSearch={onSearch} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            <span className="ml-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full">
              {Object.keys(filters).length}
            </span>
          </Button>

          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewChange("table")}
              className={`p-1.5 transition-colors ${
                viewMode === "table"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-label="Table view"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewChange("grid")}
              className={`p-1.5 transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" /> {/* Changed from Grid3x3 */}
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(filterOptions).map(([key, options]) => (
                  <div key={key} className="space-y-1">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      {key}
                    </label>
                    <select
                      className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                      value={filters[key] || "All"}
                      onChange={(e) => onFilterChange(key, e.target.value)}
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFilterChange("reset")}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {totalResults}
          </span>{" "}
          properties
        </p>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400">Sort by:</span>
          <select className="px-3 py-1 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="revenue">Revenue</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyToolbar;
