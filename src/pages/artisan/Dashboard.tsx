import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Eye, 
  Heart, 
  Gavel, 
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Plus
} from 'lucide-react';

// Define interfaces for type safety
interface ArtisanStats {
  totalEarnings: number;
  pendingPayouts: number;
  activeProducts: number;
  activeAuctions: number;
  analytics: {
    totalViews: number;
    totalFavorites: number;
    totalBids: number;
    monthlyGrowth: {
      views: number;
      favorites: number;
      bids: number;
    };
  };
}

interface ArtworkAnalytics {
  artwork: string;
  image: string;
  views: number;
  favorites: number;
  bids: number;
  price: number;
}

interface CardData {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  growth: number;
  bgColor: string;
  details?: string; // Optional details to show when expanded
}

interface PerformanceMetric {
  icon: React.ReactNode;
  title: string;
  value: number;
  growth: number;
}

const ArtisanDashboard: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Mock data (replace with actual backend data)
  const artisanStats: ArtisanStats = {
    totalEarnings: 24750.50,
    pendingPayouts: 5620.75,
    activeProducts: 18,
    activeAuctions: 5,
    analytics: {
      totalViews: 4562,
      totalFavorites: 1237,
      totalBids: 87,
      monthlyGrowth: {
        views: 12.5,
        favorites: 8.3,
        bids: 15.2
      }
    }
  };

  const recentAnalytics: ArtworkAnalytics[] = [
    {
      artwork: "Sunset Landscape",
      image: "/api/placeholder/300/200",
      views: 342,
      favorites: 95,
      bids: 12,
      price: 1200
    },
    {
      artwork: "Abstract Composition",
      image: "/api/placeholder/300/200",
      views: 276,
      favorites: 67,
      bids: 5,
      price: 950
    },
    {
      artwork: "Urban Sketch",
      image: "/api/placeholder/300/200",
      views: 213,
      favorites: 43,
      bids: 3,
      price: 750
    }
  ];

  // Explicitly type the percentage parameter
  const renderGrowthIndicator = (percentage: number) => {
    return percentage > 0 ? (
      <span className="text-green-600 flex items-center ml-2">
        <ChevronUp className="w-4 h-4" />
        {percentage}%
      </span>
    ) : (
      <span className="text-red-600 flex items-center ml-2">
        <ChevronDown className="w-4 h-4" />
        {Math.abs(percentage)}%
      </span>
    );
  };

  // Use the handleCardExpand method when creating card data
  const handleCardExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Define card data with proper typing and optional details
  const cardData: CardData[] = [
    { 
      icon: <DollarSign className="text-green-600" />, 
      title: "Total Earnings", 
      value: `Rs ${artisanStats.totalEarnings.toLocaleString()}`,
      growth: artisanStats.analytics.monthlyGrowth.views,
      bgColor: "bg-green-50",
      details: `Earnings from ${artisanStats.activeProducts} active products`
    },
    { 
      icon: <DollarSign className="text-yellow-600" />, 
      title: "Pending Payouts", 
      value: `Rs ${artisanStats.pendingPayouts.toLocaleString()}`,
      growth: artisanStats.analytics.monthlyGrowth.favorites,
      bgColor: "bg-yellow-50",
      details: "Awaiting payment confirmation"
    },
    { 
      icon: <ShoppingBag className="text-blue-600" />, 
      title: "Active Products", 
      value: artisanStats.activeProducts,
      growth: artisanStats.analytics.monthlyGrowth.bids,
      bgColor: "bg-blue-50",
      details: "Currently listed artworks"
    },
    { 
      icon: <Gavel className="text-purple-600" />, 
      title: "Active Auctions", 
      value: artisanStats.activeAuctions,
      growth: artisanStats.analytics.monthlyGrowth.bids,
      bgColor: "bg-purple-50",
      details: "Ongoing art auctions"
    }
  ];

  // Define performance metrics with proper typing
  const performanceMetrics: PerformanceMetric[] = [
    { 
      icon: <Eye className="text-gray-600" />, 
      title: "Total Views", 
      value: artisanStats.analytics.totalViews,
      growth: artisanStats.analytics.monthlyGrowth.views
    },
    { 
      icon: <Heart className="text-red-600" />, 
      title: "Favorites", 
      value: artisanStats.analytics.totalFavorites,
      growth: artisanStats.analytics.monthlyGrowth.favorites
    },
    { 
      icon: <Gavel className="text-green-600" />, 
      title: "Total Bids", 
      value: artisanStats.analytics.totalBids,
      growth: artisanStats.analytics.monthlyGrowth.bids
    }
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-6 flex-grow overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 tracking-tight">Artisan Dashboard</h1>
            <p className="text-gray-600 text-sm">Insights into your creative journey</p>
          </div>
          <div className="flex space-x-4">
            <button className="
              flex items-center 
              bg-blue-600 
              text-white 
              px-4 py-2 
              rounded-lg 
              text-sm
              hover:bg-blue-700 
              transition-all 
              duration-300 
              shadow-md
            ">
              <Plus className="mr-2 w-4 h-4" />
              Add Artwork
            </button>
          </div>
        </div>

        {/* Financial and Product Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {cardData.map((card, index) => (
            <div 
              key={index} 
              className="
                bg-white 
                rounded-xl 
                shadow-md 
                p-4 
                space-y-2
                transform 
                transition-transform 
                hover:-translate-y-1
                cursor-pointer
              "
              onClick={() => handleCardExpand(index)}
            >
              <div className="flex justify-between items-center">
                <div className={`${card.bgColor} p-2 rounded-full`}>{card.icon}</div>
                {renderGrowthIndicator(card.growth)}
              </div>
              <div>
                <h3 className="text-xs text-gray-500 mb-1">{card.title}</h3>
                <p className="text-xl font-bold text-gray-800">{card.value}</p>
              </div>
              {expandedCard === index && card.details && (
                <div className="mt-2 text-xs text-gray-600 italic">
                  {card.details}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Rest of the code remains the same */}
        {/* Analytics and Artwork Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Overall Performance */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-blue-600 w-5 h-5" /> Performance Metrics
            </h2>
            <div className="space-y-3">
              {performanceMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="
                    flex 
                    items-center 
                    justify-between 
                    bg-gray-50 
                    p-3 
                    rounded-lg
                  "
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{metric.title}</p>
                      <p className="font-bold text-gray-800">{metric.value}</p>
                    </div>
                  </div>
                  {renderGrowthIndicator(metric.growth)}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Artwork Performance */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Eye className="mr-2 text-purple-600 w-5 h-5" /> Recent Artwork Performance
            </h2>
            <div className="space-y-3">
              {recentAnalytics.map((artwork, index) => (
                <div 
                  key={index} 
                  className="
                    flex 
                    items-center 
                    p-3 
                    rounded-lg 
                    hover:bg-blue-50
                    transition-colors
                  "
                >
                  <img 
                    src={artwork.image} 
                    alt={artwork.artwork} 
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm text-gray-800">{artwork.artwork}</h3>
                    <p className="text-xs text-gray-500">Price: Rs {artwork.price.toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-3 text-xs">
                    <div className="flex items-center text-gray-600">
                      <Eye className="mr-1 w-4 h-4" />
                      <span>{artwork.views}</span>
                    </div>
                    <div className="flex items-center text-red-600">
                      <Heart className="mr-1 w-4 h-4" />
                      <span>{artwork.favorites}</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <Gavel className="mr-1 w-4 h-4" />
                      <span>{artwork.bids}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;