import React, { useState, useEffect } from 'react';
import { EyeIcon, EditIcon, TrashIcon, PlusIcon } from 'lucide-react';
import { Column, DataTable } from '../../components/DataTable';
import DropdownMenu from '../../components/DropdownMenu';
import Button from '../../components/Button';
import ActionBar from '../../components/Actionbar';
import { IconType } from 'react-icons';
import { Card } from '../../components/Card';
import { Input } from '../../components/InputField';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import { DangerModal } from '../../components/DangerModal';

type Event = {
  id: string;
  name: string;
  channel: string;
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [channels, setChannels] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEventName, setNewEventName] = useState('');
  const [newEventChannel, setNewEventChannel] = useState('');

  useEffect(() => {
    // Fetch events and channels from API
    // This is a placeholder. Replace with actual API calls.
    setEvents([
      { id: '1', name: 'Login', channel: 'Email' },
      { id: '2', name: 'Logout', channel: 'Push' },
      { id: '3', name: 'Purchase', channel: 'SMS' },
    ]);
    setChannels(['Email', 'SMS', 'Push']);
  }, []);

  const handleCreateEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      name: newEventName,
      channel: newEventChannel,
    };
    setEvents([...events, newEvent]);
    setIsCreateModalOpen(false);
    setNewEventName('');
    setNewEventChannel('');
  };

  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(e => e.id !== selectedEvent.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  const columns: Column<Event>[] = [
    { id: 'name', key: 'name', title: 'Event Name', sortable: true },
    { id: 'channel', key: 'channel', title: 'Channel', sortable: true },
  ];

  const actions = (event: Event) => (
    <DropdownMenu
      trigger={<Button variant="ghost" size="sm">Actions</Button>}
      items={[
        {
          label: 'View',
          icon: <EyeIcon size={16} />,
          onClick: () => console.log('View event:', event),
        },
        {
          label: 'Edit',
          icon: <EditIcon size={16} />,
          onClick: () => console.log('Edit event:', event),
        },
        {
          label: 'Delete',
          icon: <TrashIcon size={16} />,
          onClick: () => handleDeleteEvent(event),
          hoverColor: 'red',
        },
      ]}
    />
  );

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Events', href: '/events' },
  ];

  return (
    <div className="container mx-auto p-4">
      <ActionBar
        breadcrumbItems={breadcrumbItems}
      >
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={PlusIcon as IconType}
        >
          Create Event
        </Button>
      </ActionBar>
      <Card title="Events">
        <DataTable
          columns={columns}
          data={events}
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
        title="Create New Event"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleCreateEvent(); }}>
          <Input
            placeholder='Enter event name'
            helperText="Event Name"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            required
          />
          <Select
            options={channels.map(channel => ({ value: channel, label: channel }))}
            placeholder="Select a channel"
            onChange={(value) => setNewEventChannel(value)}
            className="mt-4"
          />
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" color="gray" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Create Event
            </Button>
          </div>
        </form>
      </Modal>

      <DangerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Event"
        content="Are you sure you want to delete this event? This action cannot be undone."
        onAccept={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Events;