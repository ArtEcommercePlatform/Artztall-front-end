import React, { useState, useEffect } from 'react';
import logo1 from '../assets/images/ima2.jpg';
import logo2 from '../assets/images/logo3.jpg';
import logo3 from '../assets/images/logo4.jpg';
import slide from '../assets/images/slide.webp';

const Slider = () => {
  const [carouselData] = useState([
    { id: 1, src: logo1, alt: 'Slide 1', details: 'This is the first slide.' },
    { id: 2, src: logo2, alt: 'Slide 2', details: 'This is the second slide.' },
    { id: 3, src: logo3, alt: 'Slide 3', details: 'This is the third slide.' },
    { id: 4, src: logo1, alt: 'Slide 4', details: 'This is the fourth slide.' },
    { id: 5, src: logo2, alt: 'Slide 5', details: 'This is the fifth slide.' },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  const getPreviousIndex = () => (currentIndex - 1 + carouselData.length) % carouselData.length;
  const getNextIndex = () => (currentIndex + 1) % carouselData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <div
      className="relative flex items-center justify-center w-full h-screen"
      style={{
        backgroundImage: `url(${slide})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative w-full max-w-6xl px-1">
        {/* Previous Preview */}
        <div className="absolute z-10 w-32 h-24 -ml-20 -translate-y-1/2 left-14 opacity-80 top-1/2">
          <img
            src={carouselData[getPreviousIndex()].src}
            alt="Previous slide"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Main Slider */}
        <div className="relative w-4/5 mx-auto rounded-3xl border-black-500 aspect-video border-spacing-48">
          {carouselData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="object-cover w-full h-full rounded-3xl"
              />
              {/* Slide Details */}
              <div className="absolute px-4 py-2 -translate-x-1/2 rounded-md bottom-16 left-1/2 bg-black/50">
                <p className="text-white">{slide.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Preview */}
        <div className="absolute z-10 w-32 h-24 -mr-20 -translate-y-1/2 right-14 opacity-80 top-1/2">
          <img
            src={carouselData[getNextIndex()].src}
            alt="Next slide"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute z-20 flex items-center justify-center w-10 h-10 transition-colors -translate-y-1/2 rounded-full bg-cyan-500 left-4 top-1/2 hover:bg-cyan-800"
          aria-label="Previous slide"
        >
          <div className="flex items-center justify-center w-6 h-6">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </button>

        <button
          onClick={nextSlide}
          className="absolute z-20 flex items-center justify-center w-10 h-10 transition-colors -translate-y-1/2 rounded-full bg-cyan-500 right-4 top-1/2 hover:bg-white/50"
          aria-label="Next slide"
        >
          <div className="flex items-center justify-center w-6 h-6">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>

        {/* Dots Navigation */}
        <div className="absolute flex space-x-2 -translate-x-1/2 bottom-4 left-1/2">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
