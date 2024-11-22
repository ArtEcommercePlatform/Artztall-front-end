import { useState } from "react";
import { Search, Menu, User } from "lucide-react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
// import NewArtAdd from '../pages/homepage/NewArtAdd';
import logo from "../assets/images/logo.png";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  const navigationLinks: string[] = ["Home", "Shop", "Artists", "newartadd"];

  const handleLoginClick = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="px-4 py-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Menu */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu className="h-6 w-6 text-[#094129] hover:opacity-80" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-40 h-20 bg-[#ffffff] flex items-center justify-center">
                <img
                  src={logo}
                  alt="Arts Shop Logo"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="items-center hidden gap-8 lg:flex">
            {navigationLinks.map((item) => (
              <a
                key={item}
                href={`${item.toLowerCase()}`}
                className="text-[#094129] hover:opacity-80 transition-opacity"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Section - Search, Auth & Icons */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="items-center hidden px-4 py-2 bg-gray-100 rounded-full sm:flex">
              <Search className="w-10 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search art..."
                className="w-40 ml-2 bg-transparent border-none focus:outline-none"
              />
            </div>
            <button></button>
            {/* Auth Buttons */}
            <div className="items-center hidden gap-3 md:flex">
              <button
                onClick={handleLoginClick}
                className="text-[#094129] hover:opacity-80 transition-opacity mr-5 ml-5"
              >
                Login
              </button>
              <button
                onClick={handleSignupClick}
                className="bg-[#094129] text-white px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
              >
                Sign up
              </button>
            </div>

            {/* Mobile User Icon */}
            <div className="flex items-center gap-2 md:hidden">
              <button onClick={handleLoginClick} className="hover:opacity-80">
                <User className="h-6 w-6 text-[#094129]" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </header>
  );
};

export default Header;
