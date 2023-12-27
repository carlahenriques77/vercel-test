import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Update dimensions on mount
    updateDimensions();

    // Update dimensions on window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const updateDimensions = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  return (
    <div className='fixed top-0 left-0 z-10'>
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={200}
      />
    </div>
  );
};

export default ConfettiComponent;
