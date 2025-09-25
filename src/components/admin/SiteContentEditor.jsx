// src/components/admin/sitecontenteditor.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getSiteContent, updateSiteContent } from '../../lib/appwrite';
import Spinner from '../Spinner';

const SiteContentEditor = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const siteContent = await getSiteContent();
      // convert skills array to comma-separated string for the input
      if (siteContent.skills && Array.isArray(siteContent.skills)) {
        siteContent.skills = siteContent.skills.join(', ');
      }
      setContent(siteContent);
    } catch (error) {
      console.error("failed to fetch site content:", error);
      alert("error: could not load site content.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    
    setIsSaving(true);
    try {
      const payload = { ...content };
      // convert skills string back to an array for appwrite
      if (payload.skills && typeof payload.skills === 'string') {
        payload.skills = payload.skills.split(',').map(s => s.trim());
      }
      
      await updateSiteContent(payload);
      alert("site content updated successfully!");
    } catch (error) {
      console.error("failed to update site content:", error);
      alert("error: could not save site content.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}><Spinner /></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form" style={{ maxWidth: '100%' }}>
      <h3>Edit Homepage Content</h3>
      
      <h4>Hero Section</h4>
      <input name="heroTitle" value={content?.heroTitle || ''} onChange={handleInputChange} placeholder="Hero Title" required />
      <input name="heroSubheadline" value={content?.heroSubheadline || ''} onChange={handleInputChange} placeholder="Hero Subheadline" required />
      <textarea name="heroSubtitle" value={content?.heroSubtitle || ''} onChange={handleInputChange} placeholder="Hero Subtitle" required rows="3" />
      
      <h4 style={{ marginTop: '1rem' }}>About Section</h4>
      <textarea name="aboutParagraph1" value={content?.aboutParagraph1 || ''} onChange={handleInputChange} placeholder="About Paragraph 1" required rows="4" />
      <textarea name="aboutParagraph2" value={content?.aboutParagraph2 || ''} onChange={handleInputChange} placeholder="About Paragraph 2" required rows="2" />
      <input name="skills" value={content?.skills || ''} onChange={handleInputChange} placeholder="Skills (comma-separated)" required />
      
      <h4 style={{ marginTop: '1rem' }}>Contact Section</h4>
      <textarea name="contactText" value={content?.contactText || ''} onChange={handleInputChange} placeholder="Contact Text" required rows="3" />

      <div style={{ marginTop: '1rem' }}>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Content'}
        </button>
      </div>
    </form>
  );
};

export default SiteContentEditor;