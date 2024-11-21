// ProductList.tsx
import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  artistId: string;
  category: string;
  tags: string[];
  imageUrl: string;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
  dimensions: {
    length: number;
    width: number;
    unit: string;
  };
  medium: string;
  style: string;
  available: boolean;
}

// Dummy data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Abstract Art Piece",
    description: "A beautiful abstract painting in vibrant colors.",
    price: 100,
    artistId: "artist-1",
    category: "Painting",
    tags: ["abstract", "colorful"],
    imageUrl: "https://via.placeholder.com/150",
    stockQuantity: 10,
    createdAt: "2024-11-08T06:30:39.637Z",
    updatedAt: "2024-11-08T06:30:39.637Z",
    dimensions: { length: 20, width: 30, unit: "cm" },
    medium: "Acrylic",
    style: "Abstract",
    available: true,
  },
  {
    id: "2",
    name: "Landscape Masterpiece",
    description: "A serene landscape painting capturing nature’s beauty.",
    price: 200,
    artistId: "artist-2",
    category: "Painting",
    tags: ["landscape", "nature"],
    imageUrl: "https://via.placeholder.com/150",
    stockQuantity: 5,
    createdAt: "2024-11-08T06:30:39.637Z",
    updatedAt: "2024-11-08T06:30:39.637Z",
    dimensions: { length: 30, width: 40, unit: "cm" },
    medium: "Oil",
    style: "Landscape",
    available: true,
  },
  // Add more mock products as needed
];

const ProductList: React.FC = () => {
  const [page, setPage] = useState(0);
  const size = 2; // Display two products per page
  const totalPages = Math.ceil(mockProducts.length / size);

  // Calculate the products to display based on current page
  const productsToDisplay = mockProducts.slice(page * size, (page + 1) * size);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsToDisplay.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow-md">
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-2 rounded"/>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500 text-sm">{product.category}</p>
            <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))}
          disabled={page === totalPages - 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
