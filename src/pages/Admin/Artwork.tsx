import React, { useEffect, useState } from "react";
import { Trash2, Filter } from "lucide-react";

interface Artwork {
  id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  artistName: string;
}

const Artwork: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([
    {
      id: "1",
      image: "https://via.placeholder.com/150",
      name: "Sunset Art",
      price: 100,
      description: "A beautiful sunset painting.",
      artistName: "John Doe",
    },
    {
      id: "2",
      image: "https://via.placeholder.com/150",
      name: "Abstract Vibes",
      price: 200,
      description: "Abstract art with vibrant colors.",
      artistName: "Jane Smith",
    },
    {
      id: "3",
      image: "https://via.placeholder.com/150",
      name: "Nature's Bliss",
      price: 150,
      description: "A serene depiction of nature.",
      artistName: "Emily Brown",
    },
  ]);
  const [filter, setFilter] = useState<string>("earliest");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Simulated fetch artworks (would be replaced with actual API call)
  const fetchArtworks = async () => {
    // In a real implementation, this would be an actual API call
    // console.log(`Fetching artworks with filter: ${filter}`);
  };

  // Simulated delete artwork (would be replaced with actual API call)
  const deleteArtwork = async (id: string) => {
    setArtworks((prev) => prev.filter((artwork) => artwork.id !== id));
  };

  useEffect(() => {
    fetchArtworks();
  }, [filter]);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteArtwork(deleteId);
    }
    setConfirmDelete(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Filter dropdown */}
      <div className="mb-4 flex justify-end items-center space-x-2">
        <Filter className="text-gray-500" />
        <select
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="earliest">Earliest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabet">Alphabet</option>
          <option value="expensive">Expensive</option>
          <option value="cheapest">Cheapest</option>
        </select>
      </div>

      {/* Artworks grid for mobile, table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Image</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Price</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-left">Artist Name</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <tr key={artwork.id} className="hover:bg-gray-50">
                <td className="border p-3">
                  <img
                    src={artwork.image}
                    alt={artwork.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="border p-3">{artwork.name}</td>
                <td className="border p-3">${artwork.price}</td>
                <td className="border p-3">{artwork.description}</td>
                <td className="border p-3">{artwork.artistName}</td>
                <td className="border p-3">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center space-x-1"
                    onClick={() => handleDelete(artwork.id)}
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view - card layout */}
      <div className="md:hidden space-y-4">
        {artworks.map((artwork) => (
          <div 
            key={artwork.id} 
            className="border rounded-lg p-4 shadow-sm flex items-center space-x-4"
          >
            <img
              src={artwork.image}
              alt={artwork.name}
              className="h-20 w-20 object-cover rounded"
            />
            <div className="flex-grow">
              <h3 className="font-semibold">{artwork.name}</h3>
              <p className="text-gray-600 text-sm">${artwork.price}</p>
              <p className="text-gray-500 text-xs">{artwork.artistName}</p>
            </div>
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              onClick={() => handleDelete(artwork.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Confirm Delete</h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete this artwork? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artwork;