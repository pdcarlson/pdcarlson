// src/components/footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        {/* social links section */}
        <div className="social-links">
          <a href="https://github.com/pdcarlson" target="_blank" rel="noopener noreferrer" aria-label="github">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/paul-carlson-rpi" target="_blank" rel="noopener noreferrer" aria-label="linkedin">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Paul Carlson. Built from scratch with ☕.</p>
      </div>
    </footer>
  );
};

export default Footer;