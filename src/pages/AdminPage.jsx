// src/pages/adminpage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSiteContent, updateSiteContent } from '../lib/appwrite';

import Header from '../components/Header';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import EditWrapper from '../components/admin/EditWrapper';

const AdminPage = () => {
  const { logout } = useAuth();
  const [siteContent, setSiteContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await getSiteContent();
        setSiteContent(content);
      } catch (e) {
        console.error("failed to load site content for admin", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const handleContentSave = async (fieldName, newValue) => {
    const payload = {
      [fieldName]: newValue
    };
    
    setSiteContent(prev => ({...prev, ...payload}));

    try {
      await updateSiteContent(payload);
    } catch (error) {
      console.error("failed to save content:", error);
      // in a real app, you'd revert the optimistic update here on failure
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("failed to log out:", error);
    }
  };
  
  if (isLoading || !siteContent) {
    return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Spinner /></div>
  }

  return (
    <>
      <div style={{position: 'fixed', top: '1rem', right: '1rem', zIndex: 1100}}>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>
      
      <Header />
      
      <main>
        {/* hero section */}
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

        {/* about section */}
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
                    {siteContent.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </EditWrapper>
              </div>
            </div>
          </div>
        </section>

        {/* we'll tackle projects next */}
        <Projects onProjectClick={() => alert("project modals are disabled in edit mode.")} />

        {/* contact section */}
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
};

export default AdminPage;