import React from 'react';

function Projects() {
  return (
    <section className="page active" id="projects">
      <h2>projects.js</h2>
      <div className="projects-grid">

        {/* ESE MAP VIEWER */}
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

        {/* MUNSELL COLOR MAPPER */}
        <div className="project-card">
          <h3>Munsell Color Mapper</h3>
          <p className="project-description">
            The Munsell Color Mapper is a mobile app I'm developing to replace the expensive, cumbersome process of manually identifying soil color in the field. I am building a Python-based backend with custom algorithms that can analyze a photo of a soil sample and instantly find the closest Munsell color match. The final app, deployed on iOS using Swift, is being built to work offline and will eventually include a cloud database to log sample locations and images.
          </p>
          <ul className="project-tech-list">
            <li>Python</li>
            <li>Swift</li>
            <li>Mobile App</li>
          </ul>
        </div>

        {/* EV CHARGING SITE ANALYSIS */}
        <div className="project-card">
          <h3>EV Charging Site Analysis</h3>
          <p className="project-description">
            In response to the HackRPI "Urban Upgrades" challenge, my teammate and I developed a Python tool to analyze ideal placement for new EV charging stations. The goal was to find a data-driven way to maximize the impact of new infrastructure investments. Our solution processed datasets on population density and existing charger locations to produce an interactive map, providing a foundational proof-of-concept for strategic urban planning.
          </p>
          <ul className="project-tech-list">
            <li>Python</li>
            <li>Geospatial</li>
            <li>Data Analysis</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default Projects;