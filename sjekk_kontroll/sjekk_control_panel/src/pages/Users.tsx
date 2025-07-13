import React, { useEffect } from 'react';
import User from '../interfaces/User';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { createUser, deleteUser, getAllUsers, updateUser } from '../redux/features/UserSlice';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { Edit, MoreHorizontal, Plus, Shield, ShieldAlert, Text, Trash, Trash2 } from 'lucide-react';
import { DangerModal } from '../components/DangerModal';
import Modal from '../components/Modal';
import CustomButton from '../components/Button';
import { Input } from '../components/InputField';
import { showNotification } from '../redux/features/notification_store';
import { unwrapResult } from '@reduxjs/toolkit';
import { DataTable } from '../components/DataTable';
import { Card } from '../components/Card';
import { IconType } from 'react-icons';
import { nullifyEmptyString } from '../library/string_library';
import { NavLink } from 'react-router-dom';
import Routes from '../constants/routes';
import DropdownMenu from '../components/DropdownMenu';


const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.UserReducer);
  const { t } = useTranslation(); // Initialize useTranslation hook

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  const [name, setName] = React.useState('');
  const [pnid, setPnid] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmationPassword, setConfirmationPassword] = React.useState('');




  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  const openDeleteModal = (user: User) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setName(user.name);
    setPnid(user.pnid);
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteAccept = async () => {    
    await dispatch(
      deleteUser(currentUser!.id)
    ).then(unwrapResult)
    .then(() => {
      dispatch(
        showNotification({
          type: 'success',
          message: t('deleted_successfully'),
          description: t('deleted_successfully'),
        })
      )
    }).catch((err: Error) => {
      dispatch(
        showNotification({
          type: 'error',
          message: t('deleted_error'),
          description: err.message,
        })
      )
    })
    setIsModalOpen(false);
  };

  const handleCreateAccept = async () => {
    if(password !== confirmationPassword) {
      dispatch(
        showNotification({
          type: 'error',
          message: t('passwords_do_not_match'),
          description: t('passwords_do_not_match'),
        })
      )

      return
    }
    await dispatch(
      createUser({
        name,
        pnid,
        password
      })
    )
    .then(unwrapResult)
      .then(() => {
        dispatch(
          showNotification({
            type: 'success',
            message: t('created_successfully'),
            description: t('created_successfully'),
          })
        )

        setIsAddModalOpen(false);
      })
      .catch((err: Error) => {
        console.log(err);
        
        dispatch(
          showNotification({
            type: 'error',
            message: t('created_error'),
            description: err.message,
          })
        )
      });
  }

  const handleEditAccept = async () => {
    await dispatch(updateUser({
      id: currentUser.id,
      payload: {
          pnid: pnid,
          password: nullifyEmptyString(password),
          name: name
      }
  }))
  .then(unwrapResult)
  .then(() => {
    dispatch(
      showNotification({
        type: 'success',
        message: t('updated_successfully'),
        description: t('updated_successfully'),
      })
    )

    dispatch(getAllUsers());

    setIsEditModalOpen(false);
  }).catch((err: Error) => {
    dispatch(
      showNotification({
        type: 'error',
        message: t('updated_error'),
        description: err.message,
      })
    )

    setIsEditModalOpen(false);
  });
  }

  const [searchText] = React.useState('');


  const filteredUsers = state.users.filter(user =>
    Object.values(user).some(value =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <>
      <Card headerAction={
          <div className='flex justify-center items-center space-x-2'>
          <NavLink to={Routes.PAGES.DELETED_USERS}>
            <CustomButton size='sm' leftIcon={Trash as IconType} onClick={() => {}} variant='outline' color='red'>
              See Deleted Users
            </CustomButton>  
          </NavLink>
        {/* <CustomButton size='sm' leftIcon={Logs as IconType} onClick={() => navigate(Routes.PAGES.USERS_LOGS)} variant='outline' >
          User Logs
        </CustomButton>  */}
        <CustomButton variant='outline' leftIcon={Plus as IconType} size='sm' onClick={() => setIsAddModalOpen(true)}>
        {t('Add Employee')}
        </CustomButton>
          </div>
      } title='Employees'>
      
      <DataTable 
        data={filteredUsers}
        showColumnSelector
        loading={state.loading}
        columns={[
          {id: 'pnid', title: t('Pnid'), key: 'pnid', sortable: true},
          {id: 'name', title: t('name'), key: 'name', sortable: true},
          {id: 'created_at', title: t('created_at'), key: 'created_at', sortable: true},
        ]}

        itemsPerPage={8}
        hoverable
        actions={
          (row: User) => (
            <DropdownMenu 
              trigger={
                <MoreHorizontal />
              }

              items={[
                {
                  label: t('Edit'),
                  icon: <Edit className='w-4 h-4'/>,
                  onClick: () => openEditModal(row)
                },
                {
                  label: t('Delete'),
                  icon: <Trash2 className='w-4 h-4'/>,
                  hoverColor: 'red',
                  onClick: () => openDeleteModal(row)
                }
              ]}
            />
          )
        }
      />
      </Card>

<Modal title='Add Employee' isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <>
          <Input icon={Text as IconType} placeholder='Name' helperText='Enter the name of the employee' value={name} onChange={(e) => setName(e.target.value)}/>
          <Input icon={Text as IconType} placeholder='PNID' helperText='Enter the pnid' value={pnid} onChange={(e) => setPnid(e.target.value)}/>
          <Input icon={ShieldAlert as IconType} placeholder='Password' helperText='Enter the password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Input icon={ShieldAlert as IconType} placeholder='Confirm Password' helperText='Confirm the password' value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)}/>

            <div className='flex justify-end'>
            <CustomButton color='gray' size='sm' onClick={() => setIsAddModalOpen(false)} variant="outline" className='mr-2'>
              Cancel
            </CustomButton>

            <CustomButton size='sm' onClick={handleCreateAccept} color="green">
              Create
            </CustomButton>
            </div>
          </>
      </Modal>

<Modal title={`Update Employee "${currentUser?.name}"`} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <>
          <Input icon={Text as IconType} placeholder='Name' helperText='Enter the name of the employee' value={name} onChange={(e) => setName(e.target.value)}/>
          <Input icon={Text as IconType} placeholder='PNID' helperText='Enter the pnid' value={pnid} onChange={(e) => setPnid(e.target.value)}/>
          <Input icon={Shield as IconType} placeholder='Password' helperText='Enter new password (optional) *' value={password} onChange={(e) => setPassword(e.target.value)}/>

            <div className='flex justify-end'>
            <CustomButton color='gray' onClick={() => setIsEditModalOpen(false)} variant="outline" className='mr-2'>
              Cancel
            </CustomButton>

            <CustomButton color='green' onClick={handleEditAccept} >
              Update
            </CustomButton>
            </div>
          </>
      </Modal>

      <DangerModal 
        title='Delete User'
        content={`Are you sure you want to delete the user "${currentUser?.name}"?`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleDeleteAccept}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default UsersPage;
