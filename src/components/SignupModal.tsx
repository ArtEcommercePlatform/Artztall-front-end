import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  primary: boolean;
}

interface SignupForm {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: 'ARTISAN' | 'CUSTOMER';
  addresses: Address[];
  profileImageUrl: string;
  artistBio: string;
  specialties: string[];
}

const AVAILABLE_SPECIALTIES = [
  'Watercolor', 'Oil Painting', 'Digital Art', 'Sculpture', 
  'Photography', 'Ceramics', 'Mixed Media', 'Acrylic', 
  'Illustration', 'Printmaking'
];

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignupForm>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: 'CUSTOMER',
    addresses: [{
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      primary: true
    }],
    profileImageUrl: '',
    artistBio: '',
    specialties: []
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAddresses = formData.addresses.map((address, i) => {
      if (i === index) {
        return {
          ...address,
          [e.target.name]: e.target.value
        };
      }
      return address;
    });
    setFormData({
      ...formData,
      addresses: updatedAddresses
    });
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        onClose();
        // Handle success (e.g., show success message, redirect)
      } else {
        // Handle error
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          className={`flex-1 py-3 text-center rounded-lg ${
            formData.role === 'CUSTOMER'
              ? 'bg-[#094129] text-white'
              : 'border border-[#094129] text-[#094129]'
          }`}
          onClick={() => setFormData({ ...formData, role: 'CUSTOMER' })}
        >
          Customer
        </button>
        <button
          className={`flex-1 py-3 text-center rounded-lg ${
            formData.role === 'ARTISAN'
              ? 'bg-[#094129] text-white'
              : 'border border-[#094129] text-[#094129]'
          }`}
          onClick={() => setFormData({ ...formData, role: 'ARTISAN' })}
        >
          Artist
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
          required
        />
      </div>

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
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Image URL
        </label>
        <input
          type="url"
          name="profileImageUrl"
          value={formData.profileImageUrl}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          type="text"
          name="street"
          value={formData.addresses[0].street}
          onChange={(e) => handleAddressChange(e, 0)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.addresses[0].city}
            onChange={(e) => handleAddressChange(e, 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.addresses[0].state}
            onChange={(e) => handleAddressChange(e, 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.addresses[0].country}
            onChange={(e) => handleAddressChange(e, 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.addresses[0].zipCode}
            onChange={(e) => handleAddressChange(e, 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      {formData.role === 'ARTISAN' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Artist Bio
            </label>
            <textarea
              name="artistBio"
              value={formData.artistBio}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialties
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SPECIALTIES.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => toggleSpecialty(specialty)}
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                    formData.specialties.includes(specialty)
                      ? 'bg-[#094129] text-white'
                      : 'border border-[#094129] text-[#094129]'
                  }`}
                >
                  {specialty}
                  {formData.specialties.includes(specialty) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#094129]">
            Create Account
          </h2>
          <div className="flex justify-between mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 mx-1 rounded ${
                  i <= step ? 'bg-[#094129]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          <div className="flex justify-between gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 py-2 border border-[#094129] text-[#094129] rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
            )}
            
            <button
              type="button"
              onClick={() => {
                if (step < 4) {
                  setStep(step + 1);
                } else {
                  handleSubmit();
                }
              }}
              className="flex-1 bg-[#094129] text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              {step === 4 ? 'Create Account' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;