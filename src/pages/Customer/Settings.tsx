import React, { useState } from "react";

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
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-200">{label}</label>
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg bg-neutral-800 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-200"
          required
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(name)}
          className="absolute transition-colors -translate-y-1/2 right-3 top-1/2 text-neutral-400 hover:text-neutral-200"
        >
          {isVisible ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-r sm:px-6 lg:px-8">
      {notification && (
        <div className="fixed flex items-center px-4 py-2 text-white bg-green-600 rounded-lg shadow-lg top-4 right-4">
          <span className="mr-2">💾</span>
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-3xl mx-auto border shadow-xl bg-neutral-900/90 border-neutral-800 rounded-xl">
        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-neutral-200">
                  <span className="text-purple-500">👤</span>
                  <span>User ID</span>
                </label>
                <input
                  type="text"
                  value={formData.userId}
                  className="w-full px-4 py-2 mt-1 border rounded-lg cursor-not-allowed bg-neutral-800 text-neutral-400 border-neutral-700"
                  disabled
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-neutral-200">
                  <span className="text-purple-500">👤</span>
                  <span>Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg bg-neutral-800 text-neutral-200 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-neutral-200">
                  <span className="text-purple-500">📧</span>
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg bg-neutral-800 text-neutral-200 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-neutral-200">
                  <span className="text-purple-500">📱</span>
                  <span>Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg bg-neutral-800 text-neutral-200 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-neutral-200">
                  <span className="text-purple-500">🏠</span>
                  <span>Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg bg-neutral-800 text-neutral-200 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={() => setIsPasswordDialogOpen(true)}
                className="flex items-center px-4 py-2 text-sm font-medium text-purple-400 transition-colors rounded-lg bg-purple-900/30 hover:bg-purple-900/50"
              >
                <span className="mr-2">🔒</span>
                Change Password
              </button>

              <button
                type="submit"
                className="flex items-center px-6 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                <span className="mr-2">💾</span>
                Save Changes
              </button>
            </div>
          </form>

          {isPasswordDialogOpen && (
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50">
              <div className="w-full max-w-md border shadow-xl bg-neutral-900 border-neutral-800 rounded-xl">
                <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                  <h2 className="text-xl font-bold text-white">
                    Change Password
                  </h2>
                  <button
                    onClick={() => setIsPasswordDialogOpen(false)}
                    className="transition-colors text-neutral-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6">
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
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
                    <button
                      type="submit"
                      className="w-full px-6 py-2 mt-6 text-sm font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
