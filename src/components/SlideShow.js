import React, { useState, useEffect } from 'react';

const SlideShow = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images, interval]);

  return (
    <div className="slideshow-container">
      <div className="slideshow">
        {images.map((image, index) => (
          <img
            key={index}
            className={`slideshow-image ${index === currentIndex ? 'active' : ''}`}
            src={image}
            alt="slideshow"
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
