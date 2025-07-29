import React, { useState, useEffect } from 'react';
import { getMyProjects } from '../lib/appwrite';
import ProjectCard from './ProjectCard';


function Projects() {
  const [projects, setProjects] = useState([]);

  const loadMyProjects = async () => {
    try {
      const myProjects = await getMyProjects();
      setProjects(myProjects);
    } catch (e) {
      console.log(`Error fetching projects: ${e}`);
    }
  }

  useEffect(() => {
    loadMyProjects();
  }, [])
  

  return (
    <section className="page active" id="projects">
      <h2>projects.js</h2>
      {/* iterate over projects and pass project as prop into ProjectCard component */}
      {projects.length > 0 && (
        <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      )}
    </section>
  );
}

export default Projects;