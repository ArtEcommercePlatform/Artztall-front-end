import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Menu className="h-6 w-6 mr-2 cursor-pointer" />
          <h1 className="text-xl font-semibold">Pottery Haven</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Shop</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
          </ul>
        </nav>
        <div className="flex items-center">
          <ShoppingCart className="h-6 w-6 cursor-pointer" />
          <span className="ml-2 text-sm font-medium">0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;