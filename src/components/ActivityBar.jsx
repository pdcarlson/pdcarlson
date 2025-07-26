import React from 'react';

function ActivityBar({ activePage, setActivePage }) {
  return (
    <nav className="activity-bar">
      <ul className="nav-list">
        <li className={`nav-item ${activePage === 'about' ? 'active-nav' : ''}`} onClick={() => setActivePage('about')}>
          <i className="fa-solid fa-user"></i>
        </li>
        <li className={`nav-item ${activePage === 'projects' ? 'active-nav' : ''}`} onClick={() => setActivePage('projects')}>
          <i className="fa-solid fa-folder-open"></i>
        </li>
        <li className={`nav-item ${activePage === 'resume' ? 'active-nav' : ''}`} onClick={() => setActivePage('resume')}>
          <i className="fa-solid fa-file-lines"></i>
        </li>
        <li className={`nav-item ${activePage === 'contact' ? 'active-nav' : ''}`} onClick={() => setActivePage('contact')}>
          <i className="fa-solid fa-envelope"></i>
        </li>
      </ul>
      <ul className="social-list">
        <li className="nav-item"><a href="https://github.com/pdcarlson" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a></li>
        <li className="nav-item"><a href="https://linkedin.com/in/paul-carlson-rpi" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a></li>
      </ul>
    </nav>
  );
}

export default ActivityBar;