import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  // Array of images to cycle through
  const images = [
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      alt: "People collaborating and having fun"
    },
    {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      alt: "Modern shopping and technology"
    },
    {
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1526&q=80",
      alt: "Team working together"
    },
    {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      alt: "Business meeting and collaboration"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="relative overflow-hidden bg-gradient-to-br ">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300 rounded-full opacity-15 translate-x-32 translate-y-32"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col lg:flex-row items-center justify-between py-10 lg:py-14">
          
          {/* Left Content */}
          <div className="flex-1 max-w-xl lg:max-w-2xl text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#5D0599] leading-tight mb-6">
              Buy, sell and find{' '}
              <span className="block text-[#5D0599] " >just about anything.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-black leading-relaxed mb-8 max-w-2xl ">
              Buy and sell everything from used cars to mobile phones and computers, 
              or search for property and more all over the world!
            </p>
            
            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                Learn More
              </button>
            </div> */}
          </div>
          
          {/* Right Image */}
          <div className="flex-1 max-w-lg lg:max-w-xl">
            <div className="relative">
              {/* Image container with smooth sliding carousel */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-80 lg:h-96">
                  {/* Sliding container */}
                  <div 
                    className="flex transition-transform duration-1000 ease-in-out h-full"
                    style={{
                      transform: `translateX(-${currentImageIndex * (100 / images.length)}%)`,
                      width: `${images.length * 100}%`
                    }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="h-full flex-shrink-0"
                        style={{ width: `${100 / images.length}%` }}
                      >
                        <img 
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Overlay gradient for better text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-110 shadow-lg' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFD500] rounded-full opacity-80 animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-[#5D0599] rounded-full opacity-70 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}