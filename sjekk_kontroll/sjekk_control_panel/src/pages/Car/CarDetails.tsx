import { useState } from 'react';
import { ArrowLeft, Edit, Trash, Clock, MapPin, AlertTriangle, CheckCircle, Car, Calendar, Text } from 'lucide-react';

// Dummy data for visualization
const carData = {
  plateNumber: 'CV89558',
  carModel: 'Tesla Model 3',
  carDescription: 'Electric sedan with advanced autopilot features',
  manufactureYear: 2023,
  carColor: 'Midnight Silver Metallic',
  carType: 'Electric',
  brand: 'Tesla',
  logoUrl: '/placeholder.svg?height=50&width=50',
  status: 'Active',
  lastLocation: 'Oslo Central Station',
  mileage: 15000,
  nextServiceDate: '2024-06-15',
};

const registrationHistory = [
  { date: '2023-01-15', type: 'Initial Registration', location: 'Oslo DMV' },
  { date: '2023-06-30', type: 'Renewal', location: 'Online' },
  { date: '2023-12-01', type: 'Address Update', location: 'Bergen DMV' },
];

const violations = [
  { date: '2023-03-10', type: 'Speeding', location: 'E18 Highway', status: 'Resolved' },
  { date: '2023-08-22', type: 'Parking', location: 'City Center', status: 'Pending' },
];

export default function CarDetails() {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2" />
          Back to Cars List
        </button>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-600 hover:text-blue-600">
            <Edit />
          </button>
          <button className="p-2 text-gray-600 hover:text-red-600">
            <Trash />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <img src={carData.logoUrl} alt={`${carData.brand} logo`} className="w-12 h-12 mr-4" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{carData.plateNumber}</h1>
                <p className="text-xl text-gray-600">{carData.carModel}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                carData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {carData.status}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4 border-b">
              <button
                className={`py-2 px-4 focus:outline-none ${
                  activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Car Information
              </button>
              <button
                className={`py-2 px-4 focus:outline-none ${
                  activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('history')}
              >
                Registration History
              </button>
              <button
                className={`py-2 px-4 focus:outline-none ${
                  activeTab === 'violations' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('violations')}
              >
                Violations
              </button>
            </div>
          </div>

          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={<Car className="text-gray-400" />} label="Car Type" value={carData.carType} />
              <InfoItem icon={<Calendar className="text-gray-400" />} label="Manufacture Year" value={carData.manufactureYear} />
              <InfoItem icon={<Car className="text-gray-400" />} label="Color" value={carData.carColor} />
              <InfoItem icon={<Text className="text-gray-400" />} label="Description" value={carData.carDescription} />
              <InfoItem icon={<Car className="text-gray-400" />} label="Mileage" value={`${carData.mileage} km`} />
              <InfoItem icon={<Calendar className="text-gray-400" />} label="Next Service Date" value={carData.nextServiceDate} />
              <InfoItem icon={<MapPin className="text-gray-400" />} label="Last Known Location" value={carData.lastLocation} />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {registrationHistory.map((event, index) => (
                <div key={index} className="flex items-start border-b pb-4">
                  <Clock className="text-blue-500 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">{event.type}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'violations' && (
            <div className="space-y-4">
              {violations.map((violation, index) => (
                <div key={index} className="flex items-start border-b pb-4">
                  <AlertTriangle className={`mr-3 mt-1 ${violation.status === 'Resolved' ? 'text-green-500' : 'text-red-500'}`} />
                  <div>
                    <p className="font-semibold">{violation.type} Violation</p>
                    <p className="text-sm text-gray-600">{violation.date} - {violation.location}</p>
                    <p className={`text-sm font-medium ${violation.status === 'Resolved' ? 'text-green-600' : 'text-red-600'}`}>
                      {violation.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value, icon }) => (
  <div className="flex items-start">
    {icon || <CheckCircle className="text-green-500 mr-2 mt-1" />}
    <div>
      <p className="font-medium text-gray-700">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);