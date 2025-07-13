import React from 'react';
import { FaMoneyBillWave, FaFileAlt, FaCalculator, FaChartLine, FaFileInvoice, FaCogs, FaSignOutAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Routes from '../../constants/routes';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { manager } = useAppSelector(state => state.auth_store);
  const [t] = useTranslation();

  const handleLogout = () => {
    navigate(Routes.LOGIN);
  };

  const navigationItems = [
    { icon: FaMoneyBillWave, title: 'sanctions', route: '/sanctions' },
    { icon: FaFileAlt, title: 'attachments', route: '/attachments' },
    { icon: FaCalculator, title: 'accounting', route: '/accounting' },
    { icon: FaChartLine, title: 'statistics', route: '/statistics' },
    { icon: FaFileInvoice, title: 'reports', route: '/reports' },
    { icon: FaCogs, title: 'other_features', route: '/features' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('home_block.financial_dashboard')}</h1>
              <p className="text-sm text-gray-600">{t('home_block.welcome_message')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <img src={'/assets/admin.png'} alt="Manager" className="w-12 h-12 rounded-full object-cover border border-gray-300" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{manager?.name}</h2>
                <a href={`mailto:${manager?.linked_email}`} className="text-sm text-blue-600 hover:underline">{manager?.linked_email}</a>
                <p className="text-xs text-gray-600">{manager?.role}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-2 sm:mb-0">
              <FaUser className="inline mr-2" />
              {t('home_block.login_time')}: {manager?.last_login_time}
            </p>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition duration-300"
            >
              <FaSignOutAlt className="mr-2" />
              {t('home_block.logout_button')}
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl gap-4">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden transition duration-300"
            >
              <div className="p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  <item.icon className="text-gray-600 w-4 h-4" />
                </div>
                <div className='flex-1'>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {t(`home_block.navigation_boxes.${item.title}`)}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 overflow-hidden break-all">
                    {t(`home_block.navigation_boxes.manage_${item.title}_message`)}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <a
                  href={item.route}
                  className="inline-flex items-center justify-between w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-opacity-80 hover:text-white transition duration-300"
                >
                  <span>{t(`home_block.navigation_boxes.view_${item.title}_button`)}</span>
                  <FaArrowRight />
                </a>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Home;

