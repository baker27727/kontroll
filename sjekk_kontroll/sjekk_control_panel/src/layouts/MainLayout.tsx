import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import { ScrollToTop } from '../UncategorizedProjectsFiles/ScrollToTop';
import { QuickActions } from '../UncategorizedProjectsFiles/QuickActions';
import { Bounce, ToastContainer } from 'react-toastify'

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scroll bg-gray-100">
          <div className=" mx-auto p-4 min-h-[calc(100vh-127px)]">
            <Outlet />
          </div>
          {/* <Footer /> */}

        </main>
        
        {/* <Footer /> */}
      </div>
      <Notification />
      {/* <SupportChat /> */}
      <QuickActions />
      <ScrollToTop />
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
    </div>
  );
};

export default MainLayout;