// src/components/admin/DraggableProjectItem.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ProjectItem from '../ProjectItem';

const DraggableProjectItem = ({ project, isReversed }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.$id });

  // we will apply z-index and position only when an item is being dragged
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 'auto', // use 'auto' when not dragging
    position: 'relative', // position is needed for z-index to work
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="drag-handle" {...attributes} {...listeners}>
        <i className="fas fa-grip-vertical"></i>
      </div>
      <ProjectItem project={project} isReversed={isReversed} onClick={() => alert("please use the main admin controls to edit projects.")}/>
    </div>
  );
};

export default DraggableProjectItem;