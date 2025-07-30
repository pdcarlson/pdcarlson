// src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import { Databases } from 'appwrite';
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


const AdminPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); 
  const [editingProject, setEditingProject] = useState(null); 
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    tech: '',
    liveLink: '',
    codeLink: ''
  });

  const handleEditClick = (project) => {
    setEditingProject(project); // Set the project we're editing
    // Populate the form with the project's current data
    setFormData({
    title: project.title,
    desc: project.desc,
    tech: project.tech.join(', '), // Convert the array back to a string for the input
    liveLink: project.liveLink,
    codeLink: project.codeLink,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techArray = formData.tech.split(',').map(item => item.trim());
    const payload = {
      title: formData.title,
      desc: formData.desc,
      tech: techArray,
      liveLink: formData.liveLink,
      codeLink: formData.codeLink,
    };

    try {
      if (editingProject) {
        // --- UPDATE LOGIC ---
        const updatedProject = await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          editingProject.$id, // The ID of the document to update
          payload
        );
        // Update the project in our local list
        setProjects(projects.map(p => p.$id === editingProject.$id ? updatedProject : p));
        setEditingProject(null); // Exit editing mode
      } else {
        // --- CREATE LOGIC (your existing code) ---
        const newProject = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          'unique()',
          payload
        );
        setProjects(prevProjects => [newProject, ...prevProjects]);
      }
      // Clear the form after either action
      setFormData({ title: '', desc: '', tech: '', liveLink: '', codeLink: '' });
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Error: Could not save project.");
    }
  };

  // Add a function to cancel editing
  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({ title: '', desc: '', tech: '', liveLink: '', codeLink: '' });
  };

  // Fetch existing projects when the component loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
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
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, projectId);

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
        {/* Conditionally render the title */}
        <h2>{editingProject ? 'Edit Project' : 'Admin Panel'}</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      {/* Change the onSubmit to the new handleSubmit function */}
      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{editingProject ? `Editing: ${editingProject.title}` : 'Add New Project'}</h3>
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
        <textarea name="desc" value={formData.desc} onChange={handleInputChange} placeholder="Description" required />
        <input name="tech" value={formData.tech} onChange={handleInputChange} placeholder="Technologies (comma-separated)" required />
        <input name="liveLink" value={formData.liveLink} onChange={handleInputChange} placeholder="Live Link URL" type="url" />
        <input name="codeLink" value={formData.codeLink} onChange={handleInputChange} placeholder="Code Link URL" type="url" />
        <div className="form-buttons">
          {/* Conditionally render the button text */}
          <button type="submit">{editingProject ? 'Update Project' : 'Add Project'}</button>
          {/* Show a Cancel button only when editing */}
          {editingProject && (
            <button type="button" onClick={handleCancelEdit} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="existing-projects">
        <h3>Existing Projects</h3>
        {projects.length > 0 ? (
          <ul>
            {projects.map(project => (
              <li key={project.$id}>
                <span>{project.title}</span>
                <div className="project-actions">
                  {/* Add the Edit button here */}
                  <button onClick={() => handleEditClick(project)} className="edit-button">Edit</button>
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