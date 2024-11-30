import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

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
    //This is hardcoded data to show the structure. delete these on actual implementation.
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
  const [open, setOpen] = useState(false);

  // Fetch artworks based on the filter
  const fetchArtworks = async () => {
    try {
      const response = await axios.get(
        `https://dummyapi.com/artworks?filter=${filter}`,
      ); //sends the filter status to backend. backend should send the data based on filter.
      setArtworks(response.data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  // Delete artwork
  const deleteArtwork = async (id: string) => {
    try {
      await axios.delete(`https://dummyapi.com/artworks/${id}`); //sends the art id to backend and backend should perform the deletion of database.
      setArtworks((prev) => prev.filter((artwork) => artwork.id !== id));
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [filter]);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteArtwork(deleteId);
    }
    setOpen(false);
  };

  return (
    <div className="p-4">
      {/* Filter dropdown */}
      <div className="mb-4 flex justify-end">
        <select
          className="border rounded p-2"
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

      {/* Artworks table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Artist Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <tr key={artwork.id}>
                <td className="border p-2">
                  <img
                    src={artwork.image}
                    alt={artwork.name}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="border p-2">{artwork.name}</td>
                <td className="border p-2">${artwork.price}</td>
                <td className="border p-2">{artwork.description}</td>
                <td className="border p-2">{artwork.artistName}</td>
                <td className="border p-2">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(artwork.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this artwork? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Artwork;
