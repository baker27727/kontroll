import { useState, useRef, useEffect } from 'react'
import { ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { logout } from '../redux/featuers/auth_store'
import NotificationIcon from './NotificationIcon'
import Routes from '../constants/routes'

export default function Header() {
  const residentialAreaName = "Sunset Meadows"
  const dropdownRef = useRef(null)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const { apartment } = useAppSelector(state => state.auth_store)

  const handleLogout = () => {
    dispatch(logout())
    navigate(Routes.LOGIN)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navItems = [
    { name: 'Cars', path: '/cars' },
    { name: 'Profile', path: '/profile' },
    { name: 'Share', path: '/share-earn' },
    { name: 'Earnings', path: '/earnings' },
    { name: 'Locations', path: '/locations' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Apartment Control</h1>
            </a>
            <p className="text-sm lg:text-md text-gray-500 ml-2 hidden sm:block">{residentialAreaName}</p>
          </div>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm lg:text-lg font-medium ${
                  location.pathname === item.path
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none transition duration-150 ease-in-out"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                  {apartment?.owner_name.charAt(0)}
                </div>
                <span className="hidden lg:inline">{apartment?.owner_name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md border py-1 z-10">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left transition duration-150 ease-in-out"
                  >
                    <LogOut className="inline-block w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
            <NotificationIcon />
            <button
              className="ml-4 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-500" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-700 hover:bg-gray-50"
            >
              <LogOut className="inline-block w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}