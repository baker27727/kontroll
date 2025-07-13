import React from 'react';
import { Breadcrumb } from './Breadcrumb';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type ActionBarProps = {
  breadcrumbItems: BreadcrumbItem[];
  children?: React.ReactNode;
};

const ActionBar: React.FC<ActionBarProps> = ({ breadcrumbItems, children }) => (
  <div className="bg-white shadow rounded px-4 py-2 mb-4">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-wrap items-center gap-2">
        {children}
      </div>
    </div>
  </div>
);

export default ActionBar;