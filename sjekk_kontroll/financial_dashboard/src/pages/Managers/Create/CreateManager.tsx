import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Routes from '../../../constants/routes';
import { showNotification } from '../../../redux/stores/notification_store';
import { useAppDispatch } from '../../../hooks/hooks';
import { createManager } from '../../../redux/stores/manager_store';
import { useTranslation } from 'react-i18next';

const CreateManager = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<{ label: string; value: string } | null>(null);
  const [authorizations, setAuthorizations] = useState<string[]>([]);
  const [t] = useTranslation();

  const roles = [
    { value: 'supervisor', label: t('managers_block.create_manager_block.roles.supervisor') },
    { value: 'viewer', label: t('managers_block.create_manager_block.roles.viewer') },
  ];

  const authOptions = [
    { value: 'manage_users', label: t('managers_block.create_manager_block.authorizations.manage_users') },
    { value: 'view_reports', label: t('managers_block.create_manager_block.authorizations.view_reports') },
    { value: 'edit_content', label: t('managers_block.create_manager_block.authorizations.edit_content') },
    { value: 'manage_inventory', label: t('managers_block.create_manager_block.authorizations.manage_inventory') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(
        showNotification({
          message: t('managers_block.create_manager_block.password_mismatch_title'),
          description: t('managers_block.create_manager_block.password_mismatch_message'),
          type: 'error',
        })
      );
      return;
    }
    try {
      await dispatch(createManager({
        name, linked_email:email, password, role: role?.value, authorizations, username
      })).unwrap();
      dispatch(
        showNotification({
          message: t('managers_block.create_manager_block.manager_created_title'),
          description: t('managers_block.create_manager_block.manager_created_message'),
          type: 'success',
        })
      );
      navigate(Routes.MANAGERS);
    } catch (error) {
      dispatch(
        showNotification({
          message: t('managers_block.create_manager_block.manager_creation_failed_title'),
          description: t('managers_block.create_manager_block.manager_creation_failed_message'),
          type: 'error',
        })
      );
    }
  };

  return (
    <main className="bg-gray-100 p-2 select-none min-h-screen w-full">
      <div className="bg-white p-4 rounded-lg shadow w-full max-w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('managers_block.create_manager_block.create_manager')}</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                {t('managers_block.create_manager_block.form_fields.name')}
              </label>
              <input
                type="text"
                id="name"
                placeholder={t('managers_block.create_manager_block.form_fields.enter_name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                {t('managers_block.create_manager_block.form_fields.username')}
              </label>
              <input
                type="text"
                id="username"
                placeholder={t('managers_block.create_manager_block.form_fields.enter_username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                {t('managers_block.create_manager_block.form_fields.email')}
              </label>
              <input
                type="email"
                id="email"
                placeholder={t('managers_block.create_manager_block.form_fields.enter_email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                {t('managers_block.create_manager_block.form_fields.password')}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">
                {t('managers_block.create_manager_block.form_fields.confirm_password')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                {t('managers_block.create_manager_block.form_fields.role')}
              </label>
              <Select
                value={role}
                onChange={setRole}
                options={roles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                {t('managers_block.create_manager_block.form_fields.authorizations')}
              </label>
              <Select
                isMulti
                value={authOptions.filter(option => authorizations.includes(option.value))}
                onChange={(selectedOptions) =>
                  setAuthorizations(selectedOptions.map(option => option.value))
                }
                options={authOptions}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-sm transition duration-300 hover:bg-blue-400"
              >
                {t('managers_block.create_manager_block.form_fields.submit_button')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateManager;
