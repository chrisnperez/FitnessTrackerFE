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
    <div>
      <img src={images[currentIndex]} alt="slideshow" />
    </div>
  );
};

export default SlideShow;