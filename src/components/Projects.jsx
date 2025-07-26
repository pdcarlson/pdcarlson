import React from 'react';

function Projects() {
  return (
    <section className="page active" id="projects">
      <h2>projects.js</h2>
      <div className="projects-grid">

        <div className="project-card">
          <div className="project-header">
            <i className="fa-solid fa-folder-open project-icon"></i>
            <h3 className="project-title">Munsell Color Mapper</h3>
          </div>
          <p className="project-description">
            A full-stack mobile application (Python and Swift) designed to identify Munsell soil colors from a photograph, featuring complete offline functionality for field use.
          </p>
          <div className="project-tags">
            <span className="tag">Python</span>
            <span className="tag">Swift</span>
            <span className="tag">Mobile App</span>
            <span className="tag">Offline-First</span>
          </div>
        </div>

        <div className="project-card">
          <div className="project-header">
            <i className="fa-solid fa-folder-open project-icon"></i>
            <h3 className="project-title">EV Charging Site Analysis</h3>
          </div>
          <p className="project-description">
            Developed a Python tool at HackRPI 2024 to analyze geospatial data and identify optimal locations for new Electric Vehicle (EV) charging stations based on various criteria.
          </p>
          <div className="project-tags">
            <span className="tag">Python</span>
            <span className="tag">Geospatial</span>
            <span className="tag">Data Analysis</span>
            <span className="tag">Hackathon</span>
          </div>
        </div>
        
        <div className="project-card">
          <div className="project-header">
            <i className="fa-solid fa-folder-open project-icon"></i>
            <h3 className="project-title">Acne & Skincare Tracker</h3>
          </div>
          <p className="project-description">
            Currently building a mobile application using Dart and Flutter with a Firebase backend. The app will track diet, stress, sleep, and other factors to visualize their impact on acne over time.
          </p>
          <div className="project-tags">
            <span className="tag">Dart</span>
            <span className="tag">Flutter</span>
            <span className="tag">Firebase</span>
            <span className="tag">Data Visualization</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Projects;