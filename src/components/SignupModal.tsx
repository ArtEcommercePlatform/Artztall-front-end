import React, { useState } from "react";
import { X, Plus, Check } from "lucide-react";
import { useToast } from "../assets/components/toast/Toast";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

interface SignupForm {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  userType: "ARTISAN" | "BUYER";
  bio?: string;
  artworkCategories?: string[];
  address?: Address;
  profileImage?: File;
}

const ARTWORK_CATEGORIES = [
  "Watercolor",
  "Oil Painting",
  "Digital Art",
  "Sculpture",
  "Photography",
  "Ceramics",
  "Mixed Media",
  "Acrylic",
  "Illustration",
  "Printmaking",
];

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [step, setStep] = useState(1);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    userType: "BUYER",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      isDefault: true,
    },
    artworkCategories: [],
  });

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address!,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profileImage: e.target.files[0],
      });
    }
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      artworkCategories: prev.artworkCategories?.includes(category)
        ? prev.artworkCategories.filter((c) => c !== category)
        : [...(prev.artworkCategories || []), category],
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      let profileImageUrl = "";
      if (formData.profileImage) {
        profileImageUrl = "string";
      }

      // Prepare the request payload based on user type
      const payload =
        formData.userType === "BUYER"
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              phoneNumber: formData.phoneNumber,
              userType: formData.userType,
              address: formData.address,
              profileImageUrl,
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              phoneNumber: formData.phoneNumber,
              userType: formData.userType,
              bio: formData.bio,
              artworkCategories: formData.artworkCategories,
              profileImageUrl,
            };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Account created successfully!");
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create account");
      }
    } catch (error) {
      toast.error("An error occurred during signup");
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          type="button"
          className={`flex-1 py-3 text-center rounded-lg ${
            formData.userType === "BUYER"
              ? "bg-[#094129] text-white"
              : "border border-[#094129] text-[#094129]"
          }`}
          onClick={() => setFormData({ ...formData, userType: "BUYER" })}
        >
          Buyer
        </button>
        <button
          type="button"
          className={`flex-1 py-3 text-center rounded-lg ${
            formData.userType === "ARTISAN"
              ? "bg-[#094129] text-white"
              : "border border-[#094129] text-[#094129]"
          }`}
          onClick={() => setFormData({ ...formData, userType: "ARTISAN" })}
        >
          Artist
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
          required
          minLength={6}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
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
          Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      {formData.userType === "BUYER" ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              name="street"
              value={formData.address?.street}
              onChange={handleAddressChange}
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
                value={formData.address?.city}
                onChange={handleAddressChange}
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
                value={formData.address?.state}
                onChange={handleAddressChange}
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
                value={formData.address?.country}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.address?.postalCode}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
                required
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Artist Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
            rows={4}
            required
          />
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      {formData.userType === "ARTISAN" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Artwork Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {ARTWORK_CATEGORIES.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                  formData.artworkCategories?.includes(category)
                    ? "bg-[#094129] text-white"
                    : "border border-[#094129] text-[#094129]"
                }`}
              >
                {category}
                {formData.artworkCategories?.includes(category) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          disabled={isLoading}
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
                  i <= step ? "bg-[#094129]" : "bg-gray-200"
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
                disabled={isLoading}
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
              {step === 4 ? "Create Account" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
