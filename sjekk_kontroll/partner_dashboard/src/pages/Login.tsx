import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon } from 'lucide-react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/hooks';
import { loginPartner } from '../redux/features/auth_reducer';
import { showNotification } from '../redux/features/notification_store';
import Notification from '../components/Notification';
const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accessUsername, setAccessUsername] = useState('');
  const [accessCode, setAccessCode] = useState('');
  
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [data] = useSearchParams();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(
      loginPartner({
        access_code: accessCode,
        access_username:accessUsername,
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(
          showNotification({
            type: 'success',
            message: 'Logget inn',
          })
        )
        navigate(data.get('dist') || '/'); // Fallback to home if dist is null
      })
      .catch((error) => {
        dispatch(
          showNotification({
            type: 'error',
            message: 'Feil brukernavn eller passord',
            description: error.message,
          })
        )
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with image and overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Login background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl">We're glad to see you again!</p>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="access_username" className="block text-sm font-medium text-gray-700">
                  Access Username
                </label>
                <div className="mt-1 relative rounded shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="access_username"
                    name="access_username"
                    type="text"
                    autoComplete="access_username"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Enter your username"
                    value={accessUsername}
                    onChange={(e) => setAccessUsername(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Access Password
                </label>
                <div className="mt-1 relative rounded shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Enter your password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition duration-150 ease-in-out"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>


      <Notification />
    </div>
  );
};

export default LoginPage;