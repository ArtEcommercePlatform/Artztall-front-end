// Layout.tsx
import React from 'react';
import CustomerHeader from '../../components/CustomerHeader';

interface LayoutProps {
  children: React.ReactNode;
}

const CustomerLayout: React.FC<LayoutProps> = ({ children }) => {
  // You can fetch user data here or pass it from a higher level component
  const userData = {
    userName: "John Doe",
    userAvatar: "/api/placeholder/32/32" // Replace with actual user avatar
  };

  return (
    <div className="min-h-screen">
      <CustomerHeader {...userData} />
      <div className="lg:pl-64">
        {children}
      </div>
    </div>
  );
};

export default CustomerLayout;