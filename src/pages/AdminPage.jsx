// src/pages/adminpage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSiteContent, updateSiteContent, updateProject, createProject } from '../lib/appwrite';
import toast from 'react-hot-toast';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import EditWrapper from '../components/admin/EditWrapper';
import ProjectEditor from '../components/admin/ProjectEditor';
import ProjectEditModal from '../components/admin/ProjectEditModal';
import DocumentHub from '../components/admin/DocumentHub';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';

const AdminPage = () => {
  const { logout } = useAuth();
  const [siteContent, setSiteContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [activeView, setActiveView] = useState('editor'); // 'editor', 'hub', or 'analytics'

  const [refreshProjects, setRefreshProjects] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true); // ensure loading state is true at the start
      try {
        // always load the main site content regardless of the view
        const content = await getSiteContent();
        setSiteContent(content);
      } catch (e) {
        console.error("failed to load site content for admin", e);
        setSiteContent({}); 
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []); // this effect should only run once on mount

  const handleContentSave = async (fieldName, newValue) => {
    const payload = {
      [fieldName]: newValue
    };

    const promise = updateSiteContent(payload);
    toast.promise(promise, {
      loading: 'saving...',
      success: 'content saved!',
      error: 'error saving content.',
    });
    setSiteContent(prev => ({...prev, ...payload}));
  };

  const handleProjectSave = (projectId, data) => {
    const promise = isCreatingProject 
      ? createProject(data)
      : updateProject(projectId, data);
    
    toast.promise(promise, {
      loading: 'saving project...',
      success: () => {
        setEditingProject(null);
        setIsCreatingProject(false);
        setRefreshProjects(p => !p);
        return `project ${isCreatingProject ? 'created' : 'updated'}!`;
      },
      error: `error ${isCreatingProject ? 'creating' : 'updating'} project.`,
    });
  };

  const handleOpenCreateModal = () => {
    setIsCreatingProject(true);
    setEditingProject({});
  };

  const handleOpenEditModal = (project) => {
    setIsCreatingProject(false);
    setEditingProject(project);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('logged out successfully.');
    } catch (error) {
      console.error("failed to log out:", error);
      toast.error('failed to log out.');
    }
  };
  
  if (isLoading || !siteContent) {
    return (
        <>
            <Header isAdminPage={true} onLogout={handleLogout} onCreateProject={handleOpenCreateModal} />
            <div style={{height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Spinner /></div>
        </>
    );
  }

  const VisualEditor = () => (
    <>
      <main>
        <section id="home" className="hero">
          <div className="container">
            <EditWrapper fieldName="heroTitle" initialValue={siteContent.heroTitle} onSave={handleContentSave}>
              <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: siteContent.heroTitle }}></h1>
            </EditWrapper>
            <EditWrapper fieldName="heroSubheadline" initialValue={siteContent.heroSubheadline} onSave={handleContentSave}>
               <h3 className="hero-subheadline">{siteContent.heroSubheadline}</h3>
            </EditWrapper>
            <EditWrapper fieldName="heroSubtitle" initialValue={siteContent.heroSubtitle} onSave={handleContentSave}>
              <p className="hero-subtitle">{siteContent.heroSubtitle}</p>
            </EditWrapper>
            <div className="hero-buttons">
              <a href="#!" className="btn btn-primary">View My Work</a>
              <a href="#!" className="btn btn-secondary">View Resume</a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <img src="/assets/professional-headshot-s25.jpeg" alt="Paul Carlson" className="about-image" />
              <div>
                <EditWrapper fieldName="aboutParagraph1" initialValue={siteContent.aboutParagraph1} onSave={handleContentSave}>
                  <p>{siteContent.aboutParagraph1}</p>
                </EditWrapper>
                <EditWrapper fieldName="aboutParagraph2" initialValue={siteContent.aboutParagraph2} onSave={handleContentSave}>
                  <p>{siteContent.aboutParagraph2}</p>
                </EditWrapper>
                <EditWrapper fieldName="skills" initialValue={siteContent.skills} onSave={handleContentSave}>
                  <ul className="skills-list">
                    {siteContent.skills && siteContent.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </EditWrapper>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title">My Recent Projects</h2>
                <ProjectEditor 
                  onEditProject={handleOpenEditModal}
                  key={refreshProjects}
                />
            </div>
        </section>
        
        <section id="contact" className="contact-section">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <EditWrapper fieldName="contactText" initialValue={siteContent.contactText} onSave={handleContentSave}>
              <p className="contact-text">{siteContent.contactText}</p>
            </EditWrapper>
            <a href="#!" className="btn btn-primary">Say Hello</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );

  const renderActiveView = () => {
    switch(activeView) {
        case 'editor':
            return <VisualEditor />;
        case 'hub':
            return <DocumentHub />;
        case 'analytics':
            return <AnalyticsDashboard />;
        default:
            return <VisualEditor />;
    }
  };

  return (
    <>
      <Header 
        isAdminPage={true} 
        onLogout={handleLogout} 
        onCreateProject={handleOpenCreateModal} 
      />

      <div className="admin-view-switcher">
        <div className="container">
            <button onClick={() => setActiveView('editor')} className={activeView === 'editor' ? 'active' : ''}>Visual Editor</button>
            <button onClick={() => setActiveView('hub')} className={activeView === 'hub' ? 'active' : ''}>Document Hub</button>
            <button onClick={() => setActiveView('analytics')} className={activeView === 'analytics' ? 'active' : ''}>Analytics</button>
        </div>
      </div>

      <div className="container" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
        {renderActiveView()}
      </div>

      <ProjectEditModal 
        project={editingProject} 
        onClose={() => setEditingProject(null)} 
        onSave={handleProjectSave}
        isCreating={isCreatingProject}
      />
    </>
  );
};

export default AdminPage;