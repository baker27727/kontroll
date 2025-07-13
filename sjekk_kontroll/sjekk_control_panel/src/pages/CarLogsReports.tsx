import { useState } from 'react';
import { Search, FileText, Download } from 'lucide-react';
import TableComponent from '../components/Table';
import CustomButton from '../components/Button';
import Modal from '../components/Modal';

const CarLogReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const openViewModal = (report) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto">
        <div className="bg-white rounded-md shadow border p-3 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="relative w-full md:w-96 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Søk etter rapporter"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <CustomButton color="blue" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Last ned alle rapporter
            </CustomButton>
          </div>
        </div>

        <TableComponent 
          hoverable
          itemsPerPage={8}
          columns={[
            {header: 'Rapport ID', accessor: 'id'},
            {header: 'Dato', accessor: 'date'},
            {header: 'Antall logger', accessor: 'logCount'},
            {header: 'Status', accessor: 'status'},
          ]}
          data={[
            {id: 'REP001', date: '2023-06-01', logCount: 150, status: 'Fullført'},
            {id: 'REP002', date: '2023-06-02', logCount: 200, status: 'Under behandling'},
            {id: 'REP003', date: '2023-06-03', logCount: 175, status: 'Fullført'},
          ]}
          actions={
            (row) => (
              <div className="flex space-x-2">
                <FileText className="w-5 h-5 text-blue-500 cursor-pointer" onClick={() => openViewModal(row)} />
                <Download className="w-5 h-5 text-green-500 cursor-pointer" />
              </div>
            )
          }
        />

        <Modal title='Rapportdetaljer' isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
          {selectedReport && (
            <div>
              <p><strong>Rapport ID:</strong> {selectedReport.id}</p>
              <p><strong>Dato:</strong> {selectedReport.date}</p>
              <p><strong>Antall logger:</strong> {selectedReport.logCount}</p>
              <p><strong>Status:</strong> {selectedReport.status}</p>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <CustomButton color="blue" onClick={() => setIsViewModalOpen(false)}>
              Lukk
            </CustomButton>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default CarLogReports;