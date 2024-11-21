import React, { useState } from "react";
import { Heart, Zap } from "lucide-react";
const products = [
  {
    id: 1,
    name: "Abstract Canvas Art",
    artist: "Elena Rodriguez",
    price: 299.99,
    description: "Vibrant abstract painting capturing emotion and movement.",
    imageUrl: "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Modern", "Abstract", "Canvas"],
    inStock: true
  },
  {
    id: 2,
    name: "Landscape Oil Painting",
    artist: "Michael Chen",
    price: 450.0,
    description: "Serene mountain landscape with intricate oil techniques.",
    imageUrl: "https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Landscape", "Oil Painting", "Nature"],
    inStock: true
  },
  {
    id: 3,
    name: "Digital Art Print",
    artist: "Sophia Kim",
    price: 129.99,
    description: "Minimalist digital art print with geometric designs.",
    imageUrl: "https://images.pexels.com/photos/11105651/pexels-photo-11105651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Digital", "Modern", "Minimalist"],
    inStock: false
  },
  {
    id: 4,
    name: "Portrait Sketch",
    artist: "Daniel White",
    price: 99.99,
    description: "Detailed hand-drawn portrait sketch with shading.",
    imageUrl: "https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Portrait", "Sketch", "Hand-drawn"],
    inStock: true
  },
  {
    id: 5,
    name: "Watercolor Sunset",
    artist: "Amara Singh",
    price: 189.99,
    description: "Soothing watercolor painting of a sunset on the beach.",
    imageUrl: "https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Watercolor", "Sunset", "Beach"],
    inStock: false
  },
  {
    id: 6,
    name: "Vintage Poster Print",
    artist: "Jack Thompson",
    price: 79.99,
    description: "Retro-inspired poster print for home decor.",
    imageUrl: "https://images.pexels.com/photos/331986/pexels-photo-331986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Vintage", "Poster", "Retro"],
    inStock: true
  },
  {
    id: 7,
    name: "Abstract Sculpture",
    artist: "Marie Dupont",
    price: 1200.0,
    description: "Modern abstract sculpture in polished metal.",
    imageUrl: "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Sculpture", "Modern", "Metal"],
    inStock: true
  },
  {
    id: 8,
    name: "Nature Photography Print",
    artist: "Liam Park",
    price: 49.99,
    description: "High-resolution print of a forest in autumn.",
    imageUrl: "https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Photography", "Nature", "Print"],
    inStock: true
  },
  {
    id: 9,
    name: "Ceramic Vase",
    artist: "Aya Tanaka",
    price: 239.99,
    description: "Handcrafted ceramic vase with intricate patterns.",
    imageUrl: "https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Ceramic", "Handmade", "Decor"],
    inStock: false
  },
  {
    id: 10,
    name: "Pop Art Canvas",
    artist: "Victor Brown",
    price: 329.99,
    description: "Bold and vibrant pop art canvas featuring iconic imagery.",
    imageUrl: "https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Pop Art", "Bold", "Canvas"],
    inStock: true
  }
];

const ProductCard = ({ product, onViewDetails }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="relative overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl">
      <button
        onClick={handleWishlist}
        className={`absolute top-4 right-4 z-10 ${
          isWishlisted ? "text-red-500 hover:text-red-600" : "text-gray-300 hover:text-gray-500"
        } transition-colors`}
      >
        <Heart size={24} fill={isWishlisted ? "currentColor" : "transparent"} />
      </button>

      <div className="w-full overflow-hidden h-30">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover object-center w-full h-full cursor-pointer"
          onClick={() => onViewDetails(product)}
        />
      </div>

      <div className="p-6 pt-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-800">{product.name}</h2>
          <span className="text-sm font-semibold text-indigo-600">${product.price.toFixed(2)}</span>
        </div>

        <p className="mb-2 text-sm text-gray-600">By {product.artist}</p>

        <div className="flex items-center mb-4">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 mr-2 text-xs text-gray-600 bg-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            className={`flex-1 flex items-center justify-center rounded-lg transition-all duration-300 ${
              product.inStock
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
          <button
            className={`flex-1 flex items-center justify-center py-1 rounded-lg transition-all duration-300 ${
              product.inStock
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!product.inStock}
          >
           
            Buy Now
          </button>
        </div>

        {!product.inStock && (
          <div className="mt-1 text-sm text-center text-red-500">Out of Stock</div>
        )}
      </div>
    </div>
  );
};

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 max-w-3xl p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between"> 
        
        <div>

        </div>
        <button
          onClick={onClose}
          className="text-gray-400 top-4 hover:text-gray-600"
        >
          ✖
        </button>
        </div>
       
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 text-lg text-indigo-600">${product.price.toFixed(2)}</p>
            <p className="mt-4 text-sm text-gray-600">
              Artist: <span className="font-medium">{product.artist}</span>
            </p>
            <p className="text-sm text-gray-600">In Stock: {product.inStock ? "Yes" : "No"}</p>
            <div className="flex mt-2 space-x-3">
              <button className="flex-1 px-2 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Add to Cart
              </button>
              <button className="flex-1 px-2 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">Customer Reviews</h3>
          <ul className="space-y-4">
            {/* Mocked Reviews */}
            <li className="pb-4 border-b">
              <p className="text-sm text-gray-700">
                <span className="font-bold">John Doe:</span> "Amazing quality! Highly recommend."
              </p>
            </li>
            <li className="pb-4 border-b">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Jane Smith:</span> "Beautiful artwork, quick delivery!"
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <h1 className="mb-4 text-4xl font-bold text-center text-green-800 ">
          Discover Unique Artworks
        </h1>
        <input
          type="text"
          placeholder="Search by name or artist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 mb-6 border border-green-800 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductPage;
