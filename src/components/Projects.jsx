// src/components/projects.jsx
import React, { useState, useEffect } from 'react';
import { getMyProjects } from '../lib/appwrite';
import ProjectItem from './ProjectItem'; // import the new item component
import Spinner from './Spinner';

const Projects = ({ onProjectClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMyProjects = async () => {
      try {
        const myProjects = await getMyProjects();
        setProjects(myProjects || []);
      } catch (e) {
        console.error("error fetching projects:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadMyProjects();
  }, []);

  useEffect(() => {
    // sets up the intersection observer for the reveal animation
    if (!isLoading && projects.length > 0) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      const revealElements = document.querySelectorAll('.project-item.reveal');
      revealElements.forEach(el => revealObserver.observe(el));

      return () => revealElements.forEach(el => revealObserver.unobserve(el));
    }
  }, [projects, isLoading]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center"><Spinner /></div>;
    }
    if (error) {
      return <p style={{ textAlign: 'center' }}>could not load projects. please try again later.</p>;
    }
    if (projects.length === 0) {
      return <p style={{ textAlign: 'center' }}>there are no projects to display at this time.</p>;
    }
    return (
      <div className="projects-list">
        {projects.map((project, index) => (
          <ProjectItem
            key={project.$id}
            project={project}
            onClick={() => onProjectClick(project)}
            // reverses the layout for every other project
            isReversed={index % 2 !== 0}
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