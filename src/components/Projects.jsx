import React, { useState, useEffect } from 'react';
import { getMyProjects } from '../lib/appwrite';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

const Projects = ({ onProjectClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMyProjects = async () => {
      try {
        const myProjects = await getMyProjects();
        if (myProjects) {
          setProjects(myProjects);
        } else {
          throw new Error("No projects found.");
        }
      } catch (e) {
        console.error("Error fetching projects:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadMyProjects();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center"><Spinner /></div>;
    }

    if (error) {
      return <p className="text-center text-muted-purple">Could not load projects. Please try again later.</p>;
    }

    if (projects.length === 0) {
      return <p className="text-center text-muted-purple">There are no projects to display at this time.</p>;
    }

    return (
      // updated to use tailwind grid classes
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <section id="projects" className="bg-light-lavender py-24">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-4xl font-bold text-eggplant reveal">My Recent Projects</h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default Projects;