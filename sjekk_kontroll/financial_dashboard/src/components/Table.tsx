import React from 'react';

type NestedAccessor = string | string[];

interface Column<T> {
  header: string;
  accessor: NestedAccessor;
  pinned?: boolean;
  render?: (value: string, row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
}

const getNestedValue = (obj: any, accessor: NestedAccessor) => {
  if (typeof accessor === 'string') {
    return obj[accessor];
  }
  return accessor.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

export const Table = <T extends object>({ 
  data, 
  columns, 
  actions = null, 
  emptyMessage = "No data available" 
}: TableProps<T>) => {
  const pinnedColumns = columns.filter(col => col.pinned);
  const unpinnedColumns = columns.filter(col => !col.pinned);
  const allColumns = [...pinnedColumns, ...unpinnedColumns];

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {allColumns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 ${
                  column.pinned ? 'sticky left-0 z-10 bg-gray-50 dark:bg-gray-700' : ''
                }`}
              >
                {column.header}
              </th>
            ))}
            {actions && <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={allColumns.length + (actions ? 1 : 0)} className="px-6 py-4 text-center">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {allColumns.map((column, colIndex) => {
                  const cellValue = getNestedValue(row, column.accessor);
                  return (
                    <td 
                      key={colIndex} 
                      className={`px-6 py-4 ${
                        column.pinned ? 'sticky left-0 z-10 bg-white dark:bg-gray-800' : ''
                      }`}
                    >
                      {column.render ? column.render(cellValue, row) : cellValue}
                    </td>
                  );
                })}
                {actions && (
                  <td className="px-6 py-4 text-right">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

