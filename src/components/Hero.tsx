

const Hero = () => (
  <div className="relative flex items-center justify-center min-h-screen bg-emerald-900">
    {/* Background image with fallback */}
    <div 
      className="absolute inset-0 bg-center bg-cover"
      style={{ 
        backgroundImage: "url('/api/placeholder/1920/1080')",
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>

    {/* Content */}
    <div className="relative px-4 py-32 mx-auto text-center max-w-7xl sm:px-6 lg:py-48">
      <h1 className="mb-8 text-5xl font-bold tracking-tight text-white lg:text-7xl">
        Discover Unique Artworks
      </h1>
      
      
      <p className="max-w-3xl mx-auto mb-12 text-xl lg:text-2xl text-white/90">
        Support independent artists and find your perfect piece that speaks to your soul
      </p>
      
      <div className="space-x-4">
        <button className="px-8 py-4 text-lg font-semibold transition-transform duration-200 transform bg-white rounded-full text-emerald-900 hover:scale-105 hover:shadow-lg">
          Shop Now
        </button>
        
        <button className="px-8 py-4 text-lg font-semibold text-white transition-transform duration-200 transform border-2 border-white rounded-full hover:scale-105 hover:bg-white/10">
          Learn More
        </button>
      </div>
    </div>
  </div>
);

export default Hero;