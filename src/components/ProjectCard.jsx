import React from 'react'

const ProjectCard = ({project : 
    { title, desc, tech, liveLink, codeLink}} ) => {
  return (
        <div className="project-card">
          <h3>{title}</h3>
          <p className="project-description">{desc}</p>
          <ul className="project-tech-list">
            {tech.map((techItem, index) => (
              <li key={index} className="project-tech-item">{techItem}</li>
            ))}
          </ul>
          <div className="project-card-footer">
            <a href={liveLink} className="project-link-button" target="_blank" rel="noopener noreferrer">
              View Live
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <a href={codeLink} className="project-link-button" target="_blank" rel="noopener noreferrer">
              View Code
              <i className="fa-solid fa-code"></i>
            </a>
          </div>
        </div>
  )
}

export default ProjectCard