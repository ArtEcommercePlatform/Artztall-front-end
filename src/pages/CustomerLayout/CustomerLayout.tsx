import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Gavel,
  Settings,
  X,
  Menu,
  Bell,
  ShoppingCart,
  LogOut,
  LucideProps,
} from "lucide-react";
import { LayoutProps, UserData, NavigationItem } from "../../types/types";
import user from '../../assets/icons/user.png';

// Wrapper function for lucide-react icons
const WrappedIcon = (Icon: React.ComponentType<LucideProps>) => {
  return (props: { size?: number; className?: string }) => (
    <Icon {...props} size={props.size?.toString()} />
  );
};

export const CustomerLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userData: UserData = {
    userName: "John Doe",
    userAvatar: "/api/placeholder/32/32",
  };

  const navigationItems: NavigationItem[] = [
    { icon: WrappedIcon(LayoutDashboard), label: "Dashboard", href: "/customer/dashboard" },
    { icon: WrappedIcon(Package), label: "Pending Orders", href: "/customer/products" },
    { icon: WrappedIcon(ImageIcon), label: "Gallery", href: "/customer/gallery" },
    { icon: WrappedIcon(Gavel), label: "Auctions", href: "/customer/auctions" },
    { icon: WrappedIcon(Settings), label: "Settings", href: "/cutomer/settings" },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } bg-white border-r border-gray-200`}
      >
        <div className="flex items-center justify-between py-5 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#094129]">ArtZtall</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500 lg:hidden hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#094129]/10 rounded-lg transition-colors duration-150"
              >
                <item.icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 lg:hidden hover:text-gray-700"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center flex-1 px-4 space-x-4">
              <div className="flex-1 max-w-2xl">
                <input
                  type="search"
                  placeholder="Search for paintings..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#094129]/20"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <ShoppingCart size={20} />
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#094129] rounded-full text-xs text-white flex items-center justify-center">
                  2
                </span>
              </button>
              
              {/* User Profile Section */}
              <div className="flex items-center space-x-3">
                <img
                  src={user}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">{userData.userName}</p>
                  <p className="text-xs text-gray-500">Customer</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;