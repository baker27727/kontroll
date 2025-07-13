import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Columns, Trash2, Search, SortAsc, SortDesc } from 'lucide-react';
import Loader from './Loaders';
import Button from './Button';

type KeyType = string | string[];

export interface Column<T> {
  id: string;
  key: KeyType;
  title: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  flex?: number;
  show?: boolean;
}

interface BulkActionItem {
  icon: React.ElementType;
  label: string;
  onClick: (selectedRows: unknown[]) => void;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
  actions?: (row: T) => React.ReactNode;
  bulkActions?: BulkActionItem[];
  hoverable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  striped?: boolean;
  showColumnSelector?: boolean;
  paginated?: boolean;
  showCheckboxes?: boolean;
}

export function DataTable<T>({
  columns,
  data, 
  itemsPerPage = 10,
  actions,
  bulkActions,
  hoverable = false,
  loading = false,
  emptyMessage = 'No data available',
  striped = false,
  showColumnSelector = false,
  paginated = false,
  showCheckboxes = false
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState(columns.filter(col => col.show !== false).map(col => col.id));
  const [showColumnSelectorDropdown, setShowColumnSelectorDropdown] = useState(false);
  const [showBulkActionsDropdown, setShowBulkActionsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const columnSelectorRef = useRef<HTMLDivElement>(null);
  const bulkActionsRef = useRef<HTMLDivElement>(null);

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const getValue = useCallback((obj: unknown, key: KeyType): number => {
    if (typeof key === 'string') return (obj as { [key: string]: number })[key];
    if (Array.isArray(key)) {
      let value: unknown = obj as { [key: string]: unknown };
      for (const k of key) {
        value = value?.[k as unknown as string];
      }
      return value as unknown as number;
    }
    return 0;
  }, []);

  const sortedData = useMemo(() => {
    if (sortColumn) {
      const column = columns.find(col => col.id === sortColumn);
      if (column) {
        return [...filteredData].sort((a, b) => {
          const aValue = getValue(a, column.key);
          const bValue = getValue(b, column.key);
          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }
    return filteredData;
  }, [filteredData, sortColumn, sortDirection, getValue, columns]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const toggleRowSelection = (index: number) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleAllRows = () => {
    if (selectedRows.size === currentData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentData.map((_, index) => startIndex + index)));
    }
  };

  const toggleColumnVisibility = (columnId: string) => {
    setVisibleColumns(prev => {
      if (prev.includes(columnId)) {
        return prev.filter(id => id !== columnId);
      } else {
        return [...prev, columnId];
      }
    });
  };

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter(item =>
      Object.values(item as Record<string, unknown>).some(
        value =>
          value &&
          value.toString().toLowerCase().includes(lowercasedSearchTerm)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnSelectorRef.current && !columnSelectorRef.current.contains(event.target as Node)) {
        setShowColumnSelectorDropdown(false);
      }
      if (bulkActionsRef.current && !bulkActionsRef.current.contains(event.target as Node)) {
        setShowBulkActionsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

    if (startPage > 1) {
      pageNumbers.push(
        <Button
          key="first"
          onClick={() => setCurrentPage(1)}
          size="sm"
          variant="outline"
          color="blue"
          className="px-2"
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" className="px-1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          size="sm"
          variant={currentPage === i ? 'primary' : 'outline'}
          color={currentPage === i ? 'blue' : 'gray'}
          className="px-2 rounded-none"
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2" className="px-1">...</span>);
      }
      pageNumbers.push(
        <Button
          key="last"
          onClick={() => setCurrentPage(totalPages)}
          size="sm"
          variant="outline"
          color="blue"
          className="px-2 rounded-none"
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  const renderRow = (row: T, index: number) => {
    const isSelected = selectedRows.has(index);

    return (
      <tr
        key={index}
        className={`${
          hoverable ? 'hover:bg-gray-50' : ''
        } ${striped && index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${
          isSelected ? 'bg-blue-100' : ''
        }`}
      >
        {showCheckboxes && (
          <td className="px-4 py-3 whitespace-nowrap">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleRowSelection(index)}
                className="form-checkbox h-4 w-4 text-[#0096c7] rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
          </td>
        )}
        {columns.filter(col => visibleColumns.includes(col.id)).map((column) => (
          <td
            key={column.id}
            className="px-4 py-3 whitespace-nowrap"
            style={{
              textAlign: column.align || 'left',
              flex: column.flex,
            }}
          >
            {column.render
              ? column.render(getValue(row, column.key), row)
              : getValue(row, column.key)}
          </td>
        ))}
        {actions && (
          <td className="px-4 py-3 whitespace-nowrap">
            {actions(row)}
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className="sm:rounded">
      <div className="bg-white mb-3 flex flex-wrap items-center justify-between border-gray-200 z-20">
        <div className="w-full sm:w-auto mb-2 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Table"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input block w-full sm:w-64 md:w-96 pl-8 pr-11 py-2 border border-gray-300 rounded-sm leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {bulkActions && bulkActions.length > 0 && selectedRows.size > 0 && (
            <div className="relative" ref={bulkActionsRef}>
              <Button
                onClick={() => setShowBulkActionsDropdown(!showBulkActionsDropdown)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Actions
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              {showBulkActionsDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded shadow border bg-white ring-1 ring-black ring-opacity-5 z-30">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {bulkActions.map((action, index) => (
                      <button
                        key={index}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          action.onClick(Array.from(selectedRows).map(index => currentData[index - startIndex]));
                          setShowBulkActionsDropdown(false);
                        }}
                      >
                        <action.icon className="w-4 h-4 mr-2" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {showColumnSelector && (
            <div className="relative" ref={columnSelectorRef}>
              <Button
                onClick={() => setShowColumnSelectorDropdown(!showColumnSelectorDropdown)}
              >
                <Columns className="w-4 h-4 mr-2" />
                Columns
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              {showColumnSelectorDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded shadow border bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {columns.map((column) => (
                      <div
                        key={column.id}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        onClick={() => toggleColumnVisibility(column.id)}
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(column.id)}
                          onChange={() => {}}
                          className="form-checkbox h-4 w-4 checked:bg-[#0096c7] text-[#0096c7] rounded border-gray-300 focus:ring-blue-500 mr-2"
                        />
                        <span className="flex-grow">{column.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {showCheckboxes && (
                <th scope="col" className="px-4 py-3 text-left  text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === currentData.length}
                      onChange={toggleAllRows}
                      className="form-checkbox h-4 w-4 text-[#0096c7] rounded border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                </th>
              )}
              {columns.filter(col => visibleColumns.includes(col.id)).map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center cursor-pointer">
                    {column.title}
                    {column.sortable && (
                      <span className="ml-1" onClick={() => column.sortable && handleSort(column.id)}>
                        {sortColumn === column.id ? (
                          sortDirection === 'asc' ? (
                            <SortAsc className="w-6 h-6 text-gray-600 border p-1 bg-blue-100 hover:bg-blue-200 transition ease-in duration-300 rounded  " />
                          ) : (
                            <SortDesc className="w-6 h-6 text-gray-600 border p-1 bg-blue-100 hover:bg-blue-200 transition ease-in duration-300 rounded " />
                          )
                        ) : (
                          <SortAsc className="w-6 h-6 text-gray-600 border p-1 bg-blue-100 hover:bg-blue-200 transition ease-in duration-300 rounded" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={visibleColumns.length + (actions ? 2 : 1)}>
                  <div className="flex justify-center items-center h-40">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + (actions ? 2 : 1)}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => renderRow(row, startIndex + index))
            )}
          </tbody>
        </table>
      </div>
      {paginated && (
        <div className="bg-white pt-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              color="gray"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              color="gray"
              variant="outline"
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, sortedData.length)}</span> of{' '}
                <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  color="gray"
                  variant="outline"
                  className="rounded-l-md"
                  size="sm"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </Button>
                {renderPageNumbers()}
                <Button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  color="gray"
                  variant="outline"
                  className="rounded-r-md"
                  size="sm"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}