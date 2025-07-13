import { Drawer } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {StarFilled,DashboardFilled,SettingFilled, NotificationFilled} from '@ant-design/icons'
import './CustomDrawer.css'
import { useTranslation } from 'react-i18next';

interface CustomDrawerProps{
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
}

export const CustomDrawer:React.FC<CustomDrawerProps> = ({ showMenu,setShowMenu }) => {
  const [t] = useTranslation()
  return (
    <Drawer style={{direction:"rtl"}} open={showMenu} title={"System Menu"} onClose={()=>{setShowMenu(false);}} placement='left'>
        <Link to="/dashboard">
        <div className="listStyle">
          <DashboardFilled className='notIcon' />
          <p>{t('dashboard')}</p>
        </div>
        </Link>


        <Link to="/complaints">
        <div className="listStyle">
          <StarFilled className='notIcon' />
          <p>{t('complaints')}</p>
        </div>
        </Link>

        
        <Link to="/settings">
        <div className="listStyle">
          <SettingFilled className='notIcon' />
          <p>{t('settings')}</p>
        </div>
        </Link>

        <Link to="/notifications">
        <div className="listStyle">
          <NotificationFilled className='notIcon' />
          <p>{t('notifications')}</p>
        </div>
        </Link>
    </Drawer>
  )
}
