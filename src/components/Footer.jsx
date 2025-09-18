import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Paul Carlson. Built from scratch with ☕.</p>
      </div>
    </footer>
  );
};

export default Footer;