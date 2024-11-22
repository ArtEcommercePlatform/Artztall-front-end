// Layout.tsx
import React from 'react';
import ArtisanHeader from '../../components/ArtisanHeader';

interface LayoutProps {
  children: React.ReactNode;
}

const ArtisanLayout: React.FC<LayoutProps> = ({ children }) => {
  // You can fetch user data here or pass it from a higher level component
  const userData = {
    userName: "John Doe",
    userAvatar: "/api/placeholder/32/32" // Replace with actual user avatar
  };

<<<<<<< HEAD
=======
  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/artisan/dashboard" },
    { icon: Package, label: "Products", href: "/artisan/products" },
    { icon: ImageIcon, label: "Gallery", href: "/artisan/gallery" },
    { icon: Gavel, label: "Auctions", href: "/artisan/auctions" },
    { icon: Settings, label: "Settings", href: "/artisan/settings" },
  ];

>>>>>>> a56be089286d34311ef0f1115fa2c55fd3fa19b5
  return (
    <div className="min-h-screen">
      <ArtisanHeader {...userData} />
      <div className="lg:pl-64">
        {children}
      </div>
    </div>
  );
};

export default ArtisanLayout;