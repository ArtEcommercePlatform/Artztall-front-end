import React, { useState } from 'react';

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
        <div
            className="relative flex flex-col rounded-lg overflow-hidden shadow-lg bg-white transition-all duration-300 w-full h-full" // Fixed height of 96 (24rem)
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Art Image Section */}
            <div
                className={`relative overflow-hidden transition-all duration-300 ${isExpanded ? 'h-1/2' : 'h-2/3'
                    } w-full`}
            >
                <img
                    src={image}
                    alt={artName}
                    className="object-cover w-full h-full"
                />
                {isHovered && (
                    <div className="absolute top-3 right-3 bg-gray-800 text-white text-sm rounded">
                        {medium}
                    </div>
                )}
            </div>

            {/* Art Details Section */}
            <div
                className={`flex flex-col justify-around transition-all duration-300 ${isExpanded ? 'h-1/2' : 'h-1/3'
                    }`}
            >
                {/* Basic Info */}
                <div className="space-y-1 pl-1">
                    <h3 className="text-[4vmin] font-semibold">{artName}</h3>
                    <p className="text-[3vmin] text-gray-600">{artistName}</p>
                    {/* Additional Details for Expanded View */}
                    {isExpanded && (
                        <div className="space-y-1 text-[2vmin] text-gray-700">
                            <p><strong>Framed:</strong> {framed}</p>
                            <p><strong>Orientation:</strong> {orientation}</p>
                            <p><strong>Style:</strong> {artStyle}</p>
                        </div>
                    )}
                    <p className="text-[3vmin] font-bold text-gray-800">{price}</p>
                </div>



                {/* Expand/Collapse Arrow */}
                <button
                    onClick={toggleExpand}
                    className="absolute bottom-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    <span className="material-icons">
                        {isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ArtCard;
