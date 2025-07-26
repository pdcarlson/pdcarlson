import React from 'react';

// Note: We've added `activePage` to the props
function Sidebar({ activePage, setActivePage }) {
  const handleFileClick = (page) => {
    setActivePage(page);
  };

  return (
    <aside className="sidebar">
      <div className="file-explorer">
        <p className="explorer-title">EXPLORER</p>
        <ul className="file-list">
          {/* check which page is active and add the active class */}
          <li className={`file-item ${activePage === 'about' ? 'active' : ''}`} onClick={() => handleFileClick('about')}>about.md</li>
          <li className={`file-item ${activePage === 'projects' ? 'active' : ''}`} onClick={() => handleFileClick('projects')}>projects.js</li>
          <li className={`file-item ${activePage === 'resume' ? 'active' : ''}`} onClick={() => handleFileClick('resume')}>resume.txt</li>
          <li className={`file-item ${activePage === 'contact' ? 'active' : ''}`} onClick={() => handleFileClick('contact')}>contact.css</li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;