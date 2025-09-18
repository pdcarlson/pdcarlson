import React from 'react';

const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <a href="#" className="logo">Paul Carlson</a>
        <nav className="main-nav">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;