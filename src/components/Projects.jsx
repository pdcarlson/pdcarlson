import React, { useState, useEffect } from 'react';
import { getMyProjects } from '../lib/appwrite';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';


function Projects() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const loadMyProjects = async () => {
    setIsLoading(true);
    try {
      const myProjects = await getMyProjects();
      setProjects(myProjects);
    } catch (e) {
      console.log(`Error fetching projects: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMyProjects();
  }, [])
  

  return (
    <section className="page active" id="projects">
      <h2>projects.js</h2>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
          <Spinner />
        </div>
      ) : (
        <>
          {/* iterate over projects and pass project as prop into ProjectCard component */}
          {projects.length > 0 && (
            <div className="projects-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.$id} project={project} />
                ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Projects;