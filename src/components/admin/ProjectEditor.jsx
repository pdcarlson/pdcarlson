// src/components/admin/ProjectEditor.jsx
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

import { getMyProjects, updateProjectsOrder } from '../../lib/appwrite';
import DraggableProjectItem from './DraggableProjectItem';
import Spinner from '../Spinner';

const ProjectEditor = ({ onEditProject }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await getMyProjects();
        setProjects(fetchedProjects || []);
      } catch (e) {
        console.error("error fetching projects:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.$id === active.id);
        const newIndex = items.findIndex((item) => item.$id === over.id);
        setHasChanges(true);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updateProjectsOrder(projects);
      setHasChanges(false);
    } catch (error) {
      console.error("failed to save new project order:", error);
      alert("error: could not save order.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex-center"><Spinner /></div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <div className="projects-list">
        <SortableContext items={projects.map(p => p.$id)} strategy={verticalListSortingStrategy}>
          {projects.map((project, index) => (
            <DraggableProjectItem 
              key={project.$id} 
              project={project} 
              isReversed={index % 2 !== 0}
              onEdit={() => onEditProject(project)}
            />
          ))}
        </SortableContext>
      </div>

      {hasChanges && (
        <div className="save-order-bar">
          <p>You have unsaved changes to the project order.</p>
          <button onClick={handleSaveChanges} className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      )}
    </DndContext>
  );
};

export default ProjectEditor;