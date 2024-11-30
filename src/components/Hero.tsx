import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  // State for fade-in animation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-emerald-900 overflow-hidden">
      {/* Background image with zoom effect */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-500 hover:scale-105"
        style={{
          backgroundImage:
            "url('https://c0.wallpaperflare.com/preview/807/214/326/4k-wallpaper-abstract-expressionism-abstract-painting-acrylic-paint.jpg')",
        }}
      >
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative px-4 py-32 mx-auto text-center max-w-7xl sm:px-6 lg:py-48"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="mb-8 text-5xl font-bold tracking-tight text-white lg:text-7xl drop-shadow-lg">
          Discover Unique Artworks
        </h1>

        <p className="max-w-3xl mx-auto mb-12 text-xl lg:text-2xl text-white/90 drop-shadow-md">
          Support independent artists and find your perfect piece that speaks to
          your soul.
        </p>

        <motion.div
          className="space-x-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <Link to="/shop">
            <button className="px-8 py-4 text-lg font-semibold transition-transform duration-200 transform bg-white rounded-full text-emerald-900 hover:scale-105 hover:shadow-lg">
              Shop Now
            </button>
          </Link>

          <button className="px-8 py-4 text-lg font-semibold text-white transition-transform duration-200 transform border-2 border-white rounded-full hover:scale-105 hover:bg-white/10">
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
