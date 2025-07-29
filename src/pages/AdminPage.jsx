// src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import { database } from '../lib/appwrite';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


const AdminPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); 
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    tech: '',
    liveLink: '',
    codeLink: ''
  });

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const techArray = formData.tech.split(',').map(item => item.trim());

      const payload = {
        title: formData.title,
        desc: formData.desc,
        tech: techArray,
        liveLink: formData.liveLink,
        codeLink: formData.codeLink,
      };

      const newProject = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()',
        payload
      );

      // Add the new project to the top of the local list for an instant update
      setProjects(prevProjects => [newProject, ...prevProjects]);

      // Clear the form fields
      setFormData({ title: '', desc: '', tech: '', liveLink: '', codeLink: '' });

    } catch (error) {
      console.error("Failed to add project:", error);
      alert("Error: Could not add project.");
    }
};

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
  
    const handleDeleteProject = async (projectId) => {
        // Add a confirmation prompt to prevent accidental deletions
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }
    
        try {
        await database.deleteDocument(DATABASE_ID, COLLECTION_ID, projectId);

        // Remove the deleted project from our local state
        setProjects(prevProjects => prevProjects.filter(p => p.$id !== projectId));

        } catch (error) {
        console.error("Failed to delete project:", error);
        alert("Error: Could not delete project.");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

  return (
   <div className="admin-page">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

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