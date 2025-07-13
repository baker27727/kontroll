import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import EditProfile from './pages/EditPlaceProfile';
import PlaceDashboard from './pages/PlaceDashboard';
import PrivateRoute from './components/PrivateRoute';
import { ClientParkingRegistration } from './pages/ClientParkingRegistration';
import MainLayout from './layouts/MainLayout';
import NotificationRequired from './wrappers/NotificationRequired';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={
            <NotificationRequired>
              <MainLayout />
            </NotificationRequired>
          }>
            <Route path="/" element={
                <PrivateRoute>
                  <PlaceDashboard />
                </PrivateRoute>
            }/>
            
            <Route path="/edit" element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
            }/>
          </Route>
          <Route path="/:id/sjekk" element={<ClientParkingRegistration />}/>
          <Route path="login" element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
    </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
