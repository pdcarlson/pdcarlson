// src/components/scrolltotop.jsx
import React from 'react';

const ScrollToTop = ({ isVisible }) => {
  // scrolls the window to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      aria-label="scroll to top"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollToTop;