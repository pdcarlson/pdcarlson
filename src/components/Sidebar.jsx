import React from 'react';

function Sidebar({ setActivePage }) {
  const handleFileClick = (page) => {
    setActivePage(page);
  };

  return (
    <aside className="sidebar">
      <div className="file-explorer">
        <p className="explorer-title">EXPLORER</p>
        <ul className="file-list">
          <li className="file-item" onClick={() => handleFileClick('about')}>about.md</li>
          <li className="file-item" onClick={() => handleFileClick('projects')}>projects.js</li>
          <li className="file-item" onClick={() => handleFileClick('resume')}>resume.txt</li>
          <li className="file-item" onClick={() => handleFileClick('contact')}>contact.css</li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;