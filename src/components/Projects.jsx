import React, { useState, useEffect } from 'react';
import { getMyProjects } from '../lib/appwrite';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

const Projects = ({ onProjectClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadMyProjects = async () => {
      try {
        const myProjects = await getMyProjects();
        setProjects(myProjects);
      } catch (e) {
        console.error("Error fetching projects:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadMyProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title reveal">My Recent Projects</h2>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard 
                key={project.$id} 
                project={project} 
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;