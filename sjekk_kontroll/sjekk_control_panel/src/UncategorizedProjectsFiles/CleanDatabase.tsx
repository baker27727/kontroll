import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Trash2, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';
import { IconType } from 'react-icons';

const CleanDatabase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const tables = [
    'Users', 'Orders', 'Restaurants', 'Menu Items', 'Reviews', 'Payments',
    'Delivery Addresses', 'Promotions', 'Coupons', 'Notifications'
  ];

  const handleDelete = (table: string) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6">Clean Database</h1>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <h2 className="font-medium">Warning</h2>
            <h3>Deleting table data is irreversible. Please proceed with caution.</h3>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="mb-4">Database Tables</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.map((table, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h2 className="font-medium">{table}</h2>
                <Button
                color='red'
                  size="sm"
                  leftIcon={Trash2 as IconType}
                  onClick={() => handleDelete(table)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Confirm Deletion: ${selectedTable}`}
        size="md"
      >
        <div className="space-y-4">
          <h2>Are you sure you want to delete all data from the {selectedTable} table?</h2>
          <h3 className="text-red-600">This action cannot be undone.</h3>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button color='red' leftIcon={Trash2 as IconType}>Delete Table Data</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CleanDatabase;