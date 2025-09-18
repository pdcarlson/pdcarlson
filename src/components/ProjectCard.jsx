import React from 'react';

const ProjectCard = ({ project, onClick }) => {
  // debug: check if the onClick prop is being received
  console.log(`ProjectCard for "${project.title}": Received onClick prop:`, onClick);

  return (
    <div 
      className="project-card reveal" 
      onClick={() => {
        // debug: confirm the div itself is being clicked
        console.log(`ProjectCard for "${project.title}": Div clicked!`);
        onClick(); // execute the function passed in props
      }}
    >
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