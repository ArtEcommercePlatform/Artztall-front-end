import React, { useState } from "react";
import { UserCog, Lock, Edit } from "lucide-react";

const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [originalData, setOriginalData] = useState({ ...formData });
  const [hasChanges, setHasChanges] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [editMode, setEditMode] = useState({
    fullName: false,
    email: false,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setHasChanges(
      Object.keys(originalData).some(
        (key) =>
          formData[key as keyof typeof formData] !==
          originalData[key as keyof typeof originalData],
      ),
    );
    if (name === "newPassword" || name === "confirmPassword") {
      setPasswordError("");
    }
  };
  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    console.log("Saving changes:", formData);
    setOriginalData({ ...formData });
    setHasChanges(false);
    setEditMode({ fullName: false, email: false });
  };
  const handleCancel = () => {
    setFormData({ ...originalData });
    setHasChanges(false);
    setPasswordError("");
    setEditMode({ fullName: false, email: false });
  };
  const toggleEditMode = (field: "fullName" | "email") => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setHasChanges(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-blue-200 py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-4">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Account Settings
            </h1>
            <p className="text-white/80 text-xs mt-1">
              Personalize and secure your account
            </p>
          </div>
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl border border-emerald-100 shadow-md p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center text-emerald-800">
                <UserCog className="mr-2 w-5 h-5 text-emerald-600" />
                Profile Information
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="relative">
                  {editMode.fullName ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2">
                        {formData.fullName || "Full Name"}
                      </span>
                      <button
                        onClick={() => toggleEditMode("fullName")}
                        className="text-emerald-500 hover:text-emerald-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative">
                  {editMode.email ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full px-3 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2">
                        {formData.email || "Email Address"}
                      </span>
                      <button
                        onClick={() => toggleEditMode("email")}
                        className="text-emerald-500 hover:text-emerald-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-emerald-100 shadow-md p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center text-emerald-800">
                <Lock className="mr-2 w-5 h-5 text-blue-600" />
                Change Password
              </h2>
              <div className="space-y-3">
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Current Password"
                  className="w-full px-3 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-300"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Password"
                  className="w-full px-3 py-2 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-300"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm New Password"
                  className={`w-full px-3 py-2 border-2 rounded-xl focus:ring-2 transition duration-300
                    ${
                      passwordError
                        ? "border-red-500 focus:ring-red-200 text-red-600"
                        : "border-emerald-100 focus:border-emerald-500 focus:ring-emerald-200"
                    }`}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1 pl-2">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {hasChanges && (
          <div className="fixed bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl px-4 py-3 flex space-x-3">
              <button
                onClick={handleCancel}
                className="
                  px-4 
                  py-2 
                  bg-gray-200 
                  text-gray-800 
                  rounded-lg 
                  hover:bg-gray-300 
                  transition-colors
                  text-sm
                "
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="
                  px-4 
                  py-2 
                  bg-emerald-700 
                  text-white 
                  rounded-lg 
                  hover:bg-emerald-800 
                  transition-colors
                  text-sm
                  shadow-md
                "
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Settings;
