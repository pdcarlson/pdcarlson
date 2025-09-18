import React from 'react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className={`modal-overlay ${project ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">&times;</button>
        <h2>{project.title}</h2>
        <div className="modal-body">
          <p>{project.desc}</p>
          <div className="modal-tech">
            <strong>Technologies Used:</strong>
            <p>{project.tech.join(', ')}</p>
          </div>
        </div>
        <div className="modal-footer">
          {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Live Site</a>}
          {project.codeLink && <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View Code</a>}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;