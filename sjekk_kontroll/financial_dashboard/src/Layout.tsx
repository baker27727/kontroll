import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import { Outlet, useNavigate } from 'react-router-dom';

import './Layout.scss';
import { useAppDispatch } from './hooks/hooks';
import { verifyManagerToken } from './redux/stores/auth_store';
import { showNotification } from './redux/stores/notification_store';
import Routes from './constants/routes';

const Layout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(
      verifyManagerToken()
    ).unwrap()
    .then(() => {
      console.log('Token Verified')
    })
      .catch(() => {
        dispatch(showNotification({
          message: 'Login Expired',
          description: 'Login Again.',
          type: 'error',
        }))
        navigate(Routes.LOGIN)
      })
  }, [dispatch, navigate])

  return (
    <div className='layout'>
      <Navbar />
      <Notification />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
