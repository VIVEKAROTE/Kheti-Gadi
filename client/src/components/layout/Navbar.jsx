import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { Tractor, LogOut, User as UserIcon } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary">
            <Tractor size={32} strokeWidth={2.5} />
            <span className="font-bold text-2xl tracking-tight text-gray-900">KhetiGadi</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/equipment" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Browse Equipment
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/farmer'}
                  className="text-gray-600 hover:text-primary font-medium transition-colors flex items-center gap-1"
                >
                  <UserIcon size={18} />
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 font-medium transition-colors flex items-center gap-1"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">
                  Log in
                </Link>
                <Link to="/register">
                  <Button variant="primary">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
