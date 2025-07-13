import React, { useState, useEffect } from 'react';
import { EyeIcon, EditIcon, TrashIcon, Plus } from 'lucide-react';
import { Column, DataTable } from '../../components/DataTable';
import DropdownMenu from '../../components/DropdownMenu';
import Button from '../../components/Button';
import ActionBar from '../../components/Actionbar';
import { IconType } from 'react-icons';
import { Card } from '../../components/Card';
import Modal from '../../components/Modal';
import { Input } from '../../components/InputField';
import Select from '../../components/Select';
import { DangerModal } from '../../components/DangerModal';

type Domain = {
  id: string;
  name: string;
  channel: string;
};

const Domains: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [channels, setChannels] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [newDomainName, setNewDomainName] = useState('');
  const [newDomainChannel, setNewDomainChannel] = useState('');

  useEffect(() => {
    // Fetch domains and channels from API
    // This is a placeholder. Replace with actual API calls.
    setDomains([
      { id: '1', name: 'example.com', channel: 'Email' },
      { id: '2', name: 'sms.com', channel: 'SMS' },
      { id: '3', name: 'mobile.com', channel: 'Push' },
    ]);
    setChannels(['Email', 'SMS', 'Push']);
  }, []);

  const handleCreateDomain = () => {
    const newDomain: Domain = {
      id: Date.now().toString(),
      name: newDomainName,
      channel: newDomainChannel,
    };
    setDomains([...domains, newDomain]);
    setIsCreateModalOpen(false);
    setNewDomainName('');
    setNewDomainChannel('');
  };

  const handleDeleteDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDomain) {
      setDomains(domains.filter(d => d.id !== selectedDomain.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedDomain(null);
  };

  const columns: Column<Domain>[] = [
    { id: 'name', key: 'name', title: 'Domain Name', sortable: true },
    { id: 'channel', key: 'channel', title: 'Channel', sortable: true },
  ];

  const actions = (domain: Domain) => (
    <DropdownMenu
      trigger={<Button variant="ghost" size="sm">Actions</Button>}
      items={[
        {
          label: 'View',
          icon: <EyeIcon size={16} />,
          onClick: () => console.log('View domain:', domain),
        },
        {
          label: 'Edit',
          icon: <EditIcon size={16} />,
          onClick: () => console.log('Edit domain:', domain),
        },
        {
          label: 'Delete',
          icon: <TrashIcon size={16} />,
          onClick: () => handleDeleteDomain(domain),
          hoverColor: 'red',
        },
      ]}
    />
  );

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Domains', href: '/domains' },
  ];

  return (
    <div className="container mx-auto p-4">
      <ActionBar
        breadcrumbItems={breadcrumbItems}
      >
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={Plus as IconType}
        >
          Create Domain
        </Button>
      </ActionBar>
      <Card title="Domains">
        <DataTable
          columns={columns}
          
          data={domains}
          actions={actions}
          hoverable
          striped
          showColumnSelector
          paginated
        />
      </Card>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Domain"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleCreateDomain(); }}>
          <Input
            placeholder='Domain Name'
            helperText="Domain Name"
            value={newDomainName}
            onChange={(e) => setNewDomainName(e.target.value)}
            required
          />
          <Select
            options={channels.map(channel => ({ value: channel, label: channel }))}
            placeholder="Select a channel"
            onChange={(value) => setNewDomainChannel(value)}
            className="mt-4"
          />
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" color="gray" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Create Domain
            </Button>
          </div>
        </form>
      </Modal>

      <DangerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Domain"
        content="Are you sure you want to delete this domain? This action cannot be undone."
        onAccept={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Domains;