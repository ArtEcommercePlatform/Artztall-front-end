import React, { useState } from "react";
import { Heart, Share2, ExternalLink } from "lucide-react";

interface ArtPiece {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  category: string;
  likes: number;
  dimensions: string;
  medium: string;
}

interface FilterOptions {
  category: string;
  priceRange: string;
}

const dummyArtPieces: ArtPiece[] = [
  {
    id: "1",
    title: "Abstract Harmony",
    artist: "Sarah Chen",
    price: 1200,
    image:
      "https://img.freepik.com/free-vector/decorative-background-with-abstract-floral-design_1048-2569.jpg?semt=ais_hybrid",
    category: "Abstract",
    likes: 245,
    dimensions: '24" x 36"',
    medium: "Acrylic on Canvas",
  },
  {
    id: "2",
    title: "Urban Landscape",
    artist: "Michael Roberts",
    price: 850,
    image:
      "https://img.freepik.com/free-photo/city-architecture-landscape-digital-art_23-2151065642.jpg?semt=ais_hybrid",
    category: "Landscape",
    likes: 189,
    dimensions: '30" x 40"',
    medium: "Oil on Canvas",
  },
  {
    id: "3",
    title: "Serene Waters",
    artist: "Emma Thompson",
    price: 1500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4629jjuWbNn8181Vd71QfCVGebs-u7ta1Qg&s",
    category: "Landscape",
    likes: 312,
    dimensions: '36" x 48"',
    medium: "Watercolor",
  },
  {
    id: "4",
    title: "Digital Dreams",
    artist: "Alex Wong",
    price: 750,
    image:
      "https://w0.peakpx.com/wallpaper/282/712/HD-wallpaper-don-t-trash-your-dreams-dreams-digital-art-toys.jpg",
    category: "Digital",
    likes: 167,
    dimensions: '20" x 20"',
    medium: "Digital Print",
  },
  {
    id: "5",
    title: "Portrait of Grace",
    artist: "Isabella Martinez",
    price: 2200,
    image:
      "https://media.craiyon.com/2023-06-29/f0126470d9604481b529a357abb6542c.webp",
    category: "Portrait",
    likes: 423,
    dimensions: '24" x 36"',
    medium: "Oil on Canvas",
  },
  {
    id: "6",
    title: "Modern Expressions",
    artist: "David Kim",
    price: 980,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqzW7xS7QRTxGwssQ63GKDmRK-PNX14AKTaw&s",
    category: "Abstract",
    likes: 278,
    dimensions: '30" x 30"',
    medium: "Mixed Media",
  },
];

const Gallery: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    priceRange: "All",
  });

  const [filteredArt, setFilteredArt] = useState<ArtPiece[]>(dummyArtPieces);
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  const categories = ["All", "Abstract", "Landscape", "Portrait", "Digital"];
  const priceRanges = ["All", "Under $1000", "$1000-$2000", "Over $2000"];

  const handleFilterChange = (
    filterType: keyof FilterOptions,
    value: string,
  ) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    let filtered = dummyArtPieces;

    if (newFilters.category !== "All") {
      filtered = filtered.filter((art) => art.category === newFilters.category);
    }

    if (newFilters.priceRange !== "All") {
      filtered = filtered.filter((art) => {
        if (newFilters.priceRange === "Under LKR 1000") return art.price < 1000;
        if (newFilters.priceRange === "LKR 1000-LKR2000")
          return art.price >= 1000 && art.price <= 2000;
        if (newFilters.priceRange === "Over LKR 2000") return art.price > 2000;
        return true;
      });
    }

    setFilteredArt(filtered);
  };

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Art Gallery</h1>
        <div className="flex space-x-4">
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094129]/20"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094129]/20"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          >
            {priceRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArt.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => toggleLike(art.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    size={20}
                    className={
                      liked[art.id]
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }
                  />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {art.title}
                  </h2>
                  <p className="text-gray-600">by {art.artist}</p>
                </div>
                <span className="text-lg font-bold text-[#094129]">
                  LKR {art.price.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Medium:</span> {art.medium}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Dimensions:</span>{" "}
                  {art.dimensions}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    {art.likes} likes
                  </span>
                  <button className="flex items-center space-x-1 text-[#094129] hover:text-[#094129]/80 transition-colors">
                    <span className="text-sm font-medium">View Details</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArt.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No artworks found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
