import React, { useState, useEffect } from "react";
import { Search, Ban, AlertOctagon } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  profilePictureUrl?: string | null;
  bio?: string | null;
  artworkCategories?: string[];
  averageRating?: number;
  totalSales?: number;
  verified?: boolean;
}

interface PaginatedResponse {
  content: User[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);

    // Hardcoded data simulating backend response
    const data: PaginatedResponse = {
      content: [
        {
          id: "1",
          email: "dilshan@example.com",
          name: "Dilshan Prasanna",
          phoneNumber: "+1234567890",
          profilePictureUrl: null,
          bio: "Experienced artisan in handmade crafts.",
          artworkCategories: ["Sculpture", "Painting"],
          averageRating: 4.5,
          totalSales: 10,
          verified: true,
        },
        {
          id: "2",
          email: "asela@example.com",
          name: "Asela Maduwantha",
          phoneNumber: "+9876543210",
          profilePictureUrl: null,
          bio: null,
          artworkCategories: [],
          averageRating: 0,
          totalSales: 0,
          verified: false,
        },
        {
          id: "3",
          email: "nuwan@example.com",
          name: "Nuwan Jayasooriya",
          phoneNumber: "+94712345678",
          profilePictureUrl: "https://via.placeholder.com/100",
          bio: "Photographer and digital artist.",
          artworkCategories: ["Photography", "Digital Art"],
          averageRating: 3.8,
          totalSales: 25,
          verified: true,
        },
        {
          id: "4",
          email: "kasun@example.com",
          name: "Kasun Silva",
          phoneNumber: "+9476543210",
          profilePictureUrl: null,
          bio: "Abstract painter specializing in large-scale installations.",
          artworkCategories: ["Abstract Art"],
          averageRating: 4.9,
          totalSales: 50,
          verified: true,
        },
        {
          id: "5",
          email: "janith@example.com",
          name: "Janith Fernando",
          phoneNumber: "+94781234567",
          profilePictureUrl: "https://via.placeholder.com/100",
          bio: "Beginner artist exploring various mediums.",
          artworkCategories: [],
          averageRating: 2.0,
          totalSales: 5,
          verified: false,
        },
      ],
      pageable: { pageNumber: 0, pageSize: 5 },
      totalPages: 2,
      totalElements: 10,
    };

    setUsers(data.content);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleSuspend = (userId: string) => {
    console.log(`Suspend user with ID: ${userId}`);
  };

  const handleBan = (userId: string) => {
    console.log(`Ban user with ID: ${userId}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page on search
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search Users"
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={handleSearchChange}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <img
                    src={
                      user.profilePictureUrl ||
                      "https://via.placeholder.com/100"
                    }
                    alt={user.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {user.artworkCategories &&
                      user.artworkCategories.length > 0
                        ? "Artist"
                        : "Buyer"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 py-1">
                  <strong>Email:</strong> {user.email}
                </p>
                {user.bio && (
                  <p className="text-sm text-gray-600 py-1">
                    <strong>Bio:</strong> {user.bio}
                  </p>
                )}
                {user.phoneNumber && (
                  <p className="text-sm text-gray-600 py-1">
                    <strong>Phone:</strong> {user.phoneNumber}
                  </p>
                )}
                {user.artworkCategories &&
                  user.artworkCategories.length > 0 && (
                    <p className="text-sm text-gray-600 py-1">
                      <strong>Categories:</strong>{" "}
                      {user.artworkCategories.join(", ")}
                    </p>
                  )}
              </div>
              <div className="flex justify-start space-x-2 py-2">
                <button
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-2"
                  onClick={() => handleSuspend(user.id)}
                >
                  <AlertOctagon size={16} />
                  <span>Suspend</span>
                </button>
                <button
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 flex items-center space-x-2"
                  onClick={() => handleBan(user.id)}
                >
                  <Ban size={16} />
                  <span>Ban</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`px-4 py-2 rounded ${
              page === pageNum
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
