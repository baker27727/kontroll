// MainLayout.js
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { socket } from '../socket';
import { getAllPlaceRegisteredCars } from '../redux/features/DashboardSlice';
import NotificationService from '../services/notification_service';

const {  Content } = Layout;

const MainLayout = () => {

  const {place_dashboard} = useAppSelector(state => state.auth_reducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    NotificationService.saveSubscription({
      public_place_dashboard_id: place_dashboard?.id
    })
  }, [place_dashboard?.id])
  // const navigate = useNavigate()

  // useEffect(() => {
  //   dispatch(
  //     verifyToken()
  //   ).unwrap()
  //     .catch((error) => {
  //       dispatch(showNotification({
  //         message: 'Login Expired',
  //         description: 'Login Again.',
  //         type: 'error',
  //       }))
  //       navigate(Routes.LOGIN)
  //     })
  // }, [dispatch, navigate])


  
  useEffect(() => {
    socket.connect()

    socket.on('notify_public_place_dashboard_with_car_registration', () => {
      dispatch(getAllPlaceRegisteredCars(place_dashboard?.id))

      console.log('i was dispatched');
    })

    socket.on('notify_public_place_dashboard_with_car_expiration', () => {
      dispatch(getAllPlaceRegisteredCars(place_dashboard?.id))

      console.log('i was dispatched');
    })

    socket.on('notify_public_place_dashboard_with_car_removal', () => {
      dispatch(getAllPlaceRegisteredCars(place_dashboard?.id))

      console.log('i was dispatched');
    })

    return () => {
      socket.disconnect()
    }
  }, [dispatch, place_dashboard?.id])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
  );
};

export default MainLayout;
