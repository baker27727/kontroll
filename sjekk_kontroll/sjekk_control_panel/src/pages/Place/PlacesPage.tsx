import { useState } from 'react'
import PublicPlaces from './tabs/PublicPlaces';
import ResidentialQuarter from './tabs/ResidentialQuarters';
import Apartments from '../Apartments';

const PlacePage = () => {
  const [activeTab, setActiveTab] = useState('Normal');

  const tabs = ['Normal', 'Residential', 'Apartments'];

  return (
    <div className=" bg-gray-100">
      <div className=" mx-auto">        
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="flex border-b">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`px-6 py-2 hover:border-b-2 hover:border-blue-200 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="p-4">
            
            {activeTab === 'Normal' && <PublicPlaces />}
            {activeTab === 'Residential' && <ResidentialQuarter />}
            {activeTab === 'Apartments' && <Apartments />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;