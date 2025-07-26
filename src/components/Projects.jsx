import React from 'react';

function Projects() {
  return (
    <section className="page active" id="projects">
      <h2>projects.js</h2>
      <div className="projects-grid">

        <div className="project-card">
          <h3>Munsell Color Mapper</h3>
          <p className="project-description">
            A full-stack mobile application (Python and Swift) designed to identify Munsell soil colors from a photograph, featuring complete offline functionality for field use.
          </p>
          <ul className="project-tech-list">
            <li>Python</li>
            <li>Swift</li>
            <li>Mobile App</li>
          </ul>
          <a href="#" className="project-link" target="_blank" rel="noopener noreferrer">
            View Code &rarr;
          </a>
        </div>

        <div className="project-card">
          <h3>EV Charging Site Analysis</h3>
          <p className="project-description">
            Developed a Python tool at HackRPI 2024 to analyze geospatial data and identify optimal locations for new Electric Vehicle (EV) charging stations based on various criteria.
          </p>
          <ul className="project-tech-list">
            <li>Python</li>
            <li>Geospatial</li>
            <li>Data Analysis</li>
          </ul>
          <a href="#" className="project-link" target="_blank" rel="noopener noreferrer">
            View Code &rarr;
          </a>
        </div>
        
        <div className="project-card">
          <h3>Interactive Web Map</h3>
          <p className="project-description">
            This project involved a complete overhaul of a legacy web map system used by 9 different towns. I re-architected the front-end, migrating the code to a clean, centralized GitHub repository to make updates instant and consistent. Beyond this modernization, I developed a suite of professional-grade features to transform the tool for power users. Key additions include a dynamic legend that only shows visible map items, a robust bookmarking system, and an advanced, multi-page printing utility. This print feature allows users to generate custom reports with specific layer combinations and save their company information, a core component designed for future monetization.
          </p>
          <ul className="project-tech-list">
            <li>HTML/CSS</li>
            <li>JavaScript</li>
            <li>Mapbox</li>
            <li>QGIS</li>
          </ul>
          <a href="https://github.com/East-SouthEast-LLC/ese-map-viewer" className="project-link" target="_blank" rel="noopener noreferrer">
            View Code &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}

export default Projects;