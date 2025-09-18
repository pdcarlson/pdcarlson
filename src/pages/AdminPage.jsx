// src/pages/adminpage.jsx
import React, { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ID } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const AdminPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [editingProject, setEditingProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    desc: '',
    tech: '',
    liveLink: '',
    codeLink: '',
    imageUrl: ''
  });

  const handleEditClick = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      shortDesc: project.shortDesc || '',
      desc: project.desc,
      tech: project.tech.join(', '),
      liveLink: project.liveLink || '',
      codeLink: project.codeLink || '',
      imageUrl: project.imageUrl || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techArray = formData.tech.split(',').map(item => item.trim());
    
    const payload = {
      title: formData.title,
      shortDesc: formData.shortDesc,
      desc: formData.desc,
      tech: techArray,
      liveLink: formData.liveLink || null,
      codeLink: formData.codeLink || null,
      imageUrl: formData.imageUrl
    };

    try {
      if (editingProject) {
        const updatedProject = await databases.updateDocument(
          DATABASE_ID, COLLECTION_ID, editingProject.$id, payload
        );
        setProjects(projects.map(p => p.$id === editingProject.$id ? updatedProject : p));
        setEditingProject(null);
      } else {
        const newProject = await databases.createDocument(
          DATABASE_ID, COLLECTION_ID, ID.unique(), payload
        );
        setProjects(prevProjects => [newProject, ...prevProjects]);
      }
      setFormData({ title: '', shortDesc: '', desc: '', tech: '', liveLink: '', codeLink: '', imageUrl: '' });
    } catch (error) {
      console.error("failed to save project:", error);
      // capitalized alert
      alert("Error: Could not save project.");
    }
  };
  
  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({ title: '', shortDesc: '', desc: '', tech: '', liveLink: '', codeLink: '', imageUrl: '' });
  };

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
    // capitalized confirmation
    if (!window.confirm("Are you sure you want to delete this project?")) {
        return;
    }
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, projectId);
      setProjects(prevProjects => prevProjects.filter(p => p.$id !== projectId));
    } catch (error)
    {
      console.error("failed to delete project:", error);
      // capitalized alert
      alert("Error: Could not delete project.");
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
    <div className="auth-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2>{editingProject ? 'Edit Project' : 'Admin Panel'}</h2>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <h3>{editingProject ? `Editing: ${editingProject.title}` : 'Add New Project'}</h3>
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
        <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="Image URL (e.g., /assets/image.png)" required />
        <textarea name="shortDesc" value={formData.shortDesc} onChange={handleInputChange} placeholder="Short Description (for main page)" required rows="3" style={{resize: 'vertical'}}/>
        <textarea name="desc" value={formData.desc} onChange={handleInputChange} placeholder="Full Description (for modal)" required rows="6" style={{resize: 'vertical'}}/>
        <input name="tech" value={formData.tech} onChange={handleInputChange} placeholder="Technologies (comma-separated)" required />
        <input name="liveLink" value={formData.liveLink} onChange={handleInputChange} placeholder="Live Link URL" type="url" />
        <input name="codeLink" value={formData.codeLink} onChange={handleInputChange} placeholder="Code Link URL" type="url" />
        <div style={{display: 'flex', gap: '1rem'}}>
          <button type="submit" className="btn btn-primary">{editingProject ? 'Update Project' : 'Add Project'}</button>
          {editingProject && (
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <div style={{marginTop: '3rem'}}>
        <h3>Existing Projects</h3>
        {projects.length > 0 ? (
          <ul style={{listStyle: 'none', padding: 0}}>
            {projects.map(project => (
              <li key={project.$id} style={{display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-color)'}}>
                <span>{project.title}</span>
                <div style={{display: 'flex', gap: '1rem'}}>
                  <button onClick={() => handleEditClick(project)} className="btn btn-secondary" style={{padding: '0.2rem 0.8rem'}}>Edit</button>
                  <button onClick={() => handleDeleteProject(project.$id)} className="btn btn-secondary" style={{borderColor: '#aa8db9', color: '#aa8db9'}}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // capitalized message
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;