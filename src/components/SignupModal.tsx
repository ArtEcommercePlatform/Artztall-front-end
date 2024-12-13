import React, { useState } from "react";
import { X, Plus, Check } from "lucide-react";
import { useToast } from "../assets/components/toast/Toast";
import { uploadImageToCloudinary } from "../services/cloudinary";
import { apiClient } from "../services/apiClient";
import { useNavigate } from "react-router-dom";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApiResponse {
  token: string;
  id: string;
  email: string;
  name: string;
  userType: string;
  bio: string;
  artworkCategories: string[];
  address: Address;
  verified: boolean;
  profImg: string;
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
      const file = e.target.files[0];
    
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      setFormData({
        ...formData,
        profileImage: file,
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
      setUploadProgress(0);

      let profileImageUrl = "";
      if (formData.profileImage) {
        try {
          profileImageUrl = await uploadImageToCloudinary(
            formData.profileImage,
          );
          setUploadProgress(100);
        } catch (error) {
          toast.error("Failed to upload profile image");
          return;
        }
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
              profImg: profileImageUrl,
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              phoneNumber: formData.phoneNumber,
              userType: formData.userType,
              bio: formData.bio,
              artworkCategories: formData.artworkCategories,
              profImg: profileImageUrl,
            };

      const response = await apiClient.post<ApiResponse>(
        "/auth/signup",
        payload,
      );

      if (response.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userRole", response.data.userType);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("profImg", response.data.profImg);
        toast.success("Account created successfully!");
        if (response.data?.userType === "BUYER") {
          navigate("/customer/dashboard");
        } else if (response.data?.userType === "ARTISAN") {
          navigate("/artisan/dashboard");
        }
        onClose();
      } else {
        toast.error(response.message || "Failed to create account");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during signup");
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
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
        <label  className="block mb-1 text-sm font-medium text-gray-700" 
        htmlFor="name">
          Full Name
        </label>
        <input
        id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700"
        htmlFor="email">
          Email
        </label>
        <input
        id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700"
        htmlFor="password">
          Password
        </label>
        <input
        id="password"
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
        <label className="block mb-1 text-sm font-medium text-gray-700"
        htmlFor="PhoneNumber">
          Phone Number
        </label>
        <input
        id="phoneNumber"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="profile"  className="block mb-1 text-sm font-medium text-gray-700">
          Profile Image
        </label>
        <input
         id="profile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
        />
        {uploadProgress > 0 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#094129] h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      {formData.userType === "BUYER" ? (
        <>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700"
            htmlFor="StreetAddress">
              Street Address
            </label>
            <input
            id="StreetAddress"
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
              <label className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="city">
                City
              </label>
              <input
              id="city"
                type="text"
                name="city"
                value={formData.address?.city}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="state">
                State
              </label>
              <input
              id="state"
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
              <label className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="country">
                Country
              </label>
              <input
              id="country"
                type="text"
                name="country"
                value={formData.address?.country}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#094129] focus:border-[#094129] outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="postalcode">
                Postal Code
              </label>
              <input
              id="postalcode"
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
          <label className="block mb-1 text-sm font-medium text-gray-700"
          htmlFor="Artistbio">
            Artist Bio
          </label>
          <textarea
          id="Artisanbio"
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
          <label className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor="artwork">
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
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg">
        <button
          onClick={onClose}
          data-testid="close-modal"
          className="absolute text-gray-500 right-4 top-4 hover:text-gray-700"
          disabled={isLoading}
        >
          <X className="w-6 h-6" />
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
              className="flex-1 bg-[#094129] text-white py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : step === 4 ? (
                "Create Account"
              ) : (
                "Next"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
