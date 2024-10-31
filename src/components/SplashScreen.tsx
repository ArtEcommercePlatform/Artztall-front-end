import React from 'react';
import { Loader2 } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Pottery Haven</h1>
        <p className="text-xl text-gray-300 mb-8">Handcrafted Beauty for Your Home</p>
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto" />
      </div>
    </div>
  );
};

export default SplashScreen;