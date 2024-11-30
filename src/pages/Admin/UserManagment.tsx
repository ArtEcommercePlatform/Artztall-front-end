import React, { useState, useEffect } from "react";
import { TextField, Pagination } from "@mui/material";

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

  //uncomment this to actual api call

  // const fetchUsers = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `https://dummyapi.io/users?page=${page - 1}&size=5&search=${search}`
  //     );
  //     const data: PaginatedResponse = await response.json();
  //     setUsers(data.content);
  //     setTotalPages(data.totalPages);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //this is hard coded data
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
    <div className="p-4">
      {/* Search Bar */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        className="mb-4"
        value={search}
        onChange={handleSearchChange}
      />

      {/* Profile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
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
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {/* If the user has an artwork category, they are an Artist */}
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
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleSuspend(user.id)}
                >
                  Suspend
                </button>
                <button
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleBan(user.id)}
                >
                  Ban
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default UserManagement;
