import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout'
import Routes from "./constants/routes";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import RegisterCar from "./pages/RegisterCar/RegisterCar";
import RegisteredCars from "./pages/RegisteredCars/RegisteredCars";
import Apartments from "./pages/Apartment/Apartments";
import ApartmentRequests from "./pages/Apartment/ApartmentRequests";
import ApartmentRegister from "./pages/Apartment/Register/ApartmentRegister";
import RequireAuth from "./components/RequiredAuth";
import AppWrapper from "./AppWrapper";
import NotificationRequired from "./wrappers/NotificationRequired";

const router =  createBrowserRouter([
    {
        path: Routes.HOME,
        element: <NotificationRequired>
            <AppWrapper />
        </NotificationRequired>,
        children: [
            {
                path: Routes.LOGIN,
                element: <LoginPage />
            },
            {
                path: Routes.APARTMENT_REGISTRATION,
                element: <ApartmentRegister />
            },
            {
                path: Routes.HOME,
                element: 
                    <RequireAuth><Layout /></RequireAuth>
                ,
                children: [
                    {
                        index: true,
                        element: <Home />
                    },
                    {
                        path: Routes.REGISTER_CAR,
                        element: <RegisterCar />
                    },
                    {
                        path: Routes.REGISTERED_CARS,
                        element: <RegisteredCars />
                    },
                    {
                        path: Routes.APARTMENTS,
                        element: <Apartments />
                    },
                    {
                        path: Routes.APARTMENTS_REQUESTS,
                        element: <ApartmentRequests />
                    },
                ]
            },
        ]
    }
]);

export default router