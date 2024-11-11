import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';
import ImageUpload from '../../components/ImageUpload';

interface FormData {
  name: string;
  price: string;
  style: string;
  category: string;
  artistName: string;
  tags: string;
  stockQuantity: string;
  length: string;
  width: string;
  unit: string;
  orientation: string;
  medium: string;
  framed: string;
  description: string;
  imageUrls: string[];
}

const CreatePostForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    style: '',
    category: '',
    artistName: '',
    tags: '',
    stockQuantity: '',
    length: '',
    width: '',
    unit: '',
    orientation: '',
    medium: '',
    framed: '',
    description: '',
    imageUrls: [],
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    let imageUrl = '';
    if (selectedImage) {
      const storageRef = ref(storage, `posts/${Date.now()}-${selectedImage.name}`);
      
      try {
        const snapshot = await uploadBytes(storageRef, selectedImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error('Error uploading image:', error);
        setIsUploading(false);
        return;
      }
    }

    const finalFormData = {
      ...formData,
      imageUrls: imageUrl ? [imageUrl] : [],
    };

    try {
      console.log(finalFormData);
      // Send data to backend
      const response = await fetch('https://dummyapi.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });

      if (response.ok) {
        // Refresh page after successful post creation
        window.location.reload();
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='bg-[#094129]'>
    <div className="w-[60vw] mx-auto m-8 p-6 bg-white rounded-lg shadow">
      <ImageUpload onImageSelect={handleImageSelect} />

      <form onSubmit={handleSubmit} className="space-y-4 text-[#094129]">
        <div>
          <label className="block text-sm font-medium">Art Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium ">Price (Rs.)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium ">Style</label>
          <select
            name="style"
            value={formData.style}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
            required
          >
            <option value="abstract">Abstract</option>
            <option value="minimalist">Minimalist</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
            <option value="nature">Nature</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium ">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
            required
          >
            <option value="digital">Digital</option>
            <option value="painting">Painting</option>
            <option value="sculpture">Sculpture</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium ">Artist Name</label>
          <input
            type="text"
            name="artistName"
            value={formData.artistName}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium ">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium ">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm font-medium ">Width</label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium ">Height</label>
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium ">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
              required
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium ">Orientation</label>
          <select
            name="orientation"
            value={formData.orientation}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
            required
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium ">Frame</label>
          <select
            name="framed"
            value={formData.framed}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
            required
          >
            <option value="framed">Framed</option>
            <option value="no-framed">No Framed</option>
            <option value="wrapped">Wrapped</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium ">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 w-full px-3 py-2 border border-[#14AF6C] rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[30%] my-3 px-4 py-3 bg-[#094129] text-white rounded-md hover:bg-[#14AF6C] transition duration-300 disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreatePostForm;
