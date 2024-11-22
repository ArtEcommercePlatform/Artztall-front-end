import React, { useState } from "react";
import ArticianHeader from "../../components/ArtisanHeader";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Gavel,
  Settings,
  X,
} from "lucide-react";
import logo from "../../assets/images/logo.png";

interface LayoutProps {
  children: React.ReactNode;
}

const ArticianLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const userData = {
    userName: "John Doe",
    userAvatar: "/api/placeholder/32/2",
    onToggleSidebar: toggleSidebar,
  };

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/artisan/dashboard" },
    { icon: Package, label: "Products", href: "/artisan/products" },
    { icon: ImageIcon, label: "Gallery", href: "/artisan/gallery" },
    { icon: Gavel, label: "Auctions", href: "/artisan/auctions" },
    { icon: Settings, label: "Settings", href: "/artisan/settings" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 
          transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 
          bg-white border-r border-gray-200
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <img
            src={logo}
            alt="artztall"
            className="object-contain w-full h-full"
          ></img>

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
      <div className="flex flex-col flex-1 overflow-hidden">
        <ArticianHeader {...userData} />
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ArticianLayout;
