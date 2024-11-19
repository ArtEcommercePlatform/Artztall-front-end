// Header.tsx
import React, { useState } from 'react';
import { 
  Menu,
  X,
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Gavel,
  Settings,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';
import Button from '../assets/components/button/Button';

interface HeaderProps {
  userName: string;
  userAvatar?: string;
}

const CustomerHeader: React.FC<HeaderProps> = ({ userName, userAvatar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/customer/dashboard' },
    { icon: Package, label: 'Products', href: '/customer/products' },
    { icon: ImageIcon, label: 'Gallery', href: '/customer/gallery' },
    { icon: Gavel, label: 'Auctions', href: '/customer/auctions' },
    { icon: Settings, label: 'Settings', href: '/settings' }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white border-r border-gray-200`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#094129]">Customer</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500 lg:hidden hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="px-4 mt-6 space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#094129]/10 rounded-lg"
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4 text-gray-500 lg:hidden hover:text-gray-700"
            >
              <Menu size={24} />
            </button>
            <div className="relative">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094129]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell size={20} />
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                3
              </span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2"
              >
                <img
                  src={userAvatar || '/api/placeholder/32/32'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block">{userName}</span>
                <ChevronDown size={16} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="py-2">
                    <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                    <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                    <hr className="my-1" />
                    <Button
                      variant="text"
                      size="sm"
                      className="justify-start w-full px-4"
                      onClick={() => console.log('Logout clicked')}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          {/* Content will be injected here */}
        </main>
      </div>
    </div>
  );
};

export default CustomerHeader;