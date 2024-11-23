import React from 'react';
import { Star, Phone, Mail } from "lucide-react";

const ArtistMain = () => {
  const artists = [
    {
      id: "6741cc37b919bf425597e378",
      email: "maduwantha@gmail.com",
      name: "Asela Maduwantha",
      phoneNumber: "0760248263",
      profilePictureUrl: null,
      bio: "Test artist",
      artworkCategories: ["Watercolor", "Oil Painting", "Digital Art", "Mixed Media"],
      averageRating: 0,
      totalSales: 0,
      verified: false,
    },
    {
      id: "b8242f49c7a93f8210a45e93",
      email: "kamal@gmail.com",
      name: "Kamal Perera",
      phoneNumber: "0771234567",
      profilePictureUrl: null,
      bio: "An experienced oil painter.",
      artworkCategories: ["Oil Painting", "Acrylic"],
      averageRating: 4.5,
      totalSales: 15,
      verified: true,
    },
    {
      id: "c9837d13d8a4ef57f678b890",
      email: "nimal@gmail.com",
      name: "Nimal Silva",
      phoneNumber: "0719876543",
      profilePictureUrl: null,
      bio: "Digital artist and illustrator.",
      artworkCategories: ["Digital Art", "Sketching"],
      averageRating: 4.2,
      totalSales: 20,
      verified: true,
    },
    {
      id: "d7438f27f8b65e2019c72b89",
      email: "sanjeewa@gmail.com",
      name: "Sanjeewa Fernando",
      phoneNumber: "0753456789",
      profilePictureUrl: null,
      bio: "Mixed media expert.",
      artworkCategories: ["Mixed Media", "Sculpture"],
      averageRating: 4.8,
      totalSales: 30,
      verified: true,
    },
  ];

  return (
    <div className="container p-6 mx-auto ">
      <h1 className="mb-8 text-3xl font-bold text-center">Our Artists</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex flex-col p-6 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center justify-center w-16 h-16 text-xl font-bold bg-gray-200 rounded-full">
                {artist.name.split(' ').map((n) => n[0]).join('')}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{artist.name}</h2>
                  {artist.verified && (
                    <span className="px-2 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{artist.bio}</p>
              </div>
            </div>

            <div className="mb-4 text-gray-600">
              <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
                <span>{artist.email}</span>
              </div>
              <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
                <span>{artist.phoneNumber}</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="mb-2 font-semibold">Artwork Categories</h3>
              <div className="flex flex-wrap gap-2">
                {artist.artworkCategories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 text-sm bg-gray-100 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">Average Rating</span>
                </div>
                <p className="text-2xl font-bold">
                  {artist.averageRating.toFixed(1)}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <span className="font-semibold">Total Sales</span>
                <p className="text-2xl font-bold">{artist.totalSales}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistMain;
