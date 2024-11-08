import React, { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface Dimensions {
  length: string;
  width: string;
  unit: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  artistId: string;
  category: string;
  tags: string;
  imageUrl: string;
  stockQuantity: string;
  isAvailable: boolean;
  dimensions: Dimensions;
  medium: string;
  style: string;
}

const NewArtAdd = () => {
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: '',
    artistId: '',
    category: '',
    tags: '',
    imageUrl: '',
    stockQuantity: '',
    isAvailable: false,
    dimensions: { length: '', width: '', unit: 'cm' },
    medium: '',
    style: ''
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProduct(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Product] as unknown as Record<string, unknown>),
          [child]: value
        }
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const simulateUpload = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve(`/api/placeholder/400/300`);
        }
      }, 200);
    });
  };

  const handleImageUpload = useCallback(async (file: File | null) => {
    if (!file) return;

    setError('');
    setIsUploading(true);
    setUploadProgress(0);

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      setIsUploading(false);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      setIsUploading(false);
      return;
    }

    try {
      const previewURL = URL.createObjectURL(file);
      setPreviewUrl(previewURL);

      const downloadURL = await simulateUpload(file);
      setProduct(prev => ({ ...prev, imageUrl: downloadURL }));
      setIsUploading(false);
    } catch (err) {
      setError('Error uploading file: ' + (err as Error).message);
      setIsUploading(false);
      setPreviewUrl('');
    }
  }, []);

  const handleImageReset = () => {
    setProduct(prev => ({ ...prev, imageUrl: '' }));
    setPreviewUrl('');
    setUploadProgress(0);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className="w-full max-w-3xl p-4 mx-auto border rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Image Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Product Image</label>
          <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-lg">
            {!previewUrl && !product.imageUrl ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <label
                    htmlFor="image-upload"
                    className="text-blue-600 cursor-pointer hover:text-blue-500"
                  >
                    Upload an image
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files ? e.target.files[0] : null)}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
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
                    <progress max="100" value={uploadProgress} className="w-full" />
                    <p className="text-sm text-gray-500">
                      Uploading... {Math.round(uploadProgress)}%
                    </p>
                  </div>
                )}
              </div>
            )}
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
            <input
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
          <div>
            <label htmlFor="style" className="block text-sm font-medium">Style</label>
            <input
              id="style"
              name="style"
              value={product.style}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
         

          <div>
            <label htmlFor="price" className="block text-sm font-medium">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={product.price}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div>
            <label htmlFor="artistId" className="block text-sm font-medium">Artist ID</label>
            <input
              id="artistId"
              name="artistId"
              value={product.artistId}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium">Category</label>
            <input
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium">Tags</label>
            <input
              id="tags"
              name="tags"
              value={product.tags}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div>
            <label htmlFor="stockQuantity" className="block text-sm font-medium">Stock Quantity</label>
            <input
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              value={product.stockQuantity}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div className="flex items-center mt-2">
            <input
              id="isAvailable"
              name="isAvailable"
              type="checkbox"
              checked={product.isAvailable}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="isAvailable" className="text-sm font-medium">Available</label>
          </div>

          {/* Dimensions */}
          <div>
            <label htmlFor="dimensions.length" className="block text-sm font-medium">Length</label>
            <input
              id="dimensions.length"
              name="dimensions.length"
              value={product.dimensions.length}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div>
            <label htmlFor="dimensions.width" className="block text-sm font-medium">Width</label>
            <input
              id="dimensions.width"
              name="dimensions.width"
              value={product.dimensions.width}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div>
            <label htmlFor="dimensions.unit" className="block text-sm font-medium">Unit</label>
            <input
              id="dimensions.unit"
              name="dimensions.unit"
              value={product.dimensions.unit}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div>
            <label htmlFor="medium" className="block text-sm font-medium">Medium</label>
            <input
              id="medium"
              name="medium"
              value={product.medium}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

         
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
              rows={3}
            />
          </div>
          <div className='px-50'>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Create Product
        </button>
        </div>
      </form>
    </div>
  );
};

export default NewArtAdd;
