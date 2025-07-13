import React, { useEffect, useState, useMemo } from 'react';
import { FaEdit, FaTrashAlt, FaHistory, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { deleteManager, getManagers, setManager } from '../../redux/stores/manager_store';
import { showNotification } from '../../redux/stores/notification_store';
import Manager from '../../interfaces/Manager';
import Routes from '../../constants/routes';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Table } from '../../components/Table';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Tooltip } from '../../components/Tooltip';

const Managers: React.FC = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const { managers } = useAppSelector(state => state.manager_store);
  const [currentManager, setCurrentManager] = useState<Manager | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getManagers());
  }, [dispatch]);

  const handleDelete = async () => {
    if (currentManager) {
      await dispatch(deleteManager(currentManager.id))
        .unwrap()
        .then(() => {
          dispatch(
            showNotification({
              message: t('managers_block.manager_deleted_title'),
              description: t('managers_block.manager_deleted_message'),
              type: 'success',
            })
          );
          setIsDeleteDialogOpen(false);
          setCurrentManager(null);
        })
        .catch(() => {
          dispatch(
            showNotification({
              message: t('managers_block.delete_failed_title'),
              description: t('managers_block.delete_failed_message'),
              type: 'error',
            })
          );
        });
    }
  };

  const handleEdit = (manager: Manager) => {
    dispatch(setManager(manager));
    navigate(`/managers/${manager.id}/edit`);
  };

  const handleViewLogins = (id: number) => {
    navigate(`/managers/${id}/logins`);
  };

  const filteredManagers = useMemo(() => {
    return managers.filter(manager =>
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.linked_email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [managers, searchTerm]);

  const columns = [
    { header: t('managers_block.table_headers.id'), accessor: 'id' },
    { header: t('managers_block.table_headers.name'), accessor: 'name' },
    { header: t('managers_block.table_headers.username'), accessor: 'username' },
    { header: t('managers_block.table_headers.linked_email'), accessor: 'linked_email' },
    { header: t('managers_block.table_headers.last_login_time'), accessor: 'last_login_time' },
    { header: t('managers_block.table_headers.created_at'), accessor: 'created_at' },
    { header: t('managers_block.table_headers.role'), accessor: 'role' },
  ];

  const actions = (manager: Manager) => (
    <div className="flex space-x-2">
      <Tooltip content={t('managers_block.edit_tooltip')}>
        <Button
          onClick={() => handleEdit(manager)}
          variant="secondary"
          size="sm"
          icon={<FaEdit />}
        />
      </Tooltip>
      <Tooltip content={t('managers_block.delete_tooltip')}>
        <Button
          onClick={() => {
            setCurrentManager(manager);
            setIsDeleteDialogOpen(true);
          }}
          variant="danger"
          size="sm"
          icon={<FaTrashAlt />}
        />
      </Tooltip>
      <Tooltip content={t('managers_block.view_logins_tooltip')}>
        <Button
          onClick={() => handleViewLogins(manager.id)}
          variant="secondary"
          size="sm"
          icon={<FaHistory />}
        />
      </Tooltip>
    </div>
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {t('managers_block.managers')}
              </h1>
              <p className="text-lg text-gray-600 mt-2">{t('managers_block.manage_managers_message')}</p>
            </div>
            <Button
              onClick={() => navigate(Routes.CREATE_MANAGER)}
              variant="primary"
              icon={<FaPlus />}
            >
              {t('managers_block.add_manager_button')}
            </Button>
          </header>

          <div className="mb-4">
            <Input
              type="text"
              placeholder={t('managers_block.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table
            data={filteredManagers}
            columns={columns}
            actions={actions}
            emptyMessage={t('managers_block.no_managers_found')}
          />
        </motion.section>
      </div>

      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title={t('managers_block.delete_confirmation_title')}
        content={t('managers_block.delete_confirmation_message')}
        onConfirm={handleDelete}
        confirmText={t('managers_block.ok_button')}
        cancelText={t('managers_block.cancel_button')}
        variant="danger"
      />
    </motion.main>
  );
};

export default Managers;
