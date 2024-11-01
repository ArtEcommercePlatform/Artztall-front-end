import { Heart} from 'lucide-react';

const ProductCard = ({ 
  imageUrl = "/api/placeholder/300/300",
  title = "",
  artist = "",
  price = 0,
  isNew = false
}) => {
  return (
    <div className="relative group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden aspect-square rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-5 h-5 text-[#094129]" />
        </button>
        {isNew && (
          <span className="absolute top-3 left-3 bg-[#094129] text-white px-3 py-1 rounded-full text-sm">
            New
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {artist}</p>
        <p className="font-bold text-[#094129]">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;