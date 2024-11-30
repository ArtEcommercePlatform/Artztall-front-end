import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Home,
  Lock,
  Save,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

// Define types for our password-related state
type PasswordVisibilityState = {
  currentPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

type PasswordField = keyof PasswordVisibilityState;

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

  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibilityState>({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

  const [notification, setNotification] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
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
    setPasswordVisibility({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
    showNotification("Password updated successfully!");
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const PasswordInput = ({
    label,
    name,
    value,
    onChange,
    isVisible,
  }: {
    label: string;
    name: PasswordField;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isVisible: boolean;
  }) => (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors pr-10"
          required
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(name)}
          className="absolute text-gray-500 -translate-y-1/2 right-2 top-1/2 hover:text-gray-700"
        >
          {isVisible ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-green-50 to-blue-100">
      {notification && (
        <div className="fixed flex items-center p-3 text-white bg-green-600 rounded-lg shadow-lg top-4 right-4">
          <Save className="mr-2" />
          {notification}
        </div>
      )}

      <div className="container flex-grow px-4 py-4 mx-auto overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-green-900">
              Profile Settings
            </h1>
            <p className="text-sm text-gray-600">
              Manage your account information
            </p>
          </div>
        </div>

        <div className="max-w-2xl p-4 mx-auto transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* User ID Field */}
            <div>
              <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2 text-green-600" />
                User ID
              </label>
              <input
                type="text"
                value={formData.userId}
                className="mt-2 w-full p-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none cursor-not-allowed"
                disabled
              />
            </div>

            <div className="mt-3">
              <label className="flex items-center mt-3 mb-1 text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2 text-green-600" />
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

            <div className="mt-3">
              <label className="flex items-center mt-3 mb-1 text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-green-600" />
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
              <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-green-600" />
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
              <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
                <Home className="w-4 h-4 mr-2 text-green-600" />
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
            <div className="pt-2 space-y-2">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-4 bg-white shadow-xl rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-green-900">
                Change Password
              </h2>
              <button
                onClick={() => setIsPasswordDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <PasswordInput
                label="Current Password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                isVisible={passwordVisibility.currentPassword}
              />
              <PasswordInput
                label="New Password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                isVisible={passwordVisibility.newPassword}
              />
              <PasswordInput
                label="Confirm New Password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                isVisible={passwordVisibility.confirmPassword}
              />

              <div className="flex justify-end mt-4 space-x-2">
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
