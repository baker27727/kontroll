import React from 'react';

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
}

interface GridItemProps {
  children: React.ReactNode;
  colSpan?: ColSpan;
  colSpanSm?: ColSpan;
  colSpanMd?: ColSpan;
  colSpanLg?: ColSpan;
}

const colClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const spanClasses: Record<ColSpan, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

export function Grid({ children, cols = 12, gap = 'md' }: GridProps) {
  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]}`}>
      {children}
    </div>
  );
}

export function GridItem({ children, colSpan = 1, colSpanSm, colSpanMd, colSpanLg }: GridItemProps) {
  const classes = [
    spanClasses[colSpan],
    colSpanSm && `sm:${spanClasses[colSpanSm]}`,
    colSpanMd && `md:${spanClasses[colSpanMd]}`,
    colSpanLg && `lg:${spanClasses[colSpanLg]}`,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}