import { createBrowserRouter } from "react-router-dom";
import Routes from "./constants/routes";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ViolationsPage from "./pages/Violations";
import ErrorsAndWarningsPage from "./pages/Monitor/ErrorsAndWarnings/ErrorsAndWarnings";
import AnalyticsMonitoringPage from "./pages/Monitor/SampleAnalytic/SampleAnalytic";
import AuditLogsPage from "./pages/Monitor/AuditLogs/AuditLogs";
import VersionControl from "./pages/VersionControl/VersionControl";
import ChatPage from "./pages/Chats/Chats";
import MailboxPage from "./pages/Mailbox/Mailbox";
import ViewViolationPage from "./pages/ViewViolation";
import Policy from "./pages/Policy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Settings from "./pages/Settings/Settings";
import ApartmentRequestsPage from "./pages/Apartments/ApartmentRequests";
import PlaceRequestsPage from "./pages/Place/PlaceRequests";
import RulesPage from "./pages/Rules";
import PublicCarsPage from "./pages/PublicCars";
import UsersPage from "./pages/Users";
import PartnersPage from "./pages/Partners";
import CarLogReports from "./pages/CarLogsReports";
import PlacePage from "./pages/Place/PlacesPage";
import ReportsDashboard from "./pages/Dashboard/AnalyticsDashboard";
import PublicPlaceDashboards from "./pages/Place/PublicPlaceDashboard";
import Workspace from "./Workspace";
import UsersLogs from "./pages/User/UserLogs";
import UserLogins from "./pages/User/UserLogins";
import CarLogs from "./pages/Car/CarLogs";
import DeletedUsers from "./pages/User/DeletedUsers";
import ResidentialCarsPage from "./pages/ResidentialCars";
import NotificationManagement from "./pages/NotificationManagement/NotificationManagement";
import NotificationsStatisticsAndAnalysis from "./pages/NotificationManagement/NotificationAnalysis";
import RequireAuth from "./components/RequiredAuth";
import LoginPage from "./pages/Login";
import Notifications from "./pages/NotificationManagement/Notifications";
import ResidentialNotifications from "./pages/NotificationManagement/ResidentialNotifications";
import Apartments from "./pages/Apartments";
import PublicPlaceNotifications from "./pages/NotificationManagement/PublicPlaceNotifications";
import ApartmentNotifications from "./pages/NotificationManagement/ApartmentNotifications";
import PaymentDashboard from "./pages/Payments/PaymentDashboard";
import PaymentDetails from "./pages/Payments/PaymentDetails";
import PaymentReports from "./pages/Payments/PaymentReports";
import PaymentSettings from "./pages/Payments/PaymentSettings";
import EmployeeProfileComponent from "./pages/User/UserProfile";

const router =  createBrowserRouter([
    {
        path: Routes.AUTH.LOGIN,
        element: <LoginPage />
    },
    {
        path: Routes.HOME,
        element: <RequireAuth>
            <MainLayout />
        </RequireAuth>,
        children: [
            {
                path: Routes.HOME,
                element: <Home />
            },
            {
                path: Routes.DASHBOARDS.PAYMENTS,
                element: <PaymentDashboard />
            },
            {
                path: Routes.DASHBOARDS.PAYMENT_REPORTS,
                element: <PaymentReports />
            },
            {
                path: Routes.DASHBOARDS.PAYMENT_SETTINGS,
                element: <PaymentSettings />
            },
            {
                path: Routes.DASHBOARDS.PAYMENT_DETAILS,
                element: <PaymentDetails />
            },
            {
                path: Routes.PAGES.VIOLATIONS,
                element: <ViolationsPage />
            },
            {
                path: Routes.PAGES.VIOLATION_DETAILS,
                element: <ViewViolationPage />
            },
            {
                path: Routes.PAGES.MONITORING.ERROR_HANDLING,
                element: <ErrorsAndWarningsPage />
            },
            {
                path: Routes.PAGES.MONITORING.ANALYTICS,
                element: <AnalyticsMonitoringPage />
            },
            {
                path: Routes.PAGES.MONITORING.AUDIT_LOGS,
                element: <AuditLogsPage />
            },
            {
                path: Routes.PAGES.MONITORING.VERSION_CONTROL,
                element: <VersionControl />
            },
            {
                path: Routes.PAGES.MAILBOX,
                element: <MailboxPage />
            },
            {
                path: Routes.PAGES.CHATS,
                element: <ChatPage />
            },
            {
                path: Routes.PAGES.POLICY,
                element: <Policy />
            },
            {
                path: Routes.PAGES.TERMS,
                element: <TermsAndConditions />
            },
            {
                path: Routes.PAGES.SETTINGS,
                element: <Settings />
            },
            {
                path: Routes.PAGES.APARTMENTS_REQUESTS,
                element: <ApartmentRequestsPage />
            },
            {
                path: Routes.PAGES.PLACES_REQUESTS,
                element: <PlaceRequestsPage />
            },
            {
                path: Routes.PAGES.PUBLIC_CARS,
                element: <PublicCarsPage />
            },
            {
                path: Routes.PAGES.RESIDENTIAL_NOTIFICATIONS,
                element: <ResidentialNotifications />
            },
            {
                path: Routes.PAGES.APARTMENT_NOTIFICATIONS,
                element: <ApartmentNotifications />
            },
            {
                path: Routes.PAGES.PUBLIC_PLACE_NOTIFICATIONS,
                element: <PublicPlaceNotifications />
            },
            {
                path: Routes.PAGES.APARTMENTS,
                element: <Apartments />
            },
            {
                path: Routes.PAGES.RESIDENTIAL_CARS,
                element: <ResidentialCarsPage />
            },
            {
                path: Routes.PAGES.EMPLOYEES,
                element: <UsersPage />
            },
            {
                path: Routes.PAGES.EMPLOYEE_PROFILE,
                element: <EmployeeProfileComponent />
            },
            {
                path: Routes.PAGES.PARTNERS,
                element: <PartnersPage />
            },
            {
                path: Routes.PAGES.RULES,
                element: <RulesPage />
            },
            {
                path: Routes.PAGES.CAR_LOGS,
                element: <CarLogs />
            },
            {
                path: Routes.PAGES.CAR_LOG_REPORTS,
                element: <CarLogReports />
            },
            {
                path: Routes.PAGES.PLACES,
                element: <PlacePage />
            },
            {
                path: Routes.PAGES.PUBLIC_PLACES_DASHBOARDS,
                element: <PublicPlaceDashboards />
            },
            {
                path: Routes.PAGES.REPORT_DASHBOARD,
                element: <ReportsDashboard />
            },
            {
                path: Routes.PAGES.WORKSPACE,
                element: <Workspace />
            },
            {
                path: Routes.PAGES.USERS_LOGS,
                element: <UsersLogs />
            },
            {
                path: Routes.PAGES.USER_LOGINS,
                element: <UserLogins />
            },
            {
                path: Routes.PAGES.DELETED_USERS,
                element: <DeletedUsers />
            },

            {
                path: Routes.PAGES.NOTIFICATIONS.INDEX,
                children: [
                    {
                        path: Routes.PAGES.NOTIFICATIONS.INDEX,
                        element: <Notifications />
                    },
                    {
                        path: Routes.PAGES.NOTIFICATIONS.MANAGEMENT,
                        element: <NotificationManagement />
                    },
                    {
                        path: Routes.PAGES.NOTIFICATIONS.ANALYTICS,
                        element: <NotificationsStatisticsAndAnalysis />
                    },
                ]
            }
        ]
    },
]);

export default router