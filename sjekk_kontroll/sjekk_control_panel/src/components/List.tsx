import React from 'react';

interface ListProps {
  children: React.ReactNode;
  type?: 'unordered' | 'ordered';
}

export function List({ children, type = 'unordered' }: ListProps) {
  const Component = type === 'unordered' ? 'ul' : 'ol';
  return <Component className="space-y-1">{children}</Component>;
}

interface ListItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function ListItem({ children, icon }: ListItemProps) {
  return (
    <li className="flex items-start">
      {icon && <span className="mr-2 mt-1">{icon}</span>}
      <span>{children}</span>
    </li>
  );
}