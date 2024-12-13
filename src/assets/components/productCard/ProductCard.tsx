import React from "react";
import { Heart } from "lucide-react";

const ProductCard = ({
  imageUrl = "/api/placeholder/300/300",
  title = "",
  artist = "",
  price = 0,
  isNew = false,
}) => {
  return (
    <div className="relative transition-all duration-300 bg-white rounded-lg shadow-md group hover:shadow-xl">
      <div className="relative overflow-hidden rounded-t-lg aspect-square">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <button className="absolute p-2 transition-opacity bg-white rounded-full opacity-0 top-3 right-3 group-hover:opacity-100">
          <Heart className="w-5 h-5 text-[#094129]" />
        </button>
        {isNew && (
          <span className="absolute top-3 left-3 bg-[#094129] text-white px-3 py-1 rounded-full text-sm">
            New
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        <p className="mb-2 text-sm text-gray-600">by {artist}</p>
        <p className="font-bold text-[#094129]">LKR {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
