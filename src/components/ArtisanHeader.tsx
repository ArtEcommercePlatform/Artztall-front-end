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

const ArtisanHeader: React.FC<HeaderProps> = ({ userName, userAvatar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/artisan/dashboard' },
    { icon: Package, label: 'Products', href: '/artisan/products' },
    { icon: ImageIcon, label: 'Gallery', href: '/artisan/gallery' },
    { icon: Gavel, label: 'Auctions', href: '/artisan/auctions' },
    { icon: Settings, label: 'Settings', href: '/settings' }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white border-r border-gray-200`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#094129]">Artisan</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
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
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
            >
              <Menu size={24} />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-2">
                    <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                    <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                    <hr className="my-1" />
                    <Button
                      variant="text"
                      size="sm"
                      className="w-full justify-start px-4"
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
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {/* Content will be injected here */}
        </main>
      </div>
    </div>
  );
};

export default ArtisanHeader;