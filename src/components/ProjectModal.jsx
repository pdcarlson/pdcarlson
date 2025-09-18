// src/components/projectmodal.jsx
import React from 'react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">&times;</button>
        
        <h2 className="modal-title">{project.title}</h2>

        <div className="modal-body-grid">
          <div className="modal-left-column">
            {project.imageUrl && (
              <div className="modal-image-container">
                <img src={project.imageUrl} alt={`${project.title} screenshot`} />
              </div>
            )}
            <div className="modal-tech">
              <strong>Technologies Used:</strong>
              <ul className="modal-tech-list">
                {project.tech.map((techItem, index) => (
                  <li key={index}>{techItem}</li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              {/* capitalized button text */}
              {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Live Site</a>}
              {project.codeLink && <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View Code</a>}
            </div>
          </div>

          <div className="modal-right-column">
            <p>{project.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;