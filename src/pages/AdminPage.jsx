// src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import { database } from '../lib/appwrite';
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    tech: '', // We'll handle splitting this into an array later
    liveLink: '',
    codeLink: ''
  });

  // Fetch existing projects when the component loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
        setProjects(response.documents);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    // Logic to add a new project to Appwrite will go here
    console.log("Submitting:", formData);
  };
  
  const handleDeleteProject = async (projectId) => {
      // Logic to delete a project will go here
      console.log("Deleting project:", projectId);
  }

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>

      {/* Add Project Form */}
      <form onSubmit={handleAddProject} className="admin-form">
        <h3>Add New Project</h3>
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
        <textarea name="desc" value={formData.desc} onChange={handleInputChange} placeholder="Description" required />
        <input name="tech" value={formData.tech} onChange={handleInputChange} placeholder="Technologies (comma-separated)" required />
        <input name="liveLink" value={formData.liveLink} onChange={handleInputChange} placeholder="Live Link URL" type="url" />
        <input name="codeLink" value={formData.codeLink} onChange={handleInputChange} placeholder="Code Link URL" type="url" />
        <button type="submit">Add Project</button>
      </form>

      {/* Existing Projects List */}
      <div className="existing-projects">
        <h3>Existing Projects</h3>
        {projects.length > 0 ? (
          <ul>
            {projects.map(project => (
              <li key={project.$id}>
                <span>{project.title}</span>
                <div className="project-actions">
                    <button onClick={() => handleDeleteProject(project.$id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;