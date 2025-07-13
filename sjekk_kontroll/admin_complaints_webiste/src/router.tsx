import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Complaints } from './pages/Complaints';
import SingleComplaintPage from './pages/ComplaintRead';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import RequireAuth from './components/RequiredAuth';

const AppRouter: React.FC = () => {
  return (
    <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Complaints />
            </RequireAuth>
          }/>
          <Route path="complaints/:id" element={
            <RequireAuth>
              <SingleComplaintPage />
            </RequireAuth>
          }/>


          <Route path="login" element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
