

const Hero = () => (
  <div className="relative min-h-screen flex items-center justify-center bg-emerald-900">
    {/* Background image with fallback */}
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ 
        backgroundImage: "url('/api/placeholder/1920/1080')",
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>

    {/* Content */}
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32 lg:py-48 text-center">
      <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white tracking-tight">
        Discover Unique Artworks
      </h1>
      
      <p className="text-xl lg:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
        Support independent artists and find your perfect piece that speaks to your soul
      </p>
      
      <div className="space-x-4">
        <button className="bg-white text-emerald-900 px-8 py-4 rounded-full font-semibold text-lg 
          transform transition-transform duration-200 hover:scale-105 hover:shadow-lg">
          Shop Now
        </button>
        
        <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg 
          transform transition-transform duration-200 hover:scale-105 hover:bg-white/10">
          Learn More
        </button>
      </div>
    </div>
  </div>
);

export default Hero;