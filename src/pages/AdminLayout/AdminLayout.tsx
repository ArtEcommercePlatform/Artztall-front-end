import React, { useState } from "react";
import {
  Activity,
  Brush,
  Hammer,
  Users,
  CreditCard,
  X,
  Menu,
  Bell,
  ShoppingCart,
  LogOut,
  LucideProps,
  LayoutDashboard,
} from "lucide-react";
import { LayoutProps, UserData, NavigationItem } from "../../types/types";


const WrappedIcon = (Icon: React.ComponentType<LucideProps>) => {
  return (props: { size?: number; className?: string }) => (
    <Icon {...props} size={props.size?.toString()} />
  );
};

export const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userData: UserData = {
    userName: localStorage.getItem("userName") ?? "",
    userAvatar: localStorage.getItem("profImg") ?? "",
  };

  const navigationItems: NavigationItem[] = [
    {
      icon: WrappedIcon(LayoutDashboard),
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: WrappedIcon(Brush),
      label: "Artwork Management",
      href: "/admin/artwork",
    },
    {
      icon: WrappedIcon(Hammer),
      label: "Auction Management",
      href: "/admin/auction",
    },
    {
      icon: WrappedIcon(Users),
      label: "Users Management",
      href: "/admin/user",
    },
    {
      icon: WrappedIcon(CreditCard),
      label: "Order And Transaction",
      href: "/admin/order",
    },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen bg-gray-50">
    
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } bg-white border-r border-gray-200`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#094129]">ArtZtall</h1>
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

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 lg:hidden hover:text-gray-700"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center ml-auto space-x-4">
            
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell size={20} />
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                  3
                </span>
              </button>

            
              <div className="flex items-center space-x-3">
                <img
                  src={userData.userAvatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">
                    {userData.userName}
                  </p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 space-x-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

  
        <main className="flex-1 overflow-auto">
          <div className="container px-6 py-8 mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
