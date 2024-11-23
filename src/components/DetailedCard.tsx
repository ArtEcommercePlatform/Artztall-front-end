import React from "react";
import { ShoppingCart, Expand } from "lucide-react";

interface DetailedCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags: string[];
  medium: string;
  style: string;
  dimensions: {
    length: number;
    width: number;
    unit: string;
  };
  available: boolean;
  onBuy: (id: string) => void;
}

const CustomBadge = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "destructive";
}) => {
  const variants = {
    default: "bg-green-900 text-white",
    outline: "border border-gray-300 bg-white text-gray-700",
    destructive: "bg-red-500 text-white",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

const CustomButton = ({
  children,
  variant = "default",
  disabled = false,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  const variants = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-md font-medium transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const DetailedCard = ({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  tags,
  medium,
  style,
  dimensions,
  available,
  onBuy,
}: DetailedCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={imageUrl || "/api/placeholder/400/320"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <CustomBadge variant={available ? "default" : "destructive"}>
            {available ? "Available" : "Sold Out"}
          </CustomBadge>
        </div>
      </div>

      {/* Header */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          <span className="font-bold text-lg">
            LKR {price.toLocaleString()}
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <CustomBadge variant="outline">{category}</CustomBadge>
          <CustomBadge variant="outline">{style}</CustomBadge>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-3">
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div className="text-sm text-gray-600">
          <p>Medium: {medium}</p>
          <p>
            Size: {dimensions.length}x{dimensions.width} {dimensions.unit}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 flex gap-2">
        <CustomButton
          className="flex-1 flex bg-green-900 items-center justify-center"
          onClick={() => onBuy(id)}
          disabled={!available}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {available ? "Add to Cart" : "Sold Out"}
        </CustomButton>
        <CustomButton variant="outline" className="p-2">
          <Expand className="w-4 h-4" />
        </CustomButton>
      </div>
    </div>
  );
};

export default DetailedCard;
