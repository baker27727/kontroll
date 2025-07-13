import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useAppDispatch } from "./hooks/hooks"
import { useEffect } from "react"
import { initializeApartment } from "./redux/featuers/auth_store"
import Notification from "./components/Notification"
import NotificationService from "./services/notification_service"

const Layout = () => {
    const dispatch = useAppDispatch()

  
    useEffect(() => {
        dispatch(initializeApartment())
        NotificationService.saveSubscription({ apartment_id: 1 })
    }, [dispatch])


  return (
    <div className="min-h-screen">
        <Header />
        <div className="p-8 min-h-[calc(100vh-245px)]">
          <Outlet />
        </div>
        <Footer />
        <Notification />
    </div>
  )
}

export default Layout