import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

type AccessorType<T> = keyof T | (string | number)[];

interface Column<T> {
  header: string;
  accessor: AccessorType<T>;
  cell?: (value: unknown, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
  flex?: number;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  hoverable?: boolean;
  actions?: (row: T) => React.ReactNode;
  loading?: boolean;
  maxHeight?: string;
}

function getNestedValue<T>(obj: T, accessor: AccessorType<T>): unknown {
  if (typeof accessor === 'string' || typeof accessor === 'number') {
    return obj[accessor];
  }
  return (accessor as number[]).reduce((acc: unknown, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined), obj);
}

export default function TableComponent<T>({
  data,
  columns,
  itemsPerPage = 10,
  hoverable = false,
  actions,
  loading = false,
  maxHeight = '10000px'
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<AccessorType<T> | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: AccessorType<T>) => {
    if (JSON.stringify(column) === JSON.stringify(sortColumn)) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortColumn);
      const bValue = getNestedValue(b, sortColumn);
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const renderPaginationButton = (pageNumber: number) => (
    <button
      key={pageNumber}
      onClick={() => setCurrentPage(pageNumber)}
      className={`px-[10px] py-1 ${
        currentPage === pageNumber
          ? 'bg-blue-500 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {pageNumber}
    </button>
  );

  const renderPagination = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPaginationButton(i));
      }
    } else {
      buttons.push(renderPaginationButton(1));
      if (currentPage > 3) buttons.push(<span key="ellipsis1" className='mx-2 px-3 py-1'>...</span>);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(renderPaginationButton(i));
      }

      if (currentPage < totalPages - 2) buttons.push(<span key="ellipsis2" className='mx-2 px-3 py-1'>...</span>);
      buttons.push(renderPaginationButton(totalPages));
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded border overflow-auto custom-scroll">
      <div className="overflow-x-auto" style={{ maxHeight }}>
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50 z-10">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${
                    column.align ? `text-${column.align}` : 'text-left'
                  }`}
                  style={{ width: column.width, flex: column.flex }}
                  onClick={() => handleSort(column.accessor)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {JSON.stringify(sortColumn) === JSON.stringify(column.accessor) && (
                      sortDirection === 'asc' ? <ChevronUp size={14} className='ml-1'/> : <ChevronDown size={14} className='ml-1' />
                    )}
                  </div>
                </th>
              ))}
              {actions && <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className={hoverable ? 'hover:bg-gray-50 transition-colors duration-200' : ''}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-4 text-sm text-gray-500 ${
                      column.align ? `text-${column.align}` : 'text-left'
                    } break-words`}
                    style={{ width: column.width, flex: column.flex }}
                  >
                    {column.cell 
                      ? column.cell(getNestedValue(row, column.accessor), row)
                      : getNestedValue(row, column.accessor) as React.ReactNode}
                  </td>
                ))}
                {actions && (
                  <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-500">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white px-4 py-2 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, sortedData.length)}</span> of{' '}
              <span className="font-medium">{sortedData.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative disabled:cursor-not-allowed inline-flex items-center px-1 py-1 rounded-l border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {renderPagination()}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative disabled:cursor-not-allowed inline-flex items-center px-1 py-1 rounded-r border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}