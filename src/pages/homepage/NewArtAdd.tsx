import React, { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { apiClient } from "../../services/apiClient";
import { uploadImageToCloudinary } from "../../services/cloudinary";

interface Dimensions {
  length: number;
  width: number;
  unit: string;
}

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl: string;
  stockQuantity: number;
  dimensions: Dimensions;
  medium: string;
  style: string;
}

const CATEGORIES = [
  "Oil Painting",
  "Acrylic Painting",
  "Watercolor",
  "Digital Art",
  "Mixed Media",
  "Abstract",
  "Portrait",
  "Landscape",
  "Still Life"
];

const AVAILABLE_TAGS = [
  "Contemporary",
  "Modern",
  "Classical",
  "Abstract",
  "Minimalist",
  "Impressionist",
  "Expressionist",
  "Surrealist",
  "Nature",
  "Urban",
  "Portrait",
  "Landscape"
];

const NewArtAdd = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    tags: [],
    imageUrl: "",
    stockQuantity: 1,
    dimensions: { length: 0, width: 0, unit: "cm" },
    medium: "",
    style: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

 const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  if (name.includes(".")) {
    const [parent, child] = name.split(".");

    setProduct((prev) => {
      const parentValue = prev[parent as keyof Product];

      // Ensure parentValue is an object before using the spread operator
      if (typeof parentValue === "object" && parentValue !== null) {
        return {
          ...prev,
          [parent]: {
            ...parentValue,
            [child]: value,
          },
        };
      }

      // If it's not an object, return the previous state unchanged
      return prev;
    });
  } else {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const handleTagToggle = (tag: string) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleImageUpload = useCallback(async (file: File | null) => {
    if (!file) return;

    setError("");
    setIsUploading(true);
    setUploadProgress(0);

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      setIsUploading(false);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      setIsUploading(false);
      return;
    }

    try {
      const previewURL = URL.createObjectURL(file);
      setPreviewUrl(previewURL);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const imageUrl = await uploadImageToCloudinary(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setProduct((prev) => ({ ...prev, imageUrl }));
      setIsUploading(false);
    } catch (err) {
      setError("Error uploading file: " + (err as Error).message);
      setIsUploading(false);
      setPreviewUrl("");
    }
  }, []);

  const handleImageReset = () => {
    setProduct((prev) => ({ ...prev, imageUrl: "" }));
    setPreviewUrl("");
    setUploadProgress(0);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await apiClient.post("/products", {
        ...product,
        stockQuantity: 1
      });

      if (response.success) {
        // Handle successful submission
        console.log("Product created successfully:", response.data);
        // Reset form or redirect
      }
    } catch (err: any) {
      setError(err.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-green-900">Create New Artwork</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-green-900">Artwork Image</label>
          <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-green-900">
            {!previewUrl && !product.imageUrl ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Upload className="w-12 h-12 text-green-900" />
                </div>
                <div>
                  <label
                    htmlFor="image-upload"
                    className="text-green-900 cursor-pointer hover:text-green-700"
                  >
                    Upload an image
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                  />
                  <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full aspect-video">
                  <img
                    src={previewUrl || product.imageUrl}
                    alt="Product preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleImageReset}
                    className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {isUploading && (
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-green-900 rounded"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Uploading... {Math.round(uploadProgress)}%
                    </p>
                  </div>
                )}
              </div>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-green-900">
              Artwork Name
            </label>
            <input
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-green-900">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-900 focus:border-transparent"
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-green-900">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={product.price}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="medium" className="block text-sm font-medium text-green-900">
              Medium
            </label>
            <input
              id="medium"
              name="medium"
              value={product.medium}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="style" className="block text-sm font-medium text-green-900">
              Style
            </label>
            <input
              id="style"
              name="style"
              value={product.style}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-900 focus:border-transparent"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-green-900">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    product.tags.includes(tag)
                      ? "bg-green-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <label htmlFor="dimensions.length" className="block text-sm font-medium text-green-900">
              Length (cm)
            </label>
            <input
              id="dimensions.length"
              name="dimensions.length"
              type="number"
              min="0"
              value={product.dimensions.length}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="dimensions.width" className="block text-sm font-medium text-green-900">
              Width (cm)
            </label>
            <input
              id="dimensions.width"
              name="dimensions.width"
              type="number"
              min="0"
              value={product.dimensions.width}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-900 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-green-900">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-900 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="w-full px-4 py-2 text-white transition-colors duration-200 bg-green-900 rounded hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating...
            </span>
          ) : (
            "Create Artwork"
          )}
        </button>
      </form>
    </div>
  );
};

export default NewArtAdd;