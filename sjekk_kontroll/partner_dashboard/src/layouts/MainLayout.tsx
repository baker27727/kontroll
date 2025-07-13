// MainLayout.js
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import Notification from '../components/Notification';

const {  Content } = Layout;

const MainLayout = () => {

  useEffect(() => {
    console.log('inside use effect');
    
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
        <Notification />
      </Layout>
  );
};

export default MainLayout;
