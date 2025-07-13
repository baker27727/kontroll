// src/pages/EditManager.tsx

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { updateManager } from '../../../redux/stores/manager_store';
import Routes from '../../../constants/routes';
import { showNotification } from '../../../redux/stores/notification_store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const EditManager: React.FC = () => {

  const { current_manager } = useAppSelector((state) => state.manager_store);

  const [name, setName] = useState(current_manager.name);
  const [username, setUsername] = useState(current_manager.username);
  const [email, setEmail] = useState(current_manager.linked_email);
  const [role, setRole] = useState<string>(current_manager.role);
  
  useEffect(() => {
    setName(current_manager.name);
    setUsername(current_manager.username);
    setEmail(current_manager.linked_email);
    setRole(current_manager.role);
  }, [current_manager]);

  const dispatch = useAppDispatch()

  const navigate = useNavigate();
  const [t] = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(
      updateManager({
        id: current_manager.id,
        name,
        username,
        linked_email: email,
        role: role as 'supervisor' | 'reader' | 'admin',
        created_at: null,
        last_login_time: null
      })
    ).unwrap()
    .then(() => {
      dispatch(
        showNotification({
          message: t('managers_block.edit_manager_block.manager_updated_title'),
          description: t('managers_block.edit_manager_block.manager_updated_message'),
          type: 'success',
        })
      );
      navigate(Routes.MANAGERS);
    }).catch(() => {
      dispatch(
        showNotification({
          message: t('managers_block.edit_manager_block.manager_update_failed_title'),
          description: t('managers_block.edit_manager_block.manager_update_failed_message'),
          type: 'error',
        })
      );
    })
  };

  return (
    <main className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <header className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">
              {t('managers_block.edit_manager_block.edit_manager')}
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {t('managers_block.edit_manager_block.edit_manager_message')}
            </p>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('managers_block.edit_manager_block.form_fields.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  {t('managers_block.edit_manager_block.form_fields.username')}
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="linked_email" className="block text-sm font-medium text-gray-700">
                  {t('managers_block.edit_manager_block.form_fields.linked_email')}
                </label>
                <input
                  type="email"
                  name="linked_email"
                  id="linked_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  {t('managers_block.edit_manager_block.form_fields.role')}
                </label>
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="admin">
                    {t('managers_block.edit_manager_block.roles.admin')}
                  </option>
                  <option value="supervisor">
                    {t('managers_block.edit_manager_block.roles.supervisor')}
                  </option>
                  <option value="reader">
                    {t('managers_block.edit_manager_block.roles.reader')}
                  </option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-1 bg-blue-500 text-white font-semibold rounded-sm shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('managers_block.edit_manager_block.form_fields.submit_button')}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default EditManager;
