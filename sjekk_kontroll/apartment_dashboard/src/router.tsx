import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import RequireAuth from "./components/RequiredAuth";
import ProfilePage from "./views/Profile";
import CarsPage from "./views/Cars";
import EarningsPage from "./views/Earnings";
import LocationsPage from "./views/Locations";
import SharePage from "./views/ShareAndEarn";
import HomeDashboard from "./views/Home";
import NotificationRequired from "./wrappers/NotificationRequired";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <NotificationRequired>
            <Layout />
        </NotificationRequired>,
        children: [
            {
                index: true,
                element: <RequireAuth>
                    <HomeDashboard />
                </RequireAuth>,
            },
            {
                path: "/profile",
                element: <RequireAuth>
                    <ProfilePage />
                </RequireAuth>,
            },
            {
                path: "/cars",
                element: <RequireAuth>
                    <CarsPage />
                </RequireAuth>,
            },
            {
                path: "/earnings",
                element: <RequireAuth>
                    <EarningsPage />
                </RequireAuth>,
            },
            {
                path: "/locations",
                element: <RequireAuth>
                    <LocationsPage />
                </RequireAuth>,
            },
            {
                path: "/share-earn",
                element: <RequireAuth>
                    <SharePage />
                </RequireAuth>,
            },
        ]
    }
]);


export default router