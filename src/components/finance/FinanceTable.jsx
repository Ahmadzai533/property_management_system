// src/components/finance/FinanceTable.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FinanceTable = ({
  columns,
  data,
  onRowClick,
  onSelect,
  onSort,
  isLoading = false,
  stickyHeader = true,
  stickyFirstColumn = false,
  selectable = true,
  actions,
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSelectAll = (checked) => {
    if (checked) {
      const all = new Set(data);
      setSelectedRows(all);
      onSelect?.(Array.from(all));
    } else {
      setSelectedRows(new Set());
      onSelect?.([]);
    }
  };

  const handleSelectRow = (row, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(row);
    } else {
      newSelected.delete(row);
    }
    setSelectedRows(newSelected);
    onSelect?.(Array.from(newSelected));
  };

  const handleSort = (key) => {
    const direction = sortField === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(key);
    setSortDirection(direction);
    onSort?.(key, direction);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full">
        <thead className={stickyHeader ? 'sticky top-0 z-10' : ''}>
          <tr className="bg-gray-50 dark:bg-gray-800">
            {selectable && (
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 ${
                  col.sticky && stickyFirstColumn
                    ? 'sticky left-0 bg-gray-50 dark:bg-gray-800 z-20'
                    : ''
                } ${col.sortable ? 'cursor-pointer hover:text-gray-900 dark:hover:text-white' : ''}`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortField === col.key && (
                    sortDirection === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )
                  )}
                </div>
              </th>
            ))}
            {actions && <th className="px-4 py-3 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-800 ${
                  selectedRows.has(row) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {selectable && (
                  <td className="px-4 py-3 w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row)}
                      onChange={(e) => handleSelectRow(row, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-sm text-gray-700 dark:text-gray-300 ${
                      col.sticky && stickyFirstColumn
                        ? 'sticky left-0 bg-white dark:bg-gray-900 z-10'
                        : ''
                    } ${col.sticky && stickyFirstColumn && selectedRows.has(row) ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                  >
                    {col.accessor ? col.accessor(row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-right">
                    <div onClick={(e) => e.stopPropagation()}>{actions(row)}</div>
                  </td>
                )}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};