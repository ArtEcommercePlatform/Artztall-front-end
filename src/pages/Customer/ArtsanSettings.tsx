import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Home,
  Save,
} from "lucide-react";
import { apiClient } from '../../services/apiClient'

type UserProfile = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  addresses?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
};

const ArtsanSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<UserProfile>({
    id: "",
    email: "",
    name: "",
    phoneNumber: "",
  });

  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found");
        }

        const response = await apiClient.get<UserProfile>(`/users/artisans/${userId}`);
        
        if (response.success) {
          setFormData(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch user profile");
        showNotification(err.message || "Failed to fetch user profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found");
      }

      // Prepare update payload
      const updatePayload = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        addresses: formData.addresses ? {
          street: formData.addresses.street,
          city: formData.addresses.city,
          state: formData.addresses.state,
          country: formData.addresses.country,
          postalCode: formData.addresses.postalCode,
        } : undefined,
      };

      const response = await apiClient.put<UserProfile>(`/users/artisans/${userId}`, updatePayload);
      
      if (response.success) {
        showNotification("Profile updated successfully!");
        // Optionally update local state with response data
        setFormData(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      showNotification(err.message || "Failed to update profile");
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-blue-100">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-green-50 to-blue-100">
      {notification && (
        <div className={`fixed flex items-center p-3 rounded-lg shadow-lg top-4 right-4 
          ${error ? 'bg-red-600' : 'bg-green-600'} text-white`}>
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
        

            {/* Email Field */}
            <div>
              <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-green-600" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                className="mt-2 w-full p-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none cursor-not-allowed"
                disabled
              />
            </div>

            {/* Name Field */}
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

            {/* Phone Field */}
            <div>
              <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-green-600" />
                Phone
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors"
              />
            </div>

            {/* Address Fields */}
            {formData.addresses && (
              <>
                <div>
                  <label className="flex items-center mb-1 text-sm font-medium text-gray-700">
                    <Home className="w-4 h-4 mr-2 text-green-600" />
                    Street
                  </label>
                  <input
                    type="text"
                    name="addresses.street"
                    value={formData.addresses.street || ''}
                    onChange={(e) => {
                      const street = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        addresses: {
                          ...prev.addresses!,
                          street
                        }
                      }));
                    }}
                    className="w-full p-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:bg-green-50 transition-colors"
                  />
                </div>
                {/* Additional address fields can be added similarly */}
              </>
            )}

            {/* Button Group */}
            <div className="pt-2 space-y-2">
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
    </div>
  );
};

export default ArtsanSettings;