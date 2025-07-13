import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import PartnerDashboard from './pages/PartnerDashboard';
import PrivateRoute from './components/PrivateRoute';
import SettingsPage from './pages/Settings';
import MainLayout from './layouts/MainLayout';
import Places from './pages/PartnerControlledPlaces';
import Requests from './pages/PlaceRequests';
// import {io} from 'socket.io-client';


// import RequireAuth from './components/RequiredAuth';
// const socket = io('http://localhost:4000');

// socket.on('connection',(data) => {
//   console.log(data);
  
// })

// socket.connect()

const AppRouter: React.FC = () => {
  return (
    <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route element={<MainLayout />}>
          <Route path="/" element={
            <PrivateRoute>
              <PartnerDashboard />
            </PrivateRoute>
          }/>

          <Route path="/settings" element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }/>

          <Route path="/places" element={
            <PrivateRoute>
              <Places />
            </PrivateRoute>
          }/>

          <Route path="/requests" element={
            <PrivateRoute>
              <Requests />
            </PrivateRoute>
          }/>
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
