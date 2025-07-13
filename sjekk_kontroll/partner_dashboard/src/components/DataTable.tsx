import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loaders';

type KeyType = string | string[];

interface Column<T> {
  key: KeyType;
  title: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  flex?: number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
  actions?: (row: T) => React.ReactNode;
  hoverable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  getSubRows?: (row: T) => T[] | undefined;
}

export function DataTable<T>({
  columns,
  data,
  itemsPerPage = 10,
  actions,
  hoverable = false,
  loading = false,
  emptyMessage = 'No data available',
  getSubRows
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<KeyType | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const handleSort = (column: KeyType) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getValue = (obj: any, key: KeyType): any => {
    if (typeof key === 'string') return obj[key];
    return key.reduce((acc, k) => acc && acc[k], obj);
  };

  const sortedData = useMemo(() => {
    if (sortColumn) {
      return [...data].sort((a, b) => {
        const aValue = getValue(a, sortColumn);
        const bValue = getValue(b, sortColumn);
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [data, sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const toggleRowExpansion = (index: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // const LoadingAnimation = () => (
  //   <div className="flex items-center justify-center h-64">
  //     <div className="relative w-24 h-24">
  //       <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full animate-ping"></div>
  //       <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-pulse"></div>
  //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 font-semibold">
  //         Loading
  //       </div>
  //     </div>
  //   </div>
  // );

  const EmptyState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-900">{emptyMessage}</h3>
      </div>
    </div>
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 text-sm font-medium rounded ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const renderRow = (row: T, index: number, depth: number = 0) => {
    const hasSubRows = getSubRows && getSubRows(row)?.length > 0;
    const isExpanded = expandedRows.has(index);

    return (
      <React.Fragment key={index}>
        <tr
          className={`bg-white border-b-[1px] border-b-gray-100 ${
            hoverable ? 'hover:bg-gray-50' : ''
          }`}
        >
          {hasSubRows && (
            <td className="px-4 py-3">
              <button onClick={() => toggleRowExpansion(index)} className="focus:outline-none">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </td>
          )}
          {columns.map((column) => (
            <td
              key={Array.isArray(column.key) ? column.key.join('.') : column.key}
              className="px-6 py-3"
              style={{
                textAlign: column.align || 'left',
                flex: column.flex,
                paddingLeft: depth > 0 ? `${depth * 2 + 1}rem` : undefined,
              }}
            >
              {column.render
                ? column.render(getValue(row, column.key), row)
                : getValue(row, column.key)}
            </td>
          ))}
          {actions && (
            <td className="px-4 py-3">
              {actions(row)}
            </td>
          )}
        </tr>
        {hasSubRows && isExpanded && (
          <AnimatePresence>
            <motion.tr
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <td colSpan={columns.length + (actions ? 2 : 1)}>
                <div className="py-2">
                  {getSubRows(row)!.map((subRow, subIndex) =>
                    renderRow(subRow, +`${index}-${subIndex}`, depth + 1)
                  )}
                </div>
              </td>
            </motion.tr>
          </AnimatePresence>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="overflow-x-auto border border-gray-300 sm:rounded">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {getSubRows && <th className="px-4 py-3 bg-slate-50 border-b"></th>}
            {columns.map((column) => (
              <th
                key={Array.isArray(column.key) ? column.key.join('.') : column.key}
                scope="col"
                className="px-6 py-3 bg-slate-50 border-b"
                onClick={() => column.sortable && handleSort(column.key)}
                style={{ textAlign: column.align || 'left', flex: column.flex }}
              >
                <div className="flex items-center cursor-pointer text-gray-400 text-md">
                  {column.title}
                  {column.sortable && (
                    <span className="ml-1">
                      {sortColumn === column.key ? (
                        sortDirection === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
            {actions && <th scope="col" className="px-6 py-3 bg-slate-50 border-b text-gray-400 text-md">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0) + (getSubRows ? 1 : 0)} >
                <div className="flex justify-center h-40 items-center">
                <Loader />
                </div>
              </td>
            </tr>
          ) : currentData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0) + (getSubRows ? 1 : 0)}>
                <EmptyState />
              </td>
            </tr>
          ) : (
            currentData.map((row, index) => renderRow(row, index))
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-6 py-2 bg-white border-t">
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(endIndex, sortedData.length)}</span> of{' '}
            <span className="font-semibold">{sortedData.length}</span> entries
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 cursor-pointer" />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}