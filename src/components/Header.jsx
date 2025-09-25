import React from 'react';

const Header = ({ isAdminPage, onLogout, onCreateProject }) => {
  return (
    <header className="main-header">
      <div className="container">
        <a href="#" className="logo">Paul Carlson</a>
        <nav className="main-nav">
          <ul>
            {isAdminPage ? (
              <>
                <li><button onClick={onCreateProject} className="nav-button primary">+ New Project</button></li>
                <li><button onClick={onLogout} className="nav-button">Logout</button></li>
              </>
            ) : (
              <>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;