import React, { useState } from "react";

// Define the props that the component will accept
interface ArtCardProps {
  image: string;
  artName: string;
  artistName: string;
  price: string;
  medium: string;
  framed: string;
  orientation: string;
  artStyle: string;
}

const ArtCard: React.FC<ArtCardProps> = ({
  image,
  artName,
  artistName,
  price,
  medium,
  framed,
  orientation,
  artStyle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle expand/collapse on arrow click
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative flex flex-col rounded-lg overflow-hidden shadow-lg bg-[#094129] text-white transition-all duration-300 w-full h-full">
      {/* Art Image Section */}
      <div
        className={`relative overflow-hidden transition-all duration-300 ${isExpanded ? "h-1/2" : "h-3/4"} w-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={image}
          alt={artName}
          className={`object-cover w-full h-full transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
        />

        {isHovered && (
          <div>
            <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-black opacity-60 via-transparent to-transparent transition-opacity duration-300 pointer-events-none" />
            <div className="absolute top-3 right-3 text-white text-[2.5vmin] font-semibold transition-opacity duration-300 opacity-100">
              {medium}
            </div>
          </div>
        )}
      </div>

      {/* Art Details Section */}
      <div
        className={`flex flex-col justify-around transition-all duration-300 ${
          isExpanded ? "h-1/2" : "h-1/4"
        }`}
      >
        {/* Basic Info */}
        <div className="px-2">
          <h3 className="text-[2.5vmin] font-semibold">{artName}</h3>
          <hr className="my-1 border-gray-500"></hr>
          {/* Additional Details for Expanded View */}
          {isExpanded && (
            <div className="space-y-1 text-[2vmin] text-white">
              <p className="pt-1">
                <strong>Artist:</strong> {artistName}
              </p>
              <p>
                <strong>Framed:</strong> {framed}
              </p>
              <p>
                <strong>Orientation:</strong> {orientation}
              </p>
              <p className="pb-1">
                <strong>Style:</strong> {artStyle}
              </p>
              <hr className="my-1 border-gray-500"></hr>
            </div>
          )}
          <p className="text-[3vmin] font-bold text-white">{price}</p>
        </div>

        {/* Expand/Collapse Arrow */}
        <button
          onClick={toggleExpand}
          className="absolute bottom-0.5 right-3 text-white hover:text-gray-200"
        >
          <span className="material-icons">
            {isExpanded ? "keyboard_arrow_down" : "keyboard_arrow_up"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ArtCard;
