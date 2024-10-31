import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">Pottery Haven is your one-stop shop for beautiful, handcrafted pottery. We offer a wide range of ceramic products for your home and garden.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Shop</a></li>
              <li><a href="#" className="hover:text-gray-300">About</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-2">Subscribe to our newsletter for updates and special offers.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="flex-grow px-3 py-2 text-gray-700 rounded-l-md focus:outline-none" />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 Pottery Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;