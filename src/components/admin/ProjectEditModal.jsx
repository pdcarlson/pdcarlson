// src/components/admin/ProjectEditModal.jsx
import React, { useState, useEffect } from 'react';

const ProjectEditModal = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    desc: '',
    tech: '',
    liveLink: '',
    codeLink: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        shortDesc: project.shortDesc || '',
        desc: project.desc || '',
        tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
        liveLink: project.liveLink || '',
        codeLink: project.codeLink || '',
        imageUrl: project.imageUrl || '',
      });
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const techArray = formData.tech.split(',').map(item => item.trim());
    onSave(project.$id, { ...formData, tech: techArray });
  };

  if (!project) return null;

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h3>Editing: {project.title}</h3>
          
          <label htmlFor="title">Title</label>
          <input id="title" name="title" value={formData.title} onChange={handleInputChange} required />

          <label htmlFor="imageUrl">Image URL</label>
          <input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required />

          <label htmlFor="shortDesc">Short Description</label>
          <textarea id="shortDesc" name="shortDesc" value={formData.shortDesc} onChange={handleInputChange} required rows="3" />

          <label htmlFor="desc">Full Description</label>
          <textarea id="desc" name="desc" value={formData.desc} onChange={handleInputChange} required rows="6" />

          <label htmlFor="tech">Technologies (comma-separated)</label>
          <input id="tech" name="tech" value={formData.tech} onChange={handleInputChange} required />

          <label htmlFor="liveLink">Live Link URL</label>
          <input id="liveLink" name="liveLink" value={formData.liveLink} onChange={handleInputChange} type="url" />

          <label htmlFor="codeLink">Code Link URL</label>
          <input id="codeLink" name="codeLink" value={formData.codeLink} onChange={handleInputChange} type="url" />
          
          <div className="edit-modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEditModal;