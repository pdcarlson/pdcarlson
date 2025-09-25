// src/components/admin/DraggableProjectItem.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableProjectItem = ({ project, isReversed }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.$id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 'auto',
    position: 'relative',
    cursor: 'grab', // add a grab cursor to the whole card
  };
  
  const itemClassName = `project-item ${isReversed ? 'reverse' : ''}`;

  return (
    // move the listeners up to this div and add the attributes
    <div ref={setNodeRef} style={style} className="draggable-item-card" {...attributes} {...listeners}>
      
      {/* this div is now removed */}
      {/*
      <div className="drag-handle" {...attributes} {...listeners}>
        <i className="fas fa-grip-vertical"></i>
      </div>
      */}
      
      <div className={itemClassName}>
        {project.imageUrl && (
          <div className="project-item-image">
            <img src={project.imageUrl} alt={`${project.title} screenshot`} />
          </div>
        )}

        <div className="project-item-content">
          <h3>{project.title}</h3>
          <p>{project.shortDesc}</p>
          <ul className="tech-list">
            {project.tech.map((techItem, index) => (
              <li key={index}>{techItem}</li>
            ))}
          </ul>
          <button className="btn btn-secondary" disabled>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraggableProjectItem;