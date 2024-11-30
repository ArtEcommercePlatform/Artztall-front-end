import React, { useState } from "react";
import { Menu, X, Search, Bell, ChevronDown } from "lucide-react";

import userIcon from "../assets/icons/user.png";

interface HeaderProps {
  userName: string;
  userAvatar?: string;
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<HeaderProps> = ({ userName, onToggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
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

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell size={20} />
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
                <div className="p-4 lg:hidden">
                  <div className="flex items-center mb-4 space-x-3">
                    <img
                      src={"src/assets/icons/user.png"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{userName}</div>
                      <div className="text-sm text-gray-500">View Profile</div>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 lg:hidden"
                  >
                    Profile
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <hr className="my-1" />
                  <button
                    className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                    onClick={() => console.log("Logout clicked")}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
