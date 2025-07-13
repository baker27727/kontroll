import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useTranslation } from 'react-i18next';

interface PdfViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, onClose }) => {
  const [t] = useTranslation();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('reports_block.pdf_viewer')}</h2>
      <div className="pdf-viewer" style={{ height: '600px' }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={`http://localhost:3060/storage/${pdfUrl}`} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
      <button
        onClick={onClose}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
      >
        {t('reports_block.close_pdf_viewer')}
      </button>
    </div>
  );
};

