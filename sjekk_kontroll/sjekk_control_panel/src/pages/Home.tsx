import React, { useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js'
import { 
  Building2, 
  Car, 
  CreditCard, 
  LineChart, 
  ShieldAlert, 
  Users 
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getStatistics } from '../redux/features/StatisticsSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStatistics())
      .then(unwrapResult)
      .catch(() => {
        // Handle error if needed
      });
  }, [dispatch]);

  const {
    usersCount,
    violationsCount,
    partnersCount,
    carsCount
  } = useAppSelector(state => state.StatisticsReducer);

  const {manager} = useAppSelector(state => state.auth_store)

  return (
    <>
      <main className="flex-1 overflow-y-auto">
      <div className="p-4 text-3xl font-semibold">Welcome, <span className="text-blue-600">{manager?.username ?? 'Unknown'}</span></div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-2 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-blue-600 rounded-md">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">{t('home_block.totalPartners')}</p>
                <p className="text-2xl font-semibold text-gray-900">{partnersCount}</p>
              </div>
            </div>
          </div>
          <div className="p-2 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-green-600 rounded-md">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">{t('home_block.registeredCars')}</p>
                <p className="text-2xl font-semibold text-gray-900">{carsCount}</p>
              </div>
            </div>
          </div>
          <div className="p-2 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-yellow-600 rounded-md">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">{t('home_block.totalUsers')}</p>
                <p className="text-2xl font-semibold text-gray-900">{usersCount}</p>
              </div>
            </div>
          </div>
          <div className="p-2 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-red-600 rounded-md">
                <ShieldAlert className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">{t('home_block.violationsThisMonth')}</p>
                <p className="text-2xl font-semibold text-gray-900">{violationsCount}</p>
              </div>
            </div>
          </div>
        </div>


        <div className='my-4 grid grid-cols-4 gap-4'>
          <div className='bg-white w-full h-28 rounded-lg shadow p-2 flex'>
            <div className="bg-green-600 h-full p-2 rounded flex items-center">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Payments Dashboard</h2>
              <p className="text-sm text-gray-500">View payments and transactions</p>

              <div className="mt-4 text-end">
                <a
                  href="/dashboard/payments"
                  className="border border-transparent text-sm font-medium rounded-md text-blue-500 hover:underline"
                >
                  View Payments
                </a>
              </div>
            </div>
          </div>

          <div className='bg-white w-full h-28 rounded-lg shadow p-2 flex'>
            <div className="bg-green-600 h-full p-2 rounded flex items-center">
              <LineChart className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Payments Reports</h2>
              <p className="text-sm text-gray-500">View payment reports</p>

              <div className="mt-4 text-end">
                <a
                  href="/dashboard/payments/reports"
                  className="border border-transparent text-sm font-medium rounded-md text-blue-500 hover:underline"
                >
                  View reports
                </a>
              </div>
            </div>
          </div>
        </div>

        

{/* <div id="toast-notification" className="w-full max-w-xs p-2 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300" role="alert">
    <div className="flex items-center mb-3">
        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">New notification</span>
        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-notification" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>
    <div className="flex items-center">
        <div className="relative inline-block shrink-0">
            <img className="w-12 h-12 rounded-full" src="/public/assets/block.jpg" alt="Jese Leos image"/>
            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                    <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
                    <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
                    </svg>
                <span className="sr-only">Message icon</span>
            </span>
        </div>
        <div className="ms-3 text-sm font-normal">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</div>
            <div className="text-sm font-normal">commented on your photo</div> 
            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">a few seconds ago</span>   
        </div>
    </div>
</div> */}
      </main>
    </>
  );
};

export default HomePage;