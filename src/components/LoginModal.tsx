import { useState, ChangeEvent, FormEvent } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'artist'>('buyer');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', { userType: activeTab, ...formData });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === 'buyer'
                ? 'border-b-2 border-[#094129] text-[#094129] font-medium'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('buyer')}
          >
            Buyer
          </button>
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === 'artist'
                ? 'border-b-2 border-[#094129] text-[#094129] font-medium'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('artist')}
          >
            Artist
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#094129] text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Login as {activeTab === 'buyer' ? 'Buyer' : 'Artist'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Forgot password?{' '}
            <a href="#" className="text-[#094129] hover:underline">
              Reset here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;