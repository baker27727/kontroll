import React, { useState } from 'react';
import { Plus, Edit, Trash2, Mail, AlertTriangle, MapPin, Car, Eye, X } from 'lucide-react';

interface Template {
  id: number;
  name: string;
  type: 'email' | 'violation' | 'location' | 'car';
  lastUpdated: string;
  content: string;
}

const TemplateManagement: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, name: 'Welcome Email', type: 'email', lastUpdated: '2023-06-01', content: 'Welcome to our service! We\'re excited to have you on board.' },
    { id: 2, name: 'Order Confirmation', type: 'email', lastUpdated: '2023-06-02', content: 'Your order has been confirmed. Order details: {ORDER_DETAILS}' },
    { id: 3, name: 'Speed Limit Violation', type: 'violation', lastUpdated: '2023-06-03', content: 'You have exceeded the speed limit. Details: {VIOLATION_DETAILS}' },
    { id: 4, name: 'Parking Violation', type: 'violation', lastUpdated: '2023-06-04', content: 'Your vehicle was found in violation of parking regulations. Details: {VIOLATION_DETAILS}' },
    { id: 5, name: 'New Location Login', type: 'location', lastUpdated: '2023-06-05', content: 'A new login was detected from {LOCATION}. If this wasn\'t you, please contact support.' },
    { id: 6, name: 'Suspicious Login', type: 'location', lastUpdated: '2023-06-06', content: 'We detected a suspicious login attempt from {LOCATION}. Please verify your account security.' },
    { id: 7, name: 'Maintenance Log', type: 'car', lastUpdated: '2023-06-07', content: 'Maintenance performed on {DATE}: {MAINTENANCE_DETAILS}' },
    { id: 8, name: 'Fuel Consumption', type: 'car', lastUpdated: '2023-06-08', content: 'Fuel consumption report: {FUEL_DETAILS}' },
  ]);

  const [activeTab, setActiveTab] = useState<'email' | 'violation' | 'location' | 'car'>('email');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState('');

  const filteredTemplates = templates.filter(template => template.type === activeTab);

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleDelete = (template: Template) => {
    setTemplates(templates.filter(t => t.id !== template.id));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('templateName') as string;
    const content = formData.get('templateContent') as string;
    const type = formData.get('templateType') as 'email' | 'violation' | 'location' | 'car';

    if (selectedTemplate) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id ? { ...t, name, content, type, lastUpdated: new Date().toISOString().split('T')[0] } : t
      ));
    } else {
      const newTemplate: Template = {
        id: Math.max(...templates.map(t => t.id)) + 1,
        name,
        content,
        type,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
    }
    setIsModalOpen(false);
  };

  const renderTabIcon = (type: 'email' | 'violation' | 'location' | 'car') => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'violation': return <AlertTriangle className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      case 'car': return <Car className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Template Management</h1>

      <div className="mb-6">
        <div className="flex space-x-2 border-b">
          {(['email', 'violation', 'location', 'car'] as const).map((tab) => (
            <button
              key={tab}
              className={`flex items-center space-x-2 px-4 py-2 focus:outline-none ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {renderTabIcon(tab)}
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)} Templates</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Templates</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => { setSelectedTemplate(null); setIsModalOpen(true); }}
        >
          <Plus className="w-4 h-4 inline-block mr-2" />
          Add New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
            <p className="text-sm text-gray-500 mb-4">Last updated: {template.lastUpdated}</p>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{template.content}</p>
            <div className="flex justify-between">
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => setPreviewContent(template.content)}
              >
                <Eye className="w-4 h-4 inline-block mr-1" />
                Preview
              </button>
              <div>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
                  onClick={() => handleEdit(template)}
                >
                  <Edit className="w-4 h-4 inline-block mr-1" />
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleDelete(template)}
                >
                  <Trash2 className="w-4 h-4 inline-block mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {selectedTemplate ? 'Edit Template' : 'Add New Template'}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="templateName"
                  name="templateName"
                  defaultValue={selectedTemplate?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="templateType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="templateType"
                  name="templateType"
                  defaultValue={selectedTemplate?.type || activeTab}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="email">Email</option>
                  <option value="violation">Violation</option>
                  <option value="location">Location</option>
                  <option value="car">Car</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="templateContent" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="templateContent"
                  name="templateContent"
                  defaultValue={selectedTemplate?.content}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={5}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Template Preview</h3>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setPreviewContent('')}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="whitespace-pre-wrap">{previewContent}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => setPreviewContent('')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManagement;