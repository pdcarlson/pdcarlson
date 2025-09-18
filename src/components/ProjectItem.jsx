// src/components/projectitem.jsx
import React from 'react';

const ProjectItem = ({ project, onClick, isReversed }) => {
  // conditionally adds classes based on whether an image exists or if the layout is reversed
  const itemClassName = `project-item reveal ${isReversed ? 'reverse' : ''} ${!project.imageUrl ? 'no-image' : ''}`;

  return (
    <div className={itemClassName}>
      {/* conditionally render the image container */}
      {project.imageUrl && (
        <div className="project-item-image">
          <img src={project.imageUrl} alt={`${project.title} screenshot`} />
        </div>
      )}

      {/* project description and details */}
      <div className="project-item-content">
        <h3>{project.title}</h3>
        <p>{project.shortDesc}</p>
        <ul className="tech-list">
          {project.tech.map((techItem, index) => (
            <li key={index}>{techItem}</li>
          ))}
        </ul>
        <button onClick={onClick} className="btn btn-secondary">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ProjectItem;