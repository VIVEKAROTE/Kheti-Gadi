import React from 'react';
import { Tractor, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-primary mb-4">
              <Tractor size={28} />
              <span className="font-bold text-xl text-white">KhetiGadi</span>
            </Link>
            <p className="text-sm text-gray-400">
              Empowering farmers with accessible and affordable agricultural machinery rentals.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/equipment" className="hover:text-primary transition-colors">Browse Equipment</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} KhetiGadi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
