import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Sample images (replace with your actual images)
const images = [
  '/images/carousel-1.jpg', 
  '/images/carousel-2.jpg', 
  '/images/carousel-3.jpg',
];

const CarouselContainer = styled.div`
  position: relative;
  max-width: 100%;
  height: 400px; /* Set a fixed height for a rectangular view */
  overflow: hidden;
  margin: 20px; /* Margin around the carousel */
  border: 1px solid white; /* Optional: Border for better visibility */
`;

const Image = styled.img`
  width: 800px; /* Set a fixed width */
  height: 400px; /* Set a fixed height */
  object-fit: cover; /* Maintain aspect ratio and cover the area */
  display: block;
  transition: opacity 0.5s ease-in-out;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  ${(props) => (props.direction === 'left' ? 'left: 20px;' : 'right: 20px;')}
`;

const Dots = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? 'white' : 'rgba(255, 255, 255, 0.5)')};
  cursor: pointer;
`;

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Automatically change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <CarouselContainer>
      <Arrow direction="left" onClick={goToPrevImage}>
        &#8592;
      </Arrow>
      <Image src={images[currentIndex]} alt="Animal Spa" />
      <Arrow direction="right" onClick={goToNextImage}>
        &#8594;
      </Arrow>

      <Dots>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Dots>
    </CarouselContainer>
  );
};

export default ImageCarousel;



