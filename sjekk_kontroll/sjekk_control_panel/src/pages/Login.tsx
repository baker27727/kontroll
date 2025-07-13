import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/hooks';
import Routes from '../constants/routes';
import { showNotification } from '../redux/features/notification_store';
import Notification from '../components/Notification';
import { loginManager } from '../redux/features/AuthSlice';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(loginManager ({
      username,
      password
    }))
    .unwrap()
    .then(() => {
      dispatch(showNotification({
        message: 'Login Success',
        description: 'You have successfully logged in',
        type: 'info',
      }))

      setTimeout(() => {
        navigate(Routes.HOME)
      }, 2000)
    }).catch((error) => {
      dispatch(showNotification({
        message: 'Login Failure',
        description: error.message,
        type: 'error',
      }))
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200  select-none">
      <div className="flex w-full max-w-5xl shadow-sm overflow-hidden h-[600px] rounded-lg">
                {/* Art Section */}
                <div className="hidden md:block md:w-2/5 bg-blue-600 relative">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Art"
            className="w-full h-full object-cover"
          />
          
        </div>

        {/* Login Form */}
        <div className="w-full md:w-3/5 bg-white p-8 ">
          <div className="text-center mb-8">
            <img src="/src/assets/logo.png" alt="Parksync Logo" className="w-full mx-auto" />
            <h2 className="mt-4 text-3xl text-gray-700">Parksync Admin Dashboard</h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="access_username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="username"
                  id="access_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="access_code" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  id="access_code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full font-bold uppercase text-md bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600 transition duration-300 ease-in-out shadow-sm"
            >
              Login
            </button>
          </form>
        </div>

      </div>

      <Notification />
    </div>
  );
};

export default LoginPage;

