import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin" className="text-xl font-bold">Admin Panel</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a1.5 1.5 0 0 1 0 2.12l-5.12 5.12a2.25 2.25 0 0 1-1.59.66h-4.5a2.25 2.25 0 0 1-2.25-2.25v-4.5a.75.75 0 0 0-.75-.75h-2.25a.75.75 0 0 0-.53 1.28L3.84 11.47a.75.75 0 0 1 0-1.06l8.69-8.69Z" />
            </svg>
          </Link>
          {user ? (
            <>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-full hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"></path></svg>
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-4 7a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm5.325-9.141a1 1 0 01.765 1.564l-2.5 4A1 1 0 0111 9a1 1 0 01-1.325-.236l-2.5-4a1 1 0 01.765-1.564zM10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a5 5 0 1110 0 5 5 0 01-10 0z"></path></svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
