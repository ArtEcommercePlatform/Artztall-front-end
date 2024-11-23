import { useState, useEffect } from "react";
import { Star, Phone, Mail, CheckCircle, Loader2 } from "lucide-react";
import { apiClient } from "../services/apiClient";
import Header from "../components/Header";

interface Artist {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  bio: string;
  artworkCategories: string[];
  averageRating: number;
  totalSales: number;
  verified: boolean;
}

interface PaginationResponse {
  content: Artist[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

const CustomButton = ({
  children,
  onClick,
  disabled = false,
  active = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-4 py-2 rounded-lg font-medium transition-all duration-200
      ${
        active
          ? "bg-green-900 text-white hover:bg-green-800"
          : "bg-white text-green-900 border border-green-900 hover:bg-green-50"
      }
      disabled:opacity-50 disabled:cursor-not-allowed
    `}
  >
    {children}
  </button>
);

const CustomCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CustomBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-900 font-medium">
    {children}
  </span>
);

const ArtistMain = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 10;

  const fetchArtists = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<PaginationResponse>(
        "/users/artisans",
        {
          page,
          size: pageSize,
          sort: "string",
        },
      );

      setArtists(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to fetch artists");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists(currentPage);
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-green-900 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <CustomCard className="bg-red-50 border border-red-200">
          <div className="p-6">
            <p className="text-center text-red-700">{error}</p>
          </div>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-green-900 py-12 px-4 mb-8">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Our Featured Artists
        </h1>
        <p className="text-center text-green-100">
          Discover unique talent and exceptional artwork
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {artists.map((artist) => (
            <CustomCard
              key={artist.id}
              className="transition-all duration-300 hover:shadow-xl"
            >
              <div className="border-b bg-green-50 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                    {artist.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-green-900 truncate">
                        {artist.name}
                      </h2>
                      {artist.verified && (
                        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {artist.bio}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 hover:text-green-900 transition-colors">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">{artist.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 hover:text-green-900 transition-colors">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">
                      {artist.phoneNumber}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.artworkCategories.map((category) => (
                      <CustomBadge key={category}>{category}</CustomBadge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-green-900">
                        Rating
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">
                      {artist.averageRating.toFixed(1)}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <span className="text-sm font-semibold text-green-900 block mb-1">
                      Sales
                    </span>
                    <p className="text-2xl font-bold text-green-900">
                      {artist.totalSales.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CustomCard>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-12 mb-8">
          <CustomButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </CustomButton>

          {[...Array(totalPages)].map((_, index) => (
            <CustomButton
              key={index}
              onClick={() => setCurrentPage(index)}
              active={currentPage === index}
            >
              {index + 1}
            </CustomButton>
          ))}

          <CustomButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ArtistMain;
