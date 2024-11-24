import React, { useState } from 'react';
import { User, Mail, Phone, Home, Lock, Save, X } from 'lucide-react';

const Settings = () => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: "USER123",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Art Street, Creative City, AC 12345",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notification, setNotification] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Profile updated successfully!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification("New passwords do not match!");
      return;
    }
    setIsPasswordDialogOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    showNotification("Password updated successfully!");
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-green-50 to-blue-100">
      {notification && (
        <div className="fixed flex items-center p-3 text-white bg-green-600 rounded-lg shadow-lg top-4 right-4">
          <Save className="mr-2" />
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4 py-4 flex-grow overflow-y-auto">
        {/* Header */}
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-900 tracking-tight">
              Profile Settings
            </h1>
            <p className="text-gray-600 text-sm">
              Manage your account information
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* User ID Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                <User className="mr-2 h-4 w-4 text-green-600" />
                User ID
              </label>
              <input
                type="text"
                value={formData.userId}
                className="w-full p-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none cursor-not-allowed"
                disabled
              />
            </div>

            {/* Name Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                <User className="mr-2 h-4 w-4 text-green-600" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                <Mail className="mr-2 h-4 w-4 text-green-600" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                <Phone className="mr-2 h-4 w-4 text-green-600" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors"
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                <Home className="mr-2 h-4 w-4 text-green-600" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors"
              />
            </div>

            {/* Button Group */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPasswordDialogOpen(true)}
                className="flex items-center justify-center w-full p-1.5 text-gray-700 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors duration-300"
              >
                <Lock className="mr-2 text-yellow-600" /> Change Password
              </button>

              <button
                type="submit"
                className="flex items-center justify-center w-full p-1.5 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
              >
                <Save className="mr-2" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Password Dialog */}
      {isPasswordDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-green-900">Change Password</h2>
              <button
                onClick={() => setIsPasswordDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordDialogOpen(false)}
                  className="px-3 py-1.5 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;