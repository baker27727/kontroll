import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TicketInfo from './pages/TicketInfo';
import ClientComplaintForm from './pages/ClientComplaint';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import TicketPaymentWrapper from './pages/TicketPaymentWrapper';

const AppRouter: React.FC = () => {

  return (

    <Routes>

          <Route path="/" element={<ClientDashboard />} />
          <Route path="/ticket-info" element={<TicketInfo />} />
          <Route path="/payment" element={
            <TicketPaymentWrapper />
          } />
          <Route path="/complaint" element={<ClientComplaintForm />} />


          <Route path="/login" element={<LoginPage />} />

          <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
