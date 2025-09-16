// src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import { ID } from 'appwrite'; // import id
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
    setEditingProject(project); // set the project we're editing
    // populate the form with the project's current data
    setFormData({
    title: project.title,
    desc: project.desc,
    tech: project.tech.join(', '), // convert the array back to a string for the input
    liveLink: project.liveLink || '', // ensure null values from db don't break the form
    codeLink: project.codeLink || '', // ensure null values from db don't break the form
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techArray = formData.tech.split(',').map(item => item.trim());
    
    // if a link field is empty, send null; otherwise, send the value.
    // this prevents appwrite from throwing a url format error on empty strings.
    const payload = {
      title: formData.title,
      desc: formData.desc,
      tech: techArray,
      liveLink: formData.liveLink || null,
      codeLink: formData.codeLink || null,
    };

    try {
      if (editingProject) {
        // --- update logic ---
        const updatedProject = await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          editingProject.$id, // the id of the document to update
          payload
        );
        // update the project in our local list
        setProjects(projects.map(p => p.$id === editingProject.$id ? updatedProject : p));
        setEditingProject(null); // exit editing mode
      } else {
        // --- create logic ---
        const newProject = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(), // use the appwrite id utility
          payload
        );
        setProjects(prevProjects => [newProject, ...prevProjects]);
      }
      // clear the form after either action
      setFormData({ title: '', desc: '', tech: '', liveLink: '', codeLink: '' });
    } catch (error) {
      console.error("failed to save project:", error);
      alert("error: could not save project.");
    }
  };

  // add a function to cancel editing
  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({ title: '', desc: '', tech: '', liveLink: '', codeLink: '' });
  };

  // fetch existing projects when the component loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setProjects(response.documents);
      } catch (error) {
        console.error("failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
    const handleDeleteProject = async (projectId) => {
        // add a confirmation prompt to prevent accidental deletions
        if (!window.confirm("are you sure you want to delete this project?")) {
            return;
        }
    
        try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, projectId);

        // remove the deleted project from our local state
        setProjects(prevProjects => prevProjects.filter(p => p.$id !== projectId));

        } catch (error) {
        console.error("failed to delete project:", error);
        alert("error: could not delete project.");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("failed to log out:", error);
        }
    };

  return (
    <div className="admin-page">
      <div className="admin-header">
        {/* conditionally render the title */}
        <h2>{editingProject ? 'edit project' : 'admin panel'}</h2>
        <button onClick={handleLogout} className="logout-button">logout</button>
      </div>

      {/* change the onsubmit to the new handlesubmit function */}
      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{editingProject ? `editing: ${editingProject.title}` : 'add new project'}</h3>
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="title" required />
        <textarea name="desc" value={formData.desc} onChange={handleInputChange} placeholder="description" required />
        <input name="tech" value={formData.tech} onChange={handleInputChange} placeholder="technologies (comma-separated)" required />
        <input name="liveLink" value={formData.liveLink} onChange={handleInputChange} placeholder="live link url" type="url" />
        <input name="codeLink" value={formData.codeLink} onChange={handleInputChange} placeholder="code link url" type="url" />
        <div className="form-buttons">
          {/* conditionally render the button text */}
          <button type="submit">{editingProject ? 'update project' : 'add project'}</button>
          {/* show a cancel button only when editing */}
          {editingProject && (
            <button type="button" onClick={handleCancelEdit} className="cancel-button">
              cancel
            </button>
          )}
        </div>
      </form>

      <div className="existing-projects">
        <h3>existing projects</h3>
        {projects.length > 0 ? (
          <ul>
            {projects.map(project => (
              <li key={project.$id}>
                <span>{project.title}</span>
                <div className="project-actions">
                  {/* add the edit button here */}
                  <button onClick={() => handleEditClick(project)} className="edit-button">edit</button>
                  <button onClick={() => handleDeleteProject(project.$id)}>delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>no projects found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;