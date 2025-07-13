import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

// import { useAppDispatch, useAppSelector } from './hooks/hooks'
// import { socket } from './socket'
import NotificationComponent from './components/Notification'
import Footer from './components/Footer'
import { socket } from './socket'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { getRegisteredCars } from './redux/stores/registered_cars_store'
import NotificationService from './services/notification_service'
// import { verifyToken } from './redux/stores/auth_store'
// import { showNotification } from './redux/stores/notification_store'
// import Routes from './constants/routes'

const Layout = () => {
  const {dashboard} = useAppSelector(state => state.auth_store)
  const dispatch = useAppDispatch()
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
    NotificationService.saveSubscription({
      residential_dashboard_id: dashboard.id
    })
  }, [])
  
  useEffect(() => {
    socket.connect()

    socket.on('notify_residential_quarter_with_car_expiration', () => {
      dispatch(getRegisteredCars(dashboard.residential_quarter.id))

      console.log('i was dispatched');
    })

    socket.on('notify_residential_quarter_with_car_deletion', () => {
      dispatch(getRegisteredCars(dashboard.residential_quarter.id))

      console.log('i was dispatched');
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <div className='layout'>
        <Navbar />
        <div className="p-4">
            <Outlet />
        </div>
        <Footer />

        <NotificationComponent />
    </div>
  )
}

export default Layout