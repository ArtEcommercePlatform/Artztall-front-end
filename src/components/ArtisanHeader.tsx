import React, { useState } from "react";
import { Menu, X, Search, ChevronDown, LogOut } from "lucide-react";
import { NotificationDropdown } from "../components/NotificationDropdown";

import userIcon from "../assets/icons/user.png";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userName: string;
  userAvatar?: string;
  onToggleSidebar: () => void;
}

const ArticianHeader: React.FC<HeaderProps> = ({
  userName,
  onToggleSidebar,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
      {/* Mobile Hamburger and Logo */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 lg:hidden hover:text-gray-700"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Search Toggle */}
        <button
          onClick={toggleSearch}
          className="text-gray-500 lg:hidden hover:text-gray-700"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Desktop Search */}
      <div className="hidden w-full max-w-md lg:block">
        <div className="relative">
          <Search
            className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
            size={20}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094129]"
          />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center p-4 border-b">
            <div className="relative flex-1">
              <Search
                className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094129]"
              />
            </div>
            <button
              onClick={toggleSearch}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative text-gray-500 hover:text-gray-700">
          <NotificationDropdown />
          <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center space-x-2"
          >
            <img
              src={userIcon}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden md:block">{userName}</span>
            <ChevronDown size={16} />
          </button>

          {isProfileOpen && (
            <div className="fixed inset-0 z-50 lg:absolute lg:inset-auto lg:right-0 lg:top-full">
              {/* Mobile Full Screen Dropdown */}
              <div
                className="fixed inset-0 bg-black/50 lg:hidden"
                onClick={toggleProfileDropdown}
              ></div>

              <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-80 lg:static lg:transform-none lg:w-48 lg:mt-2 lg:border lg:border-gray-200">
                <div className="py-2">
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 lg:hidden"
                  >
                    Profile
                  </a>
                  <hr className="my-1" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2 space-x-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
        >
          <LogOut size={16} />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default ArticianHeader;
