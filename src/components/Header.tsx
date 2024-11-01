import { Search,Menu, User } from 'lucide-react';
import logo from '../assets/images/logo.png'

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Menu */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu className="h-6 w-6 text-[#094129] hover:opacity-80" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-40 h-20 bg-[#ffffff]  flex items-center justify-center">
                <img 
                  src={logo}
                  alt="Arts Shop Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {['Home', 'Shop', 'Artists', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#094129] hover:opacity-80 transition-opacity"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Section - Search, Auth & Icons */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="h-5 w-10 text-gray-400" />
              <input
                type="text"
                placeholder="Search art..."
                className="bg-transparent border-none focus:outline-none ml-2 w-40"
              />
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="text-[#094129] hover:opacity-80 transition-opacity mr-5 ml-5">
                Login
              </button>
              <button className="bg-[#094129] text-white px-4 py-2 rounded-full hover:opacity-80 transition-opacity">
                Sign up
              </button>
            </div>

            {/* Mobile User Icon */}
            <button className="md:hidden">
              <User className="h-6 w-6 text-[#094129] hover:opacity-80" />
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;