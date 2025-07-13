import React, { useState, useEffect } from 'react';
import { EyeIcon, EditIcon, TrashIcon } from 'lucide-react';
import DropdownMenu from '../../components/DropdownMenu';
import { Column, DataTable } from '../../components/DataTable';
import Button from '../../components/Button';
import ActionBar from '../../components/Actionbar';
import { IconType } from 'react-icons';
import { Card } from '../../components/Card';
import Modal from '../../components/Modal';
import { Input } from '../../components/InputField';
import { DangerModal } from '../../components/DangerModal';

type Channel = {
  id: string;
  name: string;
  domains: string[];
};

const Channels: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelDomains, setNewChannelDomains] = useState('');

  useEffect(() => {
    // Fetch channels from API
    // This is a placeholder. Replace with actual API call.
    setChannels([
      { id: '1', name: 'Email', domains: ['example.com', 'test.com'] },
      { id: '2', name: 'SMS', domains: ['sms.com'] },
      { id: '3', name: 'Push', domains: ['mobile.com', 'web.com'] },
    ]);
  }, []);

  const handleCreateChannel = () => {
    const newChannel: Channel = {
      id: Date.now().toString(),
      name: newChannelName,
      domains: newChannelDomains.split(',').map(domain => domain.trim()),
    };
    setChannels([...channels, newChannel]);
    setIsCreateModalOpen(false);
    setNewChannelName('');
    setNewChannelDomains('');
  };

  const handleDeleteChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedChannel) {
      setChannels(channels.filter(c => c.id !== selectedChannel.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedChannel(null);
  };

  const columns: Column<Channel>[] = [
    { id: 'name', key: 'name', title: 'Channel Name', sortable: true },
    { id: 'domains', key: 'domains', title: 'Domains', render: (value) => (value as string[]).join(', ') },
  ];

  const actions = (channel: Channel) => (
    <DropdownMenu
      trigger={<Button variant="ghost" size="sm">Actions</Button>}
      items={[
        {
          label: 'View',
          icon: <EyeIcon size={16} />,
          onClick: () => console.log('View channel:', channel),
        },
        {
          label: 'Edit',
          icon: <EditIcon size={16} />,
          onClick: () => console.log('Edit channel:', channel),
        },
        {
          label: 'Delete',
          icon: <TrashIcon size={16} />,
          onClick: () => handleDeleteChannel(channel),
          hoverColor: 'red',
        },
      ]}
    />
  );

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Channels', href: '/channels' },
  ];

  return (
    <div className="container mx-auto p-4">
      <ActionBar
        breadcrumbItems={breadcrumbItems}
      >
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={EditIcon as IconType}
        >
          Create Channel
        </Button>
      </ActionBar>
      <Card title="Channels">
        <DataTable
          columns={columns}
          data={channels}
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
        title="Create New Channel"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleCreateChannel(); }}>
          <Input
            helperText="Channel Name"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            required
          />
          <Input
            placeholder='example.com, test.com'
            helperText="Domains (comma-separated)"
            value={newChannelDomains}
            onChange={(e) => setNewChannelDomains(e.target.value)}
            required
          />
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" color="gray" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Create Channel
            </Button>
          </div>
        </form>
      </Modal>

      <DangerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Channel"
        content="Are you sure you want to delete this channel? This action cannot be undone."
        onAccept={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Channels;