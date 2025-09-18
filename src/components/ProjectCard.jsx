import React from 'react';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card reveal" onClick={onClick}>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <ul className="tech-list">
          {project.tech.map((techItem, index) => (
            <li key={index}>{techItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;