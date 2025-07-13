// Navbar.tsx
import { Link, useNavigate } from "react-router-dom"; // If using React Router for navigation
import { Typography, Layout, Menu } from "antd";
import { HomeFilled } from '@ant-design/icons';
import { removeAuthentication } from "../utils/authentication";
import { useTranslation } from "react-i18next";

const { Header } = Layout;
const {Text} = Typography

const Navbar = () => {
  const navigate = useNavigate()
  const [t] = useTranslation()

  const handleLogout = () => {
    removeAuthentication()
    navigate('/login', {
      replace: true
    })
  }

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
        <Menu.Item key="1" icon={<HomeFilled />}>
          <Link to="/">{t('home')}</Link>
        </Menu.Item>
        </div>
        <Menu.Item key="4">
          <Text onClick={handleLogout} style={{
            color: '#ff5e64'
          }}>{t('logout')}</Text>
        </Menu.Item>
      </Menu>

    </Header>

    
  );
};

export default Navbar;
