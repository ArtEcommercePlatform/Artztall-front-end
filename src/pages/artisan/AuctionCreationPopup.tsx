import React, { useState, useRef } from "react";
import { Gavel, ImagePlus, X, AlertCircle, CheckCircle } from "lucide-react";
import { uploadImageToCloudinary } from "../../services/cloudinary";
import { apiClient } from "../../services/apiClient";

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline";
  className?: string;
  type?: "button" | "submit";
}) => {
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant]} 
        px-4 py-2 rounded-lg 
        flex items-center justify-center 
        gap-2 
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className = "",
  error = "",
  label,
  required = false,
}: {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full 
          px-3 py-2 
          border ${error ? "border-red-500" : "border-gray-300"} 
          rounded-md 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-transparent
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircle size={16} className="mr-2" /> {error}
        </p>
      )}
    </div>
  );
};

const AuctionCreationPopup = ({
  isOpen,
  onClose,
  onAuctionCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAuctionCreated?: () => void;
}) => {
  const [newAuction, setNewAuction] = useState({
    title: "",
    description: "",
    startingPrice: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    startingPrice: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const errors = {
      title: newAuction.title ? "" : "Title is required",
      description: newAuction.description ? "" : "Description is required",
      startingPrice:
        newAuction.startingPrice && Number(newAuction.startingPrice) > 0
          ? ""
          : "Starting price must be greater than 0",
    };

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewAuction((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateAuction = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("idle");

    if (!validateForm() || !imageFile) {
      if (!imageFile) {
        alert("Please upload an artwork image");
      }
      return;
    }

    try {
      const paintingUrl = await uploadImageToCloudinary(imageFile);

      const auctionData = {
        title: newAuction.title,
        description: newAuction.description,
        startingPrice: Number(newAuction.startingPrice),
        paintingUrl,
        artistId: localStorage.getItem("userId") || "",
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const response = await apiClient.post("/auctions", auctionData);

      if (response.success) {
        setSubmissionStatus("success");

        setTimeout(() => {
          setNewAuction({
            title: "",
            description: "",
            startingPrice: "",
          });
          setImageFile(null);
          setImagePreview(null);
          onClose();
          onAuctionCreated?.();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to create auction:", error);
      setSubmissionStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Create New Auction
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleCreateAuction} className="p-6 space-y-5">
          {/* Image Upload Section */}
          <div>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center 
              hover:border-blue-500 transition-colors group cursor-pointer"
              onClick={() => imageInputRef.current?.click()}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={imageInputRef}
              />
              <div className="flex flex-col items-center">
                <ImagePlus
                  size={50}
                  className="text-gray-400 group-hover:text-blue-500 mb-3 transition-colors"
                />
                <p className="text-gray-600 group-hover:text-blue-500 transition-colors">
                  {imagePreview ? "Change Artwork Image" : "Upload Artwork"}
                </p>
              </div>
            </div>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 mx-auto h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          {/* Auction Details Inputs */}
          <div className="space-y-4">
            <Input
              name="title"
              label="Auction Title"
              value={newAuction.title}
              onChange={handleInputChange}
              placeholder="Enter artwork title"
              required
              error={formErrors.title}
            />

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={newAuction.description}
                onChange={handleInputChange}
                placeholder="Describe your artwork"
                required
                className={`
                  w-full px-3 py-2 
                  border ${formErrors.description ? "border-red-500" : "border-gray-300"} 
                  rounded-md 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  min-h-[120px]
                `}
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle size={16} className="mr-2" />{" "}
                  {formErrors.description}
                </p>
              )}
            </div>

            <Input
              type="number"
              name="startingPrice"
              label="Starting Price"
              value={newAuction.startingPrice}
              onChange={handleInputChange}
              placeholder="Set starting bid price"
              required
              error={formErrors.startingPrice}
            />
          </div>

          {/* Submission Status */}
          {submissionStatus === "success" && (
            <div className="bg-green-50 border border-green-300 rounded-lg p-4 flex items-center">
              <CheckCircle size={24} className="text-green-500 mr-3" />
              <p className="text-green-700">Auction created successfully!</p>
            </div>
          )}

          {submissionStatus === "error" && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex items-center">
              <AlertCircle size={24} className="text-red-500 mr-3" />
              <p className="text-red-700">
                Failed to create auction. Please try again.
              </p>
            </div>
          )}

          {/* Create Auction Button */}
          <Button
            type="submit"
            disabled={submissionStatus === "success"}
            className="w-full mt-4"
          >
            <Gavel size={20} />
            Create Auction
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuctionCreationPopup;
