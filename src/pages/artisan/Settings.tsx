
import React, { useState } from 'react';
import { 
  UserCog, 
  Lock, 
  Edit,
  Check,
  X
} from 'lucide-react';

const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe', // Added default value for demonstration
    email: 'john.doe@example.com', // Added default value for demonstration
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [originalData, setOriginalData] = useState({ ...formData });
  const [hasChanges, setHasChanges] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [editMode, setEditMode] = useState({
    fullName: false,
    email: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setHasChanges(true);

    if (name === 'newPassword' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    console.log('Saving changes:', formData);
    setOriginalData({ ...formData });
    setHasChanges(false);
    setEditMode({ fullName: false, email: false });
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setHasChanges(false);
    setPasswordError('');
    setEditMode({ fullName: false, email: false });
  };

  const handleFieldSave = (field: 'fullName' | 'email') => {
    setEditMode(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleFieldCancel = (field: 'fullName' | 'email') => {
    setFormData(prev => ({
      ...prev,
      [field]: originalData[field]
    }));
    setEditMode(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const toggleEditMode = (field: 'fullName' | 'email') => {
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderEditableField = (
    field: 'fullName' | 'email',
    label: string,
    type: string = 'text'
  ) => {
    return (
      <div className="relative group">
        {editMode[field] ? (
          <div className="flex items-center space-x-2">
            <input 
              type={type}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={label}
              className="flex-1 px-3 py-2 border-2 border-green-100 rounded-lg 
                focus:border-green-500 focus:ring-2 focus:ring-green-200 
                transition duration-300 bg-white"
            />
            <div className="flex space-x-1">
              <button 
                onClick={() => handleFieldSave(field)}
                className="p-1 text-green-600 hover:text-green-800 
                  bg-green-50 rounded-full transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleFieldCancel(field)}
                className="p-1 text-red-600 hover:text-red-800 
                  bg-red-50 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 rounded-lg
            hover:bg-green-50/50 transition-colors group">
            <div className="flex flex-col">
              <span className="text-xs text-green-600/60 font-medium">
                {label}
              </span>
              <span className="text-green-800">
                {formData[field]}
              </span>
            </div>
            <button 
              onClick={() => toggleEditMode(field)}
              className="opacity-0 group-hover:opacity-100 transition-opacity
                text-green-500 hover:text-green-700 p-1
                bg-white rounded-full shadow-sm"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Account Settings
            </h1>
            <p className="text-white/80 text-xs mt-1">
              Personalize and secure your account
            </p>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-white/80 rounded-xl border border-green-100 shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-green-800">
                <UserCog className="mr-2 w-5 h-5 text-green-600" /> 
                Profile Information
              </h2>
              <div className="space-y-3">
                {renderEditableField('fullName', 'Full Name')}
                {renderEditableField('email', 'Email Address', 'email')}
              </div>
            </div>

            <div className="bg-white/80 rounded-xl border border-green-100 shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center text-green-800">
                <Lock className="mr-2 w-5 h-5 text-green-600" /> 
                Change Password
              </h2>
              <div className="space-y-3">
                <input 
                  type="password" 
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Current Password" 
                  className="w-full px-3 py-2 border-2 border-green-100 rounded-lg 
                    focus:border-green-500 focus:ring-2 focus:ring-green-200 
                    transition duration-300"
                />
                <input 
                  type="password" 
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Password" 
                  className="w-full px-3 py-2 border-2 border-green-100 rounded-lg 
                    focus:border-green-500 focus:ring-2 focus:ring-green-200 
                    transition duration-300"
                />
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm New Password" 
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 
                    transition duration-300 ${passwordError 
                    ? 'border-red-500 focus:ring-red-200 text-red-600' 
                    : 'border-green-100 focus:border-green-500 focus:ring-green-200'}`}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1 pl-2">{passwordError}</p>
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
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg 
                  hover:bg-gray-300 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg 
                  hover:bg-green-700 transition-colors text-sm shadow-md"
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