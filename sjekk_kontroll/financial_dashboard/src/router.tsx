import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout'
import Home from "./pages/home/Home";
import Sanctions from "./pages/Sanctions/Sanctions";
import Attachments from "./pages/Attachments/Attachments";
import Statistics from "./pages/Statistics/Statistics";
import ReportsAndFinances from "./pages/Reports/Reports";
import LoginPage from "./pages/Login/Login";
import Routes from "./constants/routes";
import Managers from "./pages/Managers/Managers";
import ManagerLogins from "./pages/Managers/Logins/Logins";
import EditManager from "./pages/Managers/Edit/EditManager";
import DeletedSanctions from "./pages/Sanctions/Deleted/DeletedSanctions";
import CreateManager from "./pages/Managers/Create/CreateManager";
import SanctionDetails from "./pages/Sanctions/Details/SanctionDetails";
const router =  createBrowserRouter([
    {
        path: Routes.LOGIN,
        element: <LoginPage />
    },
    {
        path: Routes.HOME,
        element: <Layout />,
        children: [
            {
                path: Routes.HOME,
                element: <Home />
            },
            {
                path: Routes.SANCTIONS,
                element: <Sanctions />
            },
            {
                path: Routes.ATTACHMENTS,
                element: <Attachments/>
            },
            {
                path: Routes.STATISTICS,
                element: <Statistics />
            },
            {
                path: Routes.REPORTS,
                element: <ReportsAndFinances />
            },
            {
                path: Routes.MANAGERS,
                element: <Managers />
            },
            {
                path: Routes.CREATE_MANAGER,
                element: <CreateManager />
            },
            {
                path: Routes.MANAGER_LOGINS,
                element: <ManagerLogins />
            },
            {
                path: Routes.MANAGER_EDIT,
                element: <EditManager />
            },
            {
                path: Routes.DELETED_SANCTIONS,
                element: <DeletedSanctions />
            },
            {
                path: Routes.SANCTION_DETAILS,
                element: <SanctionDetails />
            }
        ]
    },
]);

export default router