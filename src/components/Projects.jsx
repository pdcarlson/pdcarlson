import React, { useState, useEffect } from 'react';
import { getMyProjects } from '../lib/appwrite';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

const Projects = ({ onProjectClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null); // new state to track errors

  useEffect(() => {
    const loadMyProjects = async () => {
      try {
        const myProjects = await getMyProjects();
        if (myProjects) {
          setProjects(myProjects);
        } else {
          // handle cases where the fetch returns nothing
          throw new Error("No projects found.");
        }
      } catch (e) {
        console.error("Error fetching projects:", e);
        setError(e.message); // set the error message
      } finally {
        setIsLoading(false);
      }
    };
    loadMyProjects();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner />
        </div>
      );
    }

    if (error) {
      return <p style={{ textAlign: 'center' }}>Could not load projects. Please try again later.</p>;
    }

    if (projects.length === 0) {
      return <p style={{ textAlign: 'center' }}>There are no projects to display at this time.</p>;
    }

    return (
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard 
            key={project.$id} 
            project={project} 
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title reveal">My Recent Projects</h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default Projects;