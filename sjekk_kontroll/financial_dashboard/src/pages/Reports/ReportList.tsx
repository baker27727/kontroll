import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from '../../components/Table';

interface Report {
  report_title: string;
  created_at: string;
  report_file: string;
}

interface ReportListProps {
  reports: Report[];
  onViewPdf: (pdfUrl: string) => void;
}

export const ReportList: React.FC<ReportListProps> = ({ reports, onViewPdf }) => {
  const [t] = useTranslation();

  const columns = [
    {
      header: t('reports_block.report_name'),
      accessor: 'report_title',
    },
    {
      header: t('reports_block.created_at'),
      accessor: 'created_at',
    },
    {
      header: t('reports_block.actions'),
      accessor: 'report_file',
      render: (value: string) => (
        <button
          onClick={() => onViewPdf(value)}
          className="text-blue-600 hover:text-blue-900 transition duration-300"
        >
          {t('reports_block.view_pdf')}
        </button>
      ),
    },
  ];

  return (
    <Table<Report>
      data={reports}
      columns={columns}
    />
  );
};

