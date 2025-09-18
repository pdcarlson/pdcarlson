import React, { useState, useEffect } from 'react';
import { getMyProjects } from '../lib/appwrite';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

const Projects = ({ onProjectClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  // this useEffect fetches the data
  useEffect(() => {
    const loadMyProjects = async () => {
      try {
        const myProjects = await getMyProjects();
        setProjects(myProjects || []);
      } catch (e) {
        console.error("Error fetching projects:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadMyProjects();
  }, []);

  // this new useEffect handles the animations *after* projects are loaded
  useEffect(() => {
    if (!isLoading && projects.length > 0) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      const revealElements = document.querySelectorAll('.project-card.reveal');
      revealElements.forEach(el => revealObserver.observe(el));

      return () => revealElements.forEach(el => revealObserver.unobserve(el));
    }
  }, [projects, isLoading]); // runs when projects or loading state changes

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center"><Spinner /></div>;
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