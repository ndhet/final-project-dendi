import React, { useState, useEffect } from 'react';

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const hideCursorEffect = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseenter', updateCursorPosition);
    window.addEventListener('mouseleave', hideCursorEffect);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseenter', updateCursorPosition);
      window.removeEventListener('mouseleave', hideCursorEffect);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 pointer-events-none transition-opacity duration-100 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        width: '16px',
        height: '16px',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        boxShadow: '0 0 5px rgba(255, 255, 255, 0.9)',
        animation: 'starTwinkle 2s infinite alternate',
      }}
    ></div>
  );
};

export default CursorEffect;
